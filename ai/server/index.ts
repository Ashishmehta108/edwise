import express from "express";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { randomUUID } from "crypto";
const app = express();
app.use(express.json());
import { z } from "zod";
const transports: { [sessionId: string]: StreamableHTTPServerTransport } = {};
const server = new McpServer({
  name: "example-server",
  version: "1.0.0",
});

server.tool(
  "chat",
  "A simple chat tool",
  {
    chat: z.object({
      message: z.string(),
    }),
  },
  async (params) => {
    const { message } = params.chat;

    return {
      content: [
        {
          type: "text",
          text: `You said: ${message}`,
        },
      ],
    };
  }
);

server.tool(
  "getSkills",
  "Get user skills",
  {
    getSkills: z.object({
      userId: z.string(),
    }),
  },
  async (params) => {
    const { userId } = params.getSkills;
    const getSkills = await fetch("http://localhost:4444/skills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    const data = await getSkills.json();

    return {
      content: [
        {
          type: "text",
          text: `User skills for user is : ${JSON.stringify(data)}`,
        },
      ],
    };
  }
);

server.tool(
  "getVoiceTranscripts",
  "Get user voice and generate summaries out of those transcripts",
  {
    getVoiceTranscripts: z.object({
      transcriptId: z.string(),
    }),
  },
  async (params) => {
    const { transcriptId } = params.getVoiceTranscripts;
    const getVoiceTranscripts = await fetch("http://localhost:4444/voice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transcriptId }),
    });
    const data = await getVoiceTranscripts.json();

    return {
      content: [
        {
          type: "text",
          text: `User voice transcripts for user is : ${JSON.stringify(data)}`,
        },
      ],
    };
  }
);

app.post("/mcp", async (req, res) => {
  const sessionId = req.headers["mcp-session-id"] as string | undefined;
  let transport: StreamableHTTPServerTransport;

  if (sessionId && transports[sessionId]) {
    transport = transports[sessionId];
  } else if (!sessionId && isInitializeRequest(req.body)) {
    transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: (sessionId) => {
        transports[sessionId] = transport;
      },
    });

    transport.onclose = () => {
      if (transport.sessionId) {
        delete transports[transport.sessionId];
      }
    };

    await server.connect(transport);
  } else {
    // Invalid request
    res.status(400).json({
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Bad Request: No valid session ID provided",
      },
      id: null,
    });
    return;
  }

  await transport.handleRequest(req, res, req.body);
});

const handleSessionRequest = async (
  req: express.Request,
  res: express.Response
) => {
  const sessionId = req.headers["mcp-session-id"] as string | undefined;
  if (!sessionId || !transports[sessionId]) {
    res.status(400).send("Invalid or missing session ID");
    return;
  }

  const transport = transports[sessionId];
  await transport.handleRequest(req, res);
};

app.get("/mcp", handleSessionRequest);

app.delete("/mcp", handleSessionRequest);

app.listen(5001);
