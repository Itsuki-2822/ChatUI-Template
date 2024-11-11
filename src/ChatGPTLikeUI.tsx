// src/ChatGPTLikeUI.tsx

'use client'

import React, { useState } from 'react';
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { ScrollArea } from "./components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar"
import { PlusCircle, Send, Menu, Edit3, Check } from 'lucide-react';

type Message = {
  id: number
  content: string
  role: 'user' | 'assistant'
}

type Conversation = {
  id: number
  title: string
  messages: Message[]
}

export default function ChatGPTLikeUI() {
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: 1, title: 'New chat', messages: [] }
  ]);
  const [currentConversation, setCurrentConversation] = useState<Conversation>(conversations[0]);
  const [input, setInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // 新規会話用モーダル表示
  const [newTitle, setNewTitle] = useState(''); // 新規会話のタイトル入力用
  const [isEditingTitle, setIsEditingTitle] = useState<number | null>(null); // 編集中の会話ID
  const [editedTitle, setEditedTitle] = useState(''); // 編集中のタイトル

  const handleSendMessage = () => {
    if (input.trim()) {
      const newUserMessage: Message = {
        id: currentConversation.messages.length + 1,
        content: input.trim(),
        role: 'user'
      }
      
      const updatedConversation = {
        ...currentConversation,
        messages: [...currentConversation.messages, newUserMessage]
      }
      
      setCurrentConversation(updatedConversation)
      setConversations(conversations.map(conv => 
        conv.id === currentConversation.id ? updatedConversation : conv
      ))
      setInput('')
      
      // Simulate assistant response
      setTimeout(() => {
        const assistantResponse: Message = {
          id: updatedConversation.messages.length + 1,
          content: "I'm an AI assistant. I'm here to help answer your questions and assist with various tasks. How can I help you today?",
          role: 'assistant'
        }
        const conversationWithResponse = {
          ...updatedConversation,
          messages: [...updatedConversation.messages, assistantResponse]
        }
        setCurrentConversation(conversationWithResponse)
        setConversations(conversations.map(conv => 
          conv.id === currentConversation.id ? conversationWithResponse : conv
        ))
      }, 1000)
    }
  }

  const startNewConversation = () => {
    setIsModalOpen(true);
  };

  const handleCreateConversation = () => {
    if (newTitle.trim()) {
      const newConversation: Conversation = {
        id: conversations.length + 1,
        title: newTitle,
        messages: []
      };
      setConversations([...conversations, newConversation]);
      setCurrentConversation(newConversation);
      setNewTitle('');
      setIsModalOpen(false);
    }
  };

  const handleEditTitle = (convId: number) => {
    setIsEditingTitle(convId); // 編集中の会話IDを設定
    const conversation = conversations.find((conv) => conv.id === convId);
    if (conversation) {
      setEditedTitle(conversation.title);
    }
  };

  const handleSaveTitle = (convId: number) => {
    const updatedConversations = conversations.map((conv) =>
      conv.id === convId ? { ...conv, title: editedTitle } : conv
    );
    setConversations(updatedConversations);
    setIsEditingTitle(null); // 編集状態を解除
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-gray-900 text-white ${isSidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 ease-in-out overflow-hidden`}>
        <div className="p-4">
          <Button onClick={startNewConversation} variant="outline" className="w-full justify-start">
            <PlusCircle className="mr-2 h-4 w-4" />
            New chat
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-5rem)] px-4">
          {conversations.map((conv) => (
            <div key={conv.id} className="flex items-center mb-2">
              {isEditingTitle === conv.id ? (
                <div className="flex w-full">
                  <Input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="flex-grow mr-2 text-black"
                  />
                  <Button size="icon" onClick={() => handleSaveTitle(conv.id)}>
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  className="flex-grow justify-start text-left"
                  onClick={() => setCurrentConversation(conv)}
                >
                  {conv.title}
                </Button>
              )}
              {isEditingTitle !== conv.id && (
                <Button size="icon" onClick={() => handleEditTitle(conv.id)}>
                  <Edit3 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* モーダル */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">New Chat Title</h2>
            <Input
              type="text"
              placeholder="Enter chat title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="mb-4"
            />
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setIsModalOpen(false)} className="mr-2">Cancel</Button>
              <Button onClick={handleCreateConversation}>Create</Button>
            </div>
          </div>
        </div>
      )}

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b p-4 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="mr-2">
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold">{currentConversation.title}</h1>
        </header>
        <ScrollArea className="flex-1 p-4">
          {currentConversation.messages.map((message) => (
            <div key={message.id} className={`flex mb-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{message.role === 'user' ? 'U' : 'A'}</AvatarFallback>
                  <AvatarImage src={message.role === 'user' ? '/user-avatar.png' : '/assistant-avatar.png'} />
                </Avatar>
                <div className={`mx-2 p-3 rounded-lg ${
                  message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                }`}>
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="p-4 border-t bg-white">
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center">
            <Input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow mr-2"
            />
            <Button type="submit" size="icon" disabled={!input.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}