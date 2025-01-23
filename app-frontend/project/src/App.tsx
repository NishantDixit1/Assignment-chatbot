import React, { useState } from 'react';
import { ChatProvider } from './context/ChatContext';
import { AuthProvider } from './context/AuthContext';
import { ChatInput } from './components/ChatInput';
import { ChatMessage } from './components/ChatMessage';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';
import { useChat } from './context/ChatContext';
import { useAuth } from './context/AuthContext';
import { MessageSquare, ArrowLeft } from 'lucide-react';

function ChatContainer({ onBack }: { onBack: () => void }) {
  const { messages } = useChat();
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-500 w-10 h-10 rounded-full flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              AI Chat Assistant
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              {user?.name}
            </span>
            <button
              onClick={logout}
              className="text-gray-600 hover:text-red-600 transition-colors text-sm"
            >
              Sign out
            </button>
            <button
              onClick={onBack}
              className="group flex items-center gap-2 px-4 py-2 rounded-full text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back</span>
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <MessageSquare className="w-12 h-12 mb-4 text-blue-500" />
              <p className="text-lg font-medium text-gray-700">No messages yet</p>
              <p className="text-sm text-gray-500">Start a conversation below</p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
      </div>

      {/* Input */}
      <ChatInput />
    </div>
  );
}

function App() {
  const [showChat, setShowChat] = useState(false);
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  if (!showChat) {
    return <LandingPage onStartChat={() => setShowChat(true)} />;
  }

  return (
    <ChatProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto max-w-4xl h-screen">
          <ChatContainer onBack={() => setShowChat(false)} />
        </div>
      </div>
    </ChatProvider>
  );
}

export default function AppWithProviders() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}