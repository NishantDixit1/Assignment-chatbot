import React from 'react';
import { MessageSquare, Zap, Shield, Sparkles, ArrowRight } from 'lucide-react';

export function LandingPage({ onStartChat }: { onStartChat: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-24 pb-20 text-center relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.1),transparent_50%)]" />
        </div>
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-100 rounded-full blur-lg opacity-50" />
            <MessageSquare className="w-20 h-20 text-blue-500 relative" />
          </div>
        </div>
        <h1 className="text-6xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Experience Intelligent Conversations
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Engage with our advanced AI chatbot for insightful discussions, quick answers, 
          and intelligent assistance that adapts to your needs.
        </p>
        <button
          onClick={onStartChat}
          className="group bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-10 py-4 rounded-full text-lg font-semibold 
                   hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl
                   hover:scale-105 transform"
        >
          <span className="flex items-center gap-2">
            Start Chatting Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: <Zap className="w-6 h-6 text-blue-500" />,
              title: "Instant Responses",
              description: "Get immediate, accurate answers to your questions without any delay."
            },
            {
              icon: <Shield className="w-6 h-6 text-indigo-500" />,
              title: "Secure Conversations",
              description: "Your conversations are private and protected with enterprise-grade security."
            },
            {
              icon: <Sparkles className="w-6 h-6 text-blue-500" />,
              title: "Smart AI",
              description: "Powered by advanced AI to understand context and provide relevant responses."
            }
          ].map((feature, index) => (
            <div key={index} className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl mx-auto transform hover:scale-[1.02] transition-transform duration-300">
          <div className="relative h-72">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10" />
            <img 
              src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=2000&q=80"
              alt="Chat Interface Demo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-10">
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Ready to get started?
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Join thousands of users who are already experiencing the future of AI-powered conversations.
            </p>
            <button
              onClick={onStartChat}
              className="group bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-full font-semibold 
                       hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center gap-2">
                Try It Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}