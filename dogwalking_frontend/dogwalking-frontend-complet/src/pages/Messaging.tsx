import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, Search, Phone, Video, MoreVertical, Paperclip, Smile } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface Message {
  id: string;
  sender: "user" | "other";
  content: string;
  timestamp: string;
  read: boolean;
  attachment?: string;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: "online" | "offline" | "away";
  messages: Message[];
}

const Messaging = () => {
  const [selectedConversation, setSelectedConversation] = useState<string>("conv1");
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [conversations] = useState<Conversation[]>([
    {
      id: "conv1",
      name: "Marie Dubois",
      avatar: "👩‍🦰",
      lastMessage: "Merci pour les photos ! Max a adoré la promenade.",
      lastMessageTime: "10:30",
      unreadCount: 2,
      status: "online",
      messages: [
        {
          id: "msg1",
          sender: "other",
          content: "Bonjour ! Je suis arrivée chez vous.",
          timestamp: "09:15",
          read: true,
        },
        {
          id: "msg2",
          sender: "user",
          content: "Parfait ! Max est prêt. Vous pouvez le prendre.",
          timestamp: "09:16",
          read: true,
        },
        {
          id: "msg3",
          sender: "other",
          content: "Nous sommes au parc maintenant. Max s'amuse beaucoup !",
          timestamp: "09:45",
          read: true,
        },
        {
          id: "msg4",
          sender: "other",
          content: "Merci pour les photos ! Max a adoré la promenade.",
          timestamp: "10:30",
          read: false,
        },
      ],
    },
    {
      id: "conv2",
      name: "Jean Martin",
      avatar: "👨‍💼",
      lastMessage: "Quand pouvez-vous venir ?",
      lastMessageTime: "Hier",
      unreadCount: 0,
      status: "offline",
      messages: [
        {
          id: "msg1",
          sender: "other",
          content: "Bonjour, j'aimerais réserver un service.",
          timestamp: "Hier 14:20",
          read: true,
        },
        {
          id: "msg2",
          sender: "user",
          content: "Bien sûr ! Quel service vous intéresse ?",
          timestamp: "Hier 14:25",
          read: true,
        },
        {
          id: "msg3",
          sender: "other",
          content: "Quand pouvez-vous venir ?",
          timestamp: "Hier 15:00",
          read: true,
        },
      ],
    },
    {
      id: "conv3",
      name: "Support DogWalking",
      avatar: "🐕",
      lastMessage: "Votre demande a été traitée.",
      lastMessageTime: "Avant-hier",
      unreadCount: 0,
      status: "online",
      messages: [
        {
          id: "msg1",
          sender: "other",
          content: "Bonjour, comment puis-je vous aider ?",
          timestamp: "Avant-hier 10:00",
          read: true,
        },
        {
          id: "msg2",
          sender: "user",
          content: "J'ai une question sur ma réservation.",
          timestamp: "Avant-hier 10:05",
          read: true,
        },
        {
          id: "msg3",
          sender: "other",
          content: "Votre demande a été traitée.",
          timestamp: "Avant-hier 11:00",
          read: true,
        },
      ],
    },
  ]);

  const currentConversation = conversations.find((c) => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    // Simulation de l'envoi du message
    console.log("Message envoyé:", messageInput);
    setMessageInput("");
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Messagerie</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Liste des conversations */}
          <Card className="lg:col-span-1 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Conversations</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-3 overflow-hidden">
              {/* Barre de recherche */}
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
              </div>

              {/* Liste des conversations */}
              <div className="flex-1 overflow-y-auto space-y-2">
                {filteredConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      selectedConversation === conv.id
                        ? "bg-green-100 border border-green-300"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <span className="text-2xl">{conv.avatar}</span>
                        <div
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                            conv.status === "online"
                              ? "bg-green-500"
                              : conv.status === "away"
                              ? "bg-yellow-500"
                              : "bg-gray-500"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">{conv.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {conv.lastMessage}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs text-muted-foreground">{conv.lastMessageTime}</span>
                        {conv.unreadCount > 0 && (
                          <Badge className="bg-green-500 text-white text-xs">
                            {conv.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Zone de conversation */}
          {currentConversation && (
            <Card className="lg:col-span-2 flex flex-col">
              {/* En-tête de la conversation */}
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{currentConversation.avatar}</span>
                    <div>
                      <p className="font-semibold">{currentConversation.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {currentConversation.status === "online"
                          ? "En ligne"
                          : "Hors ligne"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.sender === "user"
                          ? "bg-green-500 text-white"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Champ de saisie */}
              <CardContent className="pt-3 border-t">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") handleSendMessage();
                    }}
                    placeholder="Écrivez votre message..."
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  />
                  <Button variant="ghost" size="sm">
                    <Smile className="w-4 h-4" />
                  </Button>
                  <Button onClick={handleSendMessage} size="sm">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Messaging;

