'use client';

import { useState, useEffect, useRef } from 'react';
import { ChatService, ChatResponse, ChatError } from '@/lib/chatService';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem(`chat_history_${textId}`, JSON.stringify(chatHistory));
    }
  }, [chatHistory, textId]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

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
      
      // Add user message to chat history
      const userMessage: ChatMessage = {
        content: question,
        role: 'human'
      };
      setChatHistory(prev => [...prev, userMessage]);
      setQuestion('');

      const response = await ChatService.askQuestion(textId, question);
      if ('error' in response) {
        setError(response.error);
        return;
      }

      // Add AI response to chat history
      const aiMessage: ChatMessage = {
        content: response.answer,
        role: 'ai'
      };
      setChatHistory(prev => [...prev, aiMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get answer. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.length === 0 && !isLoading && (
          <div className="text-center text-muted-foreground">
            Ask questions about the video content
          </div>
        )}
        
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
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
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
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 text-sm">
            {error}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about the video..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !question.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send'}
          </Button>
        </div>
      </form>
    </div>
  );
} 