'use client';

import { useState, useEffect } from 'react';
import { ChatService, ChatResponse, ChatError } from '@/lib/chatService';
import { Avatar } from '@/components/ui/avatar';

interface ChatMessage {
  content: string;
  role: 'human' | 'ai';
}

interface ChatInterfaceProps {
  textId: string;
  initialText: string;
}

export default function ChatInterface({ textId, initialText }: ChatInterfaceProps) {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => {
    // Initialize chat history from localStorage if it exists
    if (typeof window !== 'undefined') {
      const savedHistory = localStorage.getItem(`chat_history_${textId}`);
      return savedHistory ? JSON.parse(savedHistory) : [];
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem(`chat_history_${textId}`, JSON.stringify(chatHistory));
    }
  }, [chatHistory, textId]);

  useEffect(() => {
    // Process the initial text when the component mounts
    const processInitialText = async () => {
      try {
        setIsLoading(true);
        await ChatService.processText(textId, initialText);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to process text. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    // Only process text if we don't have any chat history
    if (chatHistory.length === 0) {
      processInitialText();
    }
  }, [textId, initialText, chatHistory.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await ChatService.askQuestion(textId, question);
      if ('error' in response) {
        setError(response.error);
        return;
      }
      setChatHistory(response.chat_history);
      setQuestion('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get answer. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'human' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`flex gap-3 max-w-[80%] ${
                message.role === 'human' ? 'flex-row-reverse' : ''
              }`}
            >
              <Avatar className="h-8 w-8">
                {message.role === 'human' ? (
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
                  message.role === 'human'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.content}</p>
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
      </div>

      {error && (
        <div className="text-red-500 mb-4 text-center p-3 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
} 