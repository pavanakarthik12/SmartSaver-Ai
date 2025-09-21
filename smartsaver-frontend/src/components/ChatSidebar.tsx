import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageSquare, X, Bot, User } from 'lucide-react';
import { apiService } from '../services/api';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await apiService.chat(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "How can I save more money?",
    "What's my spending pattern?",
    "Should I adjust my budget?",
    "Explain my financial forecast",
    "Give me budgeting tips"
  ];

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Chat Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 right-0 z-50 w-80 bg-secondary shadow-xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        flex flex-col border-l border-border-color
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-accent-red bg-gradient-accent text-white">
          <div className="flex items-center space-x-3">
            <Bot className="h-6 w-6" />
            <h2 className="text-xl font-bold font-heading">AI Assistant</h2>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-red-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-primary">
          {messages.length === 0 ? (
            <div className="text-center text-muted">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-accent-red" />
              <p className="text-sm font-body">Start a conversation with your AI financial assistant!</p>
              <div className="mt-6 space-y-3">
                <p className="text-xs text-muted font-body">Try asking:</p>
                {suggestedQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="block w-full text-left text-sm bg-tertiary hover:bg-accent-red text-secondary hover:text-white rounded-lg p-3 transition-colors font-body"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-xs ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.isUser ? 'bg-gradient-accent' : 'bg-tertiary'
                  }`}>
                    {message.isUser ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-secondary" />
                    )}
                  </div>
                  <div className={`${
                    message.isUser 
                      ? 'chat-message-user' 
                      : 'chat-message-bot'
                  }`}>
                    <p className="text-sm font-body">{message.text}</p>
                    <p className={`text-xs mt-2 ${
                      message.isUser ? 'text-red-100' : 'text-muted'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-tertiary flex items-center justify-center">
                  <Bot className="h-4 w-4 text-secondary" />
                </div>
                <div className="chat-message-bot">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-accent-red rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-accent-red rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-accent-red rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length === 0 && (
          <div className="p-6 border-t border-border-color bg-primary">
            <p className="text-xs text-muted mb-3 font-body">Quick questions:</p>
            <div className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="block w-full text-left text-sm bg-tertiary hover:bg-accent-red text-secondary hover:text-white rounded-lg p-3 transition-colors font-body"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-6 border-t border-border-color bg-primary">
          <form onSubmit={handleSendMessage} className="flex space-x-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about your finances..."
              className="flex-1 p-3 border border-border-color bg-secondary text-primary placeholder-muted rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent text-sm font-body"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="btn-primary p-3 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatSidebar;