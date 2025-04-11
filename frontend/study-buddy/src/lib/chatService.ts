const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5004';

export interface ChatResponse {
  answer: string;
  chat_history: string[];
}

export interface ProcessTextResponse {
  status: string;
  message: string;
}

export interface DeleteTextResponse {
  status: string;
  message: string;
}

export class ChatService {
  static async processText(textId: string, text: string): Promise<ProcessTextResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text_id: textId, text }),
      });

      if (!response.ok) {
        throw new Error('Failed to process text');
      }

      return await response.json();
    } catch (error) {
      console.error('Error processing text:', error);
      throw error;
    }
  }

  static async askQuestion(textId: string, question: string): Promise<ChatResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text_id: textId, question }),
      });

      if (!response.ok) {
        throw new Error('Failed to ask question');
      }

      return await response.json();
    } catch (error) {
      console.error('Error asking question:', error);
      throw error;
    }
  }

  static async deleteText(textId: string): Promise<DeleteTextResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text_id: textId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete text');
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting text:', error);
      throw error;
    }
  }
} 