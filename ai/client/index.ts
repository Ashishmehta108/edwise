import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import express, { Request, Response } from "express";
const transport = new StreamableHTTPClientTransport(
  new URL("http://localhost:5001/mcp")
);
import { GoogleGenAI, FunctionDeclaration } from "@google/genai";
import { objectOutputType, ZodTypeAny } from "zod";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY,
});
const app = express();
//@ts-ignore
let tools = null;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = new Client({
  name: "example-client",
  version: "1.0.0",
});
const connectToTools = async () => {
  await client.connect(transport);
  console.log("Connected to MCP server");

  tools = (await client.listTools()).tools.map((tool) => {
    return {
      name: tool.name,
      description: tool.description,
      parameters: {
        type: tool.inputSchema.type,
        properties: tool.inputSchema.properties,
        required: tool.inputSchema.required,
      },
    };
  });
  console.log("Available tools:", tools);
};

connectToTools();

app.post("/chat", async (req: Request, res: Response): Promise<void> => {
  try {
    const prompt: string = req.body.prompt;
    if (!prompt) {
      res.status(400).json({ error: "Prompt is required" });
      return;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        //@ts-ignore
        tools: [{ functionDeclarations: tools }],
      },
    });

    if (!response || !response.candidates || response.candidates.length === 0) {
      res.status(500).json({ error: "No response from AI" });
      return;
    }

    const parts = response.candidates[0]?.content?.parts;
    if (!parts || parts.length === 0) {
      res.status(500).json({ error: "No content in AI response" });
      return;
    }

    //@ts-ignore: because parts can contain either text or functionCall
    const functionCall = parts[0].functionCall;
    //@ts-ignore
    const responseText = parts[0].text;

    if (functionCall) {
      const toolResult = await client.callTool({
        name: functionCall.name!,
        arguments: functionCall.args,
      });

      res.status(200).json({
        type: "functionCall",
        functionCall,
        toolResult,
      });
    } else if (responseText) {
      res.status(200).json({
        type: "text",
        text: responseText,
      });
    } else {
      res.status(500).json({ error: "Unexpected AI response format" });
    }
  } catch (error) {
    console.error("Error in /chat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(5001, () => {
  console.log("Server is running on http://localhost:5001");
});
