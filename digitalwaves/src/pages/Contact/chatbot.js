import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.REACT_APP_API_KEY ;
const ChatApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you today?', isBot: true }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const generateResponse = async (userMessage) => {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    try {
      const chat = model.startChat();
      const result = await chat.sendMessage(userMessage);
      
      const response = await result.response;
      const textResponse = response.text();
      
      if (textResponse) {
        return textResponse;
      }
      throw new Error('No response generated');
    } catch (error) {
      console.error('Error generating response:', error);
      throw new Error(error.message || 'Failed to generate response');
    }
  };

  const handleSend = async () => {
    if (message.trim() && !isLoading) {
      const userMessage = { text: message, isBot: false };
      setMessages(prev => [...prev, userMessage]);
      setMessage('');
      setIsLoading(true);

      try {
        const response = await generateResponse(message);
        setMessages(prev => [...prev, { text: response, isBot: true }]);
      } catch (error) {
        console.error('Error:', error);
        setMessages(prev => [
          ...prev, 
          { 
            text: "I apologize, but I'm having trouble connecting to the AI service. Please try again in a moment.", 
            isBot: true 
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="fixed z-50 bottom-4 right-4">
      {isOpen && (
        <div className="absolute right-0 flex flex-col bg-white rounded-lg shadow-xl bottom-16 w-80 h-96">
          {/* Header */}
          <div className="p-4 bg-[#F66B0E] rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium text-white">Support.AI</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:opacity-80"
            >
              <X size={20} />
            </button>
          </div>

      
          <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-white">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.isBot 
                      ? 'bg-gray-100' 
                      : 'bg-[#F66B0E] text-white'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="p-3 bg-gray-100 rounded-lg">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                disabled={isLoading}
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F66B0E] disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="p-2 bg-[#F66B0E] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#F66B0E] text-white p-4 rounded-full shadow-lg hover:opacity-90 transition-opacity"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
};

export default ChatApp;
