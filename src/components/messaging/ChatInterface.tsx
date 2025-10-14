import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Paperclip, AlertCircle, Image as ImageIcon, FileText } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'owner' | 'walker';
  content: string;
  timestamp: number;
  type: 'text' | 'image' | 'file' | 'emergency';
  attachments?: string[];
}

interface ChatInterfaceProps {
  bookingId: string;
  currentUserId: string;
  currentUserName: string;
  currentUserType: 'owner' | 'walker';
  otherUserName: string;
  otherUserType: 'owner' | 'walker';
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  bookingId,
  currentUserId,
  currentUserName,
  currentUserType,
  otherUserName,
  otherUserType
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Charger les messages depuis le localStorage
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem(`chat_${bookingId}`) || '[]');
    setMessages(savedMessages);
  }, [bookingId]);

  // Sauvegarder les messages dans le localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`chat_${bookingId}`, JSON.stringify(messages));
    }
  }, [messages, bookingId]);

  // Scroll automatique vers le bas
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: currentUserName,
      senderType: currentUserType,
      content: newMessage,
      timestamp: Date.now(),
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simuler une réponse automatique (pour la démo)
    if (messages.length < 3) {
      setTimeout(() => {
        const autoReply: Message = {
          id: (Date.now() + 1).toString(),
          senderId: 'other',
          senderName: otherUserName,
          senderType: otherUserType,
          content: 'Merci pour votre message ! Je vous réponds dès que possible.',
          timestamp: Date.now(),
          type: 'text'
        };
        setMessages(prev => [...prev, autoReply]);
      }, 2000);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier la taille du fichier (max 5 Mo)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Fichier trop volumineux",
        description: "La taille maximale est de 5 Mo",
        variant: "destructive",
      });
      return;
    }

    const fileType = file.type.startsWith('image/') ? 'image' : 'file';
    
    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: currentUserName,
      senderType: currentUserType,
      content: `${fileType === 'image' ? '📷' : '📎'} ${file.name}`,
      timestamp: Date.now(),
      type: fileType,
      attachments: [URL.createObjectURL(file)]
    };

    setMessages(prev => [...prev, message]);
    
    toast({
      title: "Fichier envoyé",
      description: `${file.name} a été envoyé avec succès`,
    });
  };

  const handleEmergency = () => {
    const emergencyMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: currentUserName,
      senderType: currentUserType,
      content: '🚨 URGENCE : J\'ai besoin d\'aide immédiatement !',
      timestamp: Date.now(),
      type: 'emergency'
    };

    setMessages(prev => [...prev, emergencyMessage]);

    toast({
      title: "Alerte d'urgence envoyée",
      description: "Une notification a été envoyée. Notre équipe vous contactera rapidement.",
      variant: "destructive",
    });

    // Envoyer une notification d'urgence
    const emergencyNotification = {
      type: 'emergency',
      bookingId,
      from: currentUserName,
      timestamp: Date.now()
    };
    
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications.push(emergencyNotification);
    localStorage.setItem('notifications', JSON.stringify(notifications));
  };

  const sendSpecialInstructions = () => {
    const instructions = prompt('Entrez vos instructions spéciales pour le promeneur :');
    if (!instructions) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: currentUserName,
      senderType: currentUserType,
      content: `📋 Instructions spéciales :\n${instructions}`,
      timestamp: Date.now(),
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    
    toast({
      title: "Instructions envoyées",
      description: "Vos instructions ont été transmises au promeneur",
    });
  };

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>
                {otherUserName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{otherUserName}</div>
              <div className="text-sm text-muted-foreground">
                {otherUserType === 'walker' ? 'Promeneur certifié' : 'Propriétaire'}
              </div>
            </div>
          </div>
          {isTyping && (
            <Badge variant="secondary" className="animate-pulse">
              En train d'écrire...
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <Send className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Aucun message pour le moment</p>
              <p className="text-sm">Envoyez un message pour démarrer la conversation</p>
            </div>
          </div>
        ) : (
          messages.map((message) => {
            const isCurrentUser = message.senderId === currentUserId;
            const isEmergency = message.type === 'emergency';

            return (
              <div
                key={message.id}
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    isEmergency
                      ? 'bg-red-100 border-2 border-red-500'
                      : isCurrentUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {!isCurrentUser && (
                    <div className="text-xs font-medium mb-1 opacity-70">
                      {message.senderName}
                    </div>
                  )}
                  
                  <div className="whitespace-pre-wrap break-words">
                    {message.content}
                  </div>

                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {message.type === 'image' ? (
                        message.attachments.map((url, idx) => (
                          <img
                            key={idx}
                            src={url}
                            alt="Attachment"
                            className="max-w-full rounded"
                          />
                        ))
                      ) : (
                        message.attachments.map((url, idx) => (
                          <a
                            key={idx}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm underline"
                          >
                            <FileText className="h-4 w-4" />
                            Télécharger le fichier
                          </a>
                        ))
                      )}
                    </div>
                  )}

                  <div
                    className={`text-xs mt-1 ${
                      isCurrentUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </CardContent>

      <div className="border-t p-4 space-y-2">
        {/* Boutons d'action rapide */}
        <div className="flex gap-2">
          {currentUserType === 'owner' && (
            <Button
              size="sm"
              variant="outline"
              onClick={sendSpecialInstructions}
              className="flex-1"
            >
              <FileText className="h-4 w-4 mr-2" />
              Instructions spéciales
            </Button>
          )}
          <Button
            size="sm"
            variant="destructive"
            onClick={handleEmergency}
            className="flex-1"
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            Urgence
          </Button>
        </div>

        {/* Zone de saisie */}
        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            size="icon"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Écrivez votre message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

