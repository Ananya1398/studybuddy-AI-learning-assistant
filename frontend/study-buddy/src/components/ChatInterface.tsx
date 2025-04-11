'use client';

import { useState, useEffect } from 'react';
import { ChatService, ChatResponse } from '@/lib/chatService';

interface ChatInterfaceProps {
  textId: string;
  initialText: string;
}

export default function ChatInterface({ textId, initialText }: ChatInterfaceProps) {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Process the initial text when the component mounts
    const processInitialText = async () => {
      try {
        setIsLoading(true);
        await ChatService.processText(textId, initialText);
        setError(null);
      } catch (err) {
        setError('Failed to process text');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    processInitialText();
  }, [textId, initialText]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await ChatService.askQuestion(textId, question);
      setChatHistory(response.chat_history);
      setQuestion('');
    } catch (err) {
      setError('Failed to get answer');
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
            className={`p-3 rounded-lg ${
              index % 2 === 0
                ? 'bg-blue-100 ml-auto'
                : 'bg-gray-100 mr-auto'
            } max-w-[80%]`}
          >
            {message}
          </div>
        ))}
      </div>

      {error && (
        <div className="text-red-500 mb-4 text-center">{error}</div>
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