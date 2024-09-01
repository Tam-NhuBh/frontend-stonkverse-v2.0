"use client";

import React, { useRef, useState } from 'react';
import './chatbot/style.css';
import { FaComment, FaTimes } from 'react-icons/fa';
import { MdOutlineSmartToy } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addMessage } from '@/slice/chatbot-client.slice';
import { chatbotApi } from '@/store/chatbot/chatbot-client-api';
import { AiOutlineSend } from "react-icons/ai";


const ChatBotClient: React.FC = () => {
    const dispatch = useDispatch();
    const messages = useSelector((state: RootState) => state.chatbotClient.messages);
    const [isLoading, setIsLoading] = useState(false);
    
    const [showChatIcon, setShowChatIcon] = useState(true);
    const chatboxRef = useRef<HTMLUListElement>(null);
    const chatInputRef = useRef<HTMLTextAreaElement>(null);
    const inputInitHeight = chatInputRef.current?.scrollHeight || 0;

    const generateResponse = async (userMessage: string) => {
        setIsLoading(true);
        const botResponse = await chatbotApi(userMessage);
        dispatch(addMessage(botResponse));
        setIsLoading(false);
    };

    const handleChat = () => {
        const userMessage = chatInputRef.current?.value.trim();
        console.log("usermess:", userMessage)

        if (!userMessage) return;

        dispatch(addMessage(userMessage));
        if (chatInputRef.current) {
            chatInputRef.current.value = "";
            chatInputRef.current.style.height = `${inputInitHeight}px`;
        }

        if (chatboxRef.current) {
            chatboxRef.current.scrollTo(0, chatboxRef.current.scrollHeight);
        }

        setTimeout(() => {
            generateResponse(userMessage);
        }, 600);
    };

    const handleInputChange = () => {
        if (chatInputRef.current) {
            chatInputRef.current.style.height = `${inputInitHeight}px`;
            chatInputRef.current.style.height = `${chatInputRef.current.scrollHeight}px`;
        }
    };

    const handleToggleChatbot = () => {
        setShowChatIcon(!showChatIcon);
        document.body.classList.toggle("show-chatbot");
    };

    return (
        <div>
            <button className="chatbot-toggler" onClick={handleToggleChatbot}>
                {showChatIcon ? <FaComment className="material-symbols-rounded" /> : null}
                {!showChatIcon ? <FaTimes className="material-symbols-outlined" /> : null}
            </button>
            <div className="chatbot">
                <header >
                    <h2 className="text-xl font-bold">CHATBOT</h2>
                    <span className="close-btn" onClick={handleToggleChatbot}>
                        <FaTimes className="icon" />
                    </span>
                </header>
                <ul className="chatbox bg-white dark:bg-opacity-50 dark-bg" ref={chatboxRef}>
                    {messages.map((message, index) => (
                        <li key={index} className={`chat ${index % 2 === 0 ? 'incoming' : 'outgoing'}`}>
                            {index % 2 === 0 && (
                                <MdOutlineSmartToy
                                    className='material-symbols-outlined icon text-black dark:text-white'
                                    size={40}
                                    style={{ marginRight: '3px', marginTop: 'auto', marginBottom: '10px' }}
                                />
                            )}
                            <p>{message}</p>
                        </li>
                    ))}
                    {isLoading && (
                        <li className="loading-icon">
                            <div className="loading-spinner"></div>
                        </li>
                    )}
                </ul>

                <div className="chat-input bg-white dark:bg-opacity-50 dark-bg border-t dark:border-slate-600">
                    <textarea 
                        ref={chatInputRef}
                        placeholder="Enter a message..."
                        spellCheck={false}
                        onChange={handleInputChange}
                        required
                    />
                    <span id="send-btn" className="material-symbols-rounded hover:text-blue-300 cursor-pointer" onClick={handleChat}>
                        <AiOutlineSend  className="icon"/>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ChatBotClient;
