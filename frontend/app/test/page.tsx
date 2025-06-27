"use client";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { ElevenLabsClient, play } from "@elevenlabs/elevenlabs-js";
import "dotenv/config";

const elevenlabs = new ElevenLabsClient();

export default function CreateUserButton() {
  const { getToken, isSignedIn, userId } = useAuth();
  const [status, setStatus] = useState("");
  const makeAudio = async () => {
    const audioStream = await elevenlabs.textToSpeech.convert(
      "JBFqnCBsd6RMkjVDRZzb",
      {
        text: "The first move is what sets everything in motion.",
        modelId: "eleven_multilingual_v2",
        outputFormat: "mp3_44100_128",
      }
    );
    async function* streamToAsyncIterable(stream: ReadableStream<Uint8Array>) {
      const reader = stream.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) yield value;
        }
      } finally {
        reader.releaseLock();
      }
    }

    await play(streamToAsyncIterable(audioStream));
  };

  return (
    <div className="p-4 border rounded">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={makeAudio}
      >
        Create User
      </button>
      <div className="mt-2 text-sm">{status}</div>
    </div>
  );
}
