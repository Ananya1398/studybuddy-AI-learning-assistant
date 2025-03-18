"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatInterfaceProps {
  summary: string;
}

export function ChatInterface({ summary }: ChatInterfaceProps) {
  console.log(summary);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `I'm your AI assistant. I've analyzed the content and can answer questions about it. What would you like to know?`,
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      // Generate a contextual response based on the summary
      let response = "";

      if (
        input.toLowerCase().includes("what") &&
        input.toLowerCase().includes("about")
      ) {
        response = `The discussion covers artificial intelligence and its applications in everyday life, including voice assistants, recommendation systems, and healthcare diagnostics.`;
      } else if (
        input.toLowerCase().includes("define") ||
        input.toLowerCase().includes("what is ai")
      ) {
        response = `According to the discussion, AI refers to computer systems designed to perform tasks that typically require human intelligence, including learning, reasoning, problem-solving, perception, and language understanding.`;
      } else if (
        input.toLowerCase().includes("example") ||
        input.toLowerCase().includes("application")
      ) {
        response = `AI is used in many everyday applications including voice assistants like Siri and Alexa, recommendation systems on streaming platforms and e-commerce sites, email spam filters, navigation apps, and increasingly in healthcare for diagnostics.`;
      } else {
        response = `Based on the content, AI is becoming increasingly integrated into our daily lives through various applications. The discussion emphasizes the importance of understanding AI's capabilities and impact on society.`;
      }

      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[600px]">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Chat with your content</h3>
        <p className="text-sm text-muted-foreground">
          Ask questions about the video and transcript
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex gap-3 max-w-[80%] ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <Avatar className="h-8 w-8">
                {message.role === "user" ? (
                  <div className="bg-primary text-primary-foreground h-full w-full flex items-center justify-center text-sm font-medium">
                    U
                  </div>
                ) : (
                  <div className="bg-muted h-full w-full flex items-center justify-center text-sm font-medium">
                    AI
                  </div>
                )}
              </Avatar>
              <div
                className={`rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <Avatar className="h-8 w-8">
                <div className="bg-muted h-full w-full flex items-center justify-center text-sm font-medium">
                  AI
                </div>
              </Avatar>
              <div className="rounded-lg p-3 bg-muted">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
                  <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                  <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t mt-auto">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            placeholder="Ask a question about the content..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
