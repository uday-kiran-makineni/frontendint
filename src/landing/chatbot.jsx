import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './chatbot.css';

const CHATBOT_API_URL = import.meta.env.VITE_CHATBOT_API_URL || 'https://chatbot.sidharthareddy.me/api/insurance/chat';

const MassMutualChatbot = () => {
    const [messages, setMessages] = useState([
        { 
            text: "Hello! I'm MutualBot, your insurance assistant. I can help you with questions about your policies, claims, coverage details, and more. How can I assist you today?", 
            type: 'bot' 
        }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatBodyRef = useRef(null);
    const [chatVisible, setChatVisible] = useState(false);

    // Scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const submitQuery = async () => {
        const trimmedInput = userInput.trim();
        if (trimmedInput === "" || isLoading) return;

        // Add user message to chat
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: trimmedInput, type: 'user' }
        ]);

        setUserInput("");
        setIsLoading(true);

        try {
            // Call the chatbot API
            const response = await axios.post(CHATBOT_API_URL, {
                prompt: trimmedInput
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Extract the response from the API
            let botResponse = "";
            if (response.data) {
                // Handle different possible response formats
                if (typeof response.data === 'string') {
                    botResponse = response.data;
                } else if (response.data.response) {
                    botResponse = response.data.response;
                } else if (response.data.message) {
                    botResponse = response.data.message;
                } else if (response.data.answer) {
                    botResponse = response.data.answer;
                } else if (response.data.text) {
                    botResponse = response.data.text;
                } else {
                    // If response structure is different, stringify it
                    botResponse = JSON.stringify(response.data);
                }
            } else {
                botResponse = "I apologize, but I couldn't process your request. Please try again.";
            }

            addBotMessage(botResponse);
        } catch (error) {
            console.error('Chatbot API Error:', error);
            
            let errorMessage = "I apologize, but I'm having trouble connecting to the server. Please try again later.";
            
            if (error.response) {
                // Server responded with error status
                if (error.response.status === 429) {
                    errorMessage = "I'm receiving too many requests right now. Please wait a moment and try again.";
                } else if (error.response.status === 503) {
                    errorMessage = "The service is temporarily unavailable. Please try again in a few minutes.";
                }
            } else if (error.code === 'ECONNABORTED') {
                errorMessage = "The request timed out. Please try again.";
            }
            
            addBotMessage(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const addBotMessage = (message) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: message, type: 'bot' }
        ]);
    };

    const scrollToBottom = () => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    };

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitQuery();
        }
    };

    const clearChat = () => {
        setMessages([
            { 
                text: "Hello! I'm MutualBot, your insurance assistant. I can help you with questions about your policies, claims, coverage details, and more. How can I assist you today?", 
                type: 'bot' 
            }
        ]);
    };

    return (
        <div className="chatbot-wrapper">
            {/* Chatbot icon */}
            <div className="chatbot-icon" onClick={() => setChatVisible(!chatVisible)}>
                💬
            </div>

            {/* Chat container */}
            {chatVisible && (
            
            <div className="chat-container">
            <div className="chat-header">
                 MutualBot
                <div className="header-buttons">
                    <button 
                        className="clear-btn" 
                        onClick={clearChat} 
                        aria-label="Clear chat"
                        title="Clear chat"
                    >
                        🗑️
                    </button>
                    <button 
                        className="close-btn" 
                        onClick={() => setChatVisible(false)} 
                        aria-label="Close chat"
                    >
                        ✖
                    </button>
                </div>
            </div>
            <div className="chat-body" ref={chatBodyRef}>
                {messages.map((msg, index) => (
                    <div key={index} className={`${msg.type}-message`}>
                        <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                    </div>
                ))}
                {isLoading && (
                    <div className="bot-message typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                )}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={userInput}
                    placeholder="Ask about policies, claims, coverage..."
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                />
                <button onClick={submitQuery} disabled={isLoading}>
                    {isLoading ? '...' : 'Send'}
                </button>
            </div>
        </div>
        
            )
            }
        </div>
    );
};

export default MassMutualChatbot;