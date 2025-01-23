import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useChat } from '../context/ChatContext';

export function ChatInput() {
  const [input, setInput] = useState('');
  const { addMessage, isLoading } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    addMessage(input, 'user');
    // Simulate API response
    setTimeout(() => {
      addMessage('This is a simulated response. Connect to your actual API here.', 'assistant');
    }, 1000);
    
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-100 p-6 bg-white shadow-lg">
      <div className="flex gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 rounded-full border border-gray-200 px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   bg-gray-50 hover:bg-white transition-colors"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full p-3 hover:from-blue-600 hover:to-indigo-600 
                   transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transform"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}