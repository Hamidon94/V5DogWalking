import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Trash2, Check, Settings } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface Notification {
  id: string;
  type: "booking" | "message" | "review" | "payment" | "system";
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "NOTIF001",
      type: "booking",
      title: "Nouvelle demande de réservation",
      description: "Jean Dupont a demandé une promenade pour Max le 25 octobre à 14:00",
      timestamp: "Il y a 5 minutes",
      read: false,
      actionUrl: "/booking",
    },
    {
      id: "NOTIF002",
      type: "message",
      title: "Nouveau message",
      description: "Marie Dubois : Merci pour la promenade d'hier !",
      timestamp: "Il y a 30 minutes",
      read: false,
      actionUrl: "/messaging",
    },
    {
      id: "NOTIF003",
      type: "review",
      title: "Nouvel avis reçu",
      description: "Pierre Durand a laissé un avis 5⭐ pour votre service",
      timestamp: "Il y a 2 heures",
      read: false,
      actionUrl: "/profile",
    },
    {
      id: "NOTIF004",
      type: "payment",
      title: "Paiement reçu",
      description: "Vous avez reçu 25€ pour la promenade du 22 octobre",
      timestamp: "Il y a 1 jour",
      read: true,
      actionUrl: "/earnings",
    },
    {
      id: "NOTIF005",
      type: "system",
      title: "Mise à jour du système",
      description: "DogWalking a été mis à jour avec de nouvelles fonctionnalités",
      timestamp: "Il y a 2 jours",
      read: true,
    },
    {
      id: "NOTIF006",
      type: "booking",
      title: "Réservation confirmée",
      description: "Votre réservation pour Luna le 26 octobre est confirmée",
      timestamp: "Il y a 3 jours",
      read: true,
      actionUrl: "/booking",
    },
  ]);

  const [filterType, setFilterType] = useState<string | null>(null);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "booking":
        return "bg-blue-100 text-blue-800";
      case "message":
        return "bg-green-100 text-green-800";
      case "review":
        return "bg-yellow-100 text-yellow-800";
      case "payment":
        return "bg-purple-100 text-purple-800";
      case "system":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "booking":
        return "Réservation";
      case "message":
        return "Message";
      case "review":
        return "Avis";
      case "payment":
        return "Paiement";
      case "system":
        return "Système";
      default:
        return "Autre";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "booking":
        return "📅";
      case "message":
        return "💬";
      case "review":
        return "⭐";
      case "payment":
        return "💰";
      case "system":
        return "⚙️";
      default:
        return "🔔";
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const handleDeleteAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = filterType
    ? notifications.filter((n) => n.type === filterType)
    : notifications;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Notifications</h1>
            <p className="text-muted-foreground">
              {unreadCount} notification(s) non lue(s)
            </p>
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" onClick={handleMarkAllAsRead}>
                <Check className="w-4 h-4 mr-2" />
                Tout marquer comme lu
              </Button>
            )}
            <Button variant="outline" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Filtres */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <Button
            variant={filterType === null ? "default" : "outline"}
            onClick={() => setFilterType(null)}
          >
            Toutes
          </Button>
          {["booking", "message", "review", "payment", "system"].map((type) => (
            <Button
              key={type}
              variant={filterType === type ? "default" : "outline"}
              onClick={() => setFilterType(type)}
            >
              {getTypeLabel(type)}
            </Button>
          ))}
        </div>

        {/* Notifications */}
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="pt-12 text-center">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">
                {filterType
                  ? "Aucune notification de ce type"
                  : "Aucune notification pour le moment"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={notification.read ? "opacity-75" : "border-green-200 bg-green-50"}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    {/* Icône */}
                    <div className="text-3xl flex-shrink-0">
                      {getTypeIcon(notification.type)}
                    </div>

                    {/* Contenu */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {notification.description}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground ml-4">
                          {notification.timestamp}
                        </span>
                      </div>

                      {/* Badge et actions */}
                      <div className="flex items-center gap-2 mt-3">
                        <Badge className={getTypeColor(notification.type)}>
                          {getTypeLabel(notification.type)}
                        </Badge>

                        {!notification.read && (
                          <Badge className="bg-green-600">Nouveau</Badge>
                        )}

                        <div className="flex-1" />

                        {notification.actionUrl && (
                          <Button size="sm" variant="outline">
                            Voir
                          </Button>
                        )}

                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(notification.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredNotifications.length > 0 && (
              <div className="text-center pt-4">
                <Button variant="outline" onClick={handleDeleteAll}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer toutes les notifications
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Paramètres de notifications */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Paramètres de Notifications</CardTitle>
            <CardDescription>
              Gérez comment vous recevez les notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Nouvelles réservations", enabled: true },
              { label: "Messages", enabled: true },
              { label: "Avis et commentaires", enabled: true },
              { label: "Paiements reçus", enabled: true },
              { label: "Mises à jour du système", enabled: false },
              { label: "Offres spéciales", enabled: false },
            ].map((setting, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <label className="text-sm font-medium">{setting.label}</label>
                <input
                  type="checkbox"
                  defaultChecked={setting.enabled}
                  className="w-4 h-4 rounded"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Notifications;

