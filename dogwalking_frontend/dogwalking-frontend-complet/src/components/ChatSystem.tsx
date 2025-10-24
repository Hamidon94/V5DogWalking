import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, X, User, Dog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'client' | 'walker';
  content: string;
  timestamp: Date;
  read: boolean;
}

interface ChatSystemProps {
  bookingId: string;
  currentUserId: string;
  currentUserType: 'client' | 'walker';
  otherUserName: string;
  otherUserAvatar?: string;
}

const ChatSystem: React.FC<ChatSystemProps> = ({
  bookingId,
  currentUserId,
  currentUserType,
  otherUserName,
  otherUserAvatar
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'other',
      senderName: otherUserName,
      senderType: currentUserType === 'client' ? 'walker' : 'client',
      content: 'Bonjour ! Je suis en route pour récupérer votre chien.',
      timestamp: new Date(Date.now() - 300000),
      read: true
    },
    {
      id: '2',
      senderId: currentUserId,
      senderName: 'Vous',
      senderType: currentUserType,
      content: 'Parfait ! Il vous attend près de la porte d\'entrée.',
      timestamp: new Date(Date.now() - 240000),
      read: true
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: currentUserId,
        senderName: 'Vous',
        senderType: currentUserType,
        content: newMessage.trim(),
        timestamp: new Date(),
        read: false
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Simulate response from other user after 2 seconds
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          senderId: 'other',
          senderName: otherUserName,
          senderType: currentUserType === 'client' ? 'walker' : 'client',
          content: 'Message reçu ! Merci.',
          timestamp: new Date(),
          read: false
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const unreadCount = messages.filter(m => !m.read && m.senderId !== currentUserId).length;

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-14 h-14 shadow-lg relative"
          size="icon"
        >
          <MessageCircle className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 h-96 z-50 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Avatar className="w-8 h-8">
                <AvatarImage src={otherUserAvatar} />
                <AvatarFallback>
                  {currentUserType === 'client' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Dog className="w-4 h-4" />
                  )}
                </AvatarFallback>
              </Avatar>
              {otherUserName}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex flex-col h-72 p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.senderId === currentUserId
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.senderId === currentUserId
                        ? 'text-primary-foreground/70'
                        : 'text-muted-foreground'
                    }`}>
                      {message.timestamp.toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tapez votre message..."
                  className="flex-1"
                />
                <Button onClick={sendMessage} size="icon">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatSystem;