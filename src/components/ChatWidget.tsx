import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { sendMessage, ChatMessage } from '../services/geminiService';

/* ── Animations ── */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 80%, 100% { opacity: 0.3; }
  40% { opacity: 1; }
`;

/* ── Styled Components ── */
const Bubble = styled.button`
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 1000;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #a78bfa, #60a5fa);
  color: #fff;
  font-size: 26px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(167, 139, 250, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 6px 28px rgba(167, 139, 250, 0.55);
  }
`;

const ChatWindow = styled.div`
  position: fixed;
  bottom: 96px;
  right: 28px;
  z-index: 1000;
  width: 370px;
  max-height: 520px;
  border-radius: 16px;
  background: #1a1a2e;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.25s ease;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  padding: 16px 20px;
  background: linear-gradient(135deg, rgba(167, 139, 250, 0.15), rgba(96, 165, 250, 0.15));
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  line-height: 1;

  &:hover {
    color: #ffffff;
  }
`;

const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 300px;
  max-height: 380px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 2px;
  }
`;

const MessageBubble = styled.div<{ $isUser: boolean }>`
  max-width: 85%;
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
  align-self: ${(p) => (p.$isUser ? 'flex-end' : 'flex-start')};
  background: ${(p) =>
    p.$isUser
      ? 'linear-gradient(135deg, #a78bfa, #60a5fa)'
      : 'rgba(255, 255, 255, 0.08)'};
  color: ${(p) => (p.$isUser ? '#ffffff' : 'rgba(255, 255, 255, 0.85)')};
`;

const TypingDots = styled.div`
  display: flex;
  gap: 4px;
  padding: 10px 14px;
  align-self: flex-start;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 14px;

  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    animation: ${pulse} 1.2s infinite;
  }
  span:nth-child(2) { animation-delay: 0.2s; }
  span:nth-child(3) { animation-delay: 0.4s; }
`;

const InputArea = styled.form`
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
`;

const Input = styled.input`
  flex: 1;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 10px 14px;
  color: #ffffff;
  font-size: 14px;
  font-family: inherit;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.35);
  }

  &:focus {
    border-color: rgba(167, 139, 250, 0.5);
  }
`;

const SendBtn = styled.button`
  background: linear-gradient(135deg, #a78bfa, #60a5fa);
  border: none;
  border-radius: 10px;
  padding: 0 14px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

/* ── Component ── */
export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', text: "Hi! I'm Yulia's assistant. Ask me anything about her travels, work, or how to get in touch!" },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await sendMessage(messages, text);
    setMessages((prev) => [...prev, { role: 'assistant', text: response }]);
    setIsLoading(false);
  };

  return (
    <>
      {isOpen && (
        <ChatWindow>
          <ChatHeader>
            <HeaderTitle>Yulia's Assistant</HeaderTitle>
            <CloseBtn onClick={() => setIsOpen(false)}>✕</CloseBtn>
          </ChatHeader>
          <Messages>
            {messages.map((msg, i) => (
              <MessageBubble key={i} $isUser={msg.role === 'user'}>
                {msg.text}
              </MessageBubble>
            ))}
            {isLoading && (
              <TypingDots>
                <span /><span /><span />
              </TypingDots>
            )}
            <div ref={messagesEndRef} />
          </Messages>
          <InputArea onSubmit={handleSubmit}>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={isLoading}
            />
            <SendBtn type="submit" disabled={isLoading || !input.trim()}>
              ➤
            </SendBtn>
          </InputArea>
        </ChatWindow>
      )}
      <Bubble onClick={() => setIsOpen((o) => !o)} title="Chat with Yulia's assistant">
        {isOpen ? '✕' : '💬'}
      </Bubble>
    </>
  );
};
