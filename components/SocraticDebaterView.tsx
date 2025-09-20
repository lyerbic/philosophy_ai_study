import React, { useState, useRef, useEffect } from 'react';
import type { Chat } from "@google/genai";
import { ChatMessage } from '../types';
import { PHILOSOPHERS } from '../constants';
import { getDebateResponse, createChat } from '../services/geminiService';
import Spinner from './ui/Spinner';

const SocraticDebaterView: React.FC = () => {
  const [selectedPhilosopher, setSelectedPhilosopher] = useState('socrates');
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const persona = PHILOSOPHERS[selectedPhilosopher];
    setMessages([{ sender: 'ai', text: `Greetings. I am ${persona.name}. State your premise.` }]);
    const newChat = createChat(persona.systemInstruction);
    setChat(newChat);
  }, [selectedPhilosopher]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!userInput.trim() || isLoading || !chat) return;

    const newMessages: ChatMessage[] = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    const response = await getDebateResponse(chat, userInput);
    
    if (response) {
      setMessages([...newMessages, { sender: 'ai', text: response.text }]);
    } else {
      setMessages([...newMessages, { sender: 'ai', text: 'I seem to be lost in thought... Please try again.' }]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSend();
    }
  };

  return (
    <div className="max-w-3xl mx-auto h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
        <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text">Socratic Debater</h2>
            <p className="text-muted text-sm sm:text-base">Challenge your assumptions against a great mind.</p>
        </div>
        <select
          value={selectedPhilosopher}
          onChange={(e) => setSelectedPhilosopher(e.target.value)}
          className="bg-surface border border-subtle rounded-md p-2 text-text focus:ring-2 focus:ring-primary"
        >
          {Object.entries(PHILOSOPHERS).map(([key, { name }]) => (
            <option key={key} value={key}>{name}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 bg-surface p-4 rounded-lg shadow-inner overflow-y-auto mb-4 border border-subtle">
        {messages.map((msg, index) => (
          <div key={index} className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-md p-3 rounded-lg ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-overlay text-text'}`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
                <div className="max-w-md p-3 rounded-lg bg-overlay text-text">
                   <Spinner size="sm" />
                </div>
            </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="flex">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Respond..."
          className="flex-1 bg-surface p-3 rounded-l-md border border-subtle text-text focus:ring-2 focus:ring-primary focus:outline-none"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="px-6 py-2 bg-primary text-white font-semibold rounded-r-md hover:bg-primary-hover disabled:bg-gray-300 disabled:text-muted disabled:cursor-not-allowed transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SocraticDebaterView;