import React from 'react';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : ''} mb-6`}>
      <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center 
        ${isUser 
          ? 'bg-gradient-to-br from-blue-500 to-indigo-500' 
          : 'bg-gradient-to-br from-gray-600 to-gray-700'}`}>
        {isUser 
          ? <User className="w-5 h-5 text-white" /> 
          : <Bot className="w-5 h-5 text-white" />}
      </div>
      <div className={`flex max-w-[80%] lg:max-w-[70%] ${isUser ? 'justify-end' : ''}`}>
        <div className={`rounded-2xl px-6 py-4 shadow-sm
          ${isUser 
            ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white' 
            : 'bg-white border border-gray-100 text-gray-800'}`}>
          <p className="text-sm leading-relaxed">{message.content}</p>
          <span className="text-xs opacity-70 mt-2 block">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
}