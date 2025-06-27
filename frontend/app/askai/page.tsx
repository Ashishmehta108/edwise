"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GENAI_API_KEY,
});

function AskWithAI() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse(null);
    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: { candidateCount: 2 },
      });
      const aiText = await result.text;
      setResponse(aiText as string);
    } catch (err) {
      console.error(err);
      setResponse("Failed to fetch AI response.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-0 shadow-2xl rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-indigo-100 animate-fade-in">
      <CardHeader className="bg-indigo-600 rounded-t-3xl p-6">
        <CardTitle className="flex items-center gap-3 text-3xl font-bold text-white">
          <MessageSquare className="h-7 w-7 animate-bounce-slow" />
          Ask with AI
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <Textarea
          placeholder="What would you like to ask?"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full h-40 rounded-xl border-2 border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300"
        />
        <Button
          onClick={handleAsk}
          className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 w-full py-4 text-lg rounded-xl transition-all duration-300"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Thinking...
            </span>
          ) : (
            "Ask AI"
          )}
        </Button>

        {response !== null && (
          <div className="mt-4 p-5 bg-white border border-indigo-200 rounded-2xl shadow-inner transition-all duration-300 animate-fade-in">
            <h3 className="text-xl font-bold text-indigo-700 mb-3">
              AI Response
            </h3>
            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
              {response}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <AskWithAI />
    </div>
  );
}
