import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';
import { ChatMessage, ChatSender } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      text: "System Online. I am Alex's Portfolio Assistant. Query me for details on projects, skills, or engineering methodology.",
      sender: ChatSender.BOT,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: ChatSender.USER,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = process.env.API_KEY || ''; 
      const ai = new GoogleGenAI({ apiKey });
      const model = 'gemini-2.5-flash';
      
      const response = await ai.models.generateContent({
        model,
        contents: [
            ...messages.filter(m => m.id !== 'welcome').map(m => ({
                role: m.sender === ChatSender.USER ? 'user' : 'model',
                parts: [{ text: m.text }]
            })),
            { role: 'user', parts: [{ text: input }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      const text = response.text || "Connection interrupted. Please retry.";

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: text,
        sender: ChatSender.BOT,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("AI Error:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Error: Neural network unresponsive. Contact Alex via email.",
        sender: ChatSender.BOT,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-none border border-tech-blue shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all duration-300 ${
          isOpen 
            ? 'bg-zinc-900 text-white' 
            : 'bg-tech-base text-tech-blue hover:bg-tech-blue hover:text-white'
        }`}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-[calc(100vw-3rem)] md:w-96 h-[500px] max-h-[70vh] bg-tech-base border border-tech-border shadow-2xl z-40 flex flex-col animate-fade-in-up">
          {/* Header */}
          <div className="bg-tech-surface p-3 border-b border-tech-border flex items-center justify-between backdrop-blur-sm">
            <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 animate-pulse"></div>
                <h3 className="text-tech-text-main font-mono text-xs tracking-wider uppercase">AI_Assistant_V1.0</h3>
            </div>
            <span className="text-[10px] text-tech-text-sub font-mono">GEMINI-2.5-FLASH</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-tech-base">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === ChatSender.USER ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-6 h-6 flex items-center justify-center flex-shrink-0 border ${
                  msg.sender === ChatSender.USER ? 'border-tech-border bg-tech-surface' : 'border-tech-blue bg-tech-blue/10'
                }`}>
                  {msg.sender === ChatSender.USER ? <User size={12} className="text-tech-text-main" /> : <Bot size={12} className="text-tech-blue" />}
                </div>
                <div className={`p-3 text-sm max-w-[85%] font-light leading-relaxed ${
                  msg.sender === ChatSender.USER 
                    ? 'bg-tech-surface text-tech-text-main border border-tech-border' 
                    : 'bg-tech-surface/50 text-tech-text-sub border border-tech-border'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                 <div className="w-6 h-6 border border-tech-blue bg-tech-blue/10 flex items-center justify-center flex-shrink-0">
                  <Bot size={12} className="text-tech-blue" />
                </div>
                <div className="bg-tech-surface p-2 border border-tech-border">
                  <Loader2 size={14} className="animate-spin text-tech-blue" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-tech-surface border-t border-tech-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter command..."
                className="flex-1 bg-tech-base border border-tech-border text-tech-text-main px-3 py-2 text-sm focus:outline-none focus:border-tech-blue font-mono placeholder:text-tech-text-sub"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-tech-highlight border border-tech-border text-tech-text-main p-2 hover:bg-tech-blue hover:border-tech-blue disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;