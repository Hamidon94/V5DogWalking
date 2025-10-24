import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Star, Heart, Settings, Bell, CreditCard, Users, PawPrint, Play, CheckCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const SitterDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const pendingBookings = [
    {
      id: 1,
      owner: "Sophie M.",
      service: "Promenade de chien",
      date: "Demain à 10h00",
      pet: "Bella",
      status: "en_attente",
      price: "13€",
      duration: "1h"
    },
    {
      id: 2,
      owner: "Thomas R.",
      service: "Garde à domicile",
      date: "20-25 Oct 2024",
      pet: "Rex & Mia",
      status: "en_attente",
      price: "155€",
      duration: "5 nuits"
    }
  ];

  const confirmedBookings = [
    {
      id: 3,
      owner: "Marie L.",
      service: "Visite à domicile",
      date: "Aujourd'hui à 16h00",
      pet: "Whiskers",
      status: "confirmé",
      price: "19€",
      duration: "30min",
      canStart: true
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Nouvelle demande",
      description: "Sophie M. vous a envoyé une demande de promenade",
      time: "Il y a 1h",
      icon: "📩"
    },
    {
      id: 2,
      action: "Service terminé",
      description: "Promenade avec Max terminée avec succès",
      time: "Il y a 3h",
      icon: "✅"
    },
    {
      id: 3,
      action: "Avis reçu",
      description: "Claire D. vous a laissé un avis 5 étoiles",
      time: "Hier",
      icon: "⭐"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Bonjour, Jean !</h1>
            <p className="text-muted-foreground">Gérez vos services et suivez vos revenus</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Paramètres
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="requests">Demandes</TabsTrigger>
            <TabsTrigger value="calendar">Calendrier</TabsTrigger>
            <TabsTrigger value="earnings">Revenus</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Demandes en attente</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">Nécessitent une réponse</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Services confirmés</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">Cette semaine</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenus ce mois</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">420€</div>
                  <p className="text-xs text-muted-foreground">+15% par rapport au mois dernier</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Note moyenne</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.9</div>
                  <p className="text-xs text-muted-foreground">Sur 23 avis</p>
                </CardContent>
              </Card>
            </div>

            {/* Services à démarrer */}
            <Card>
              <CardHeader>
                <CardTitle>Services à démarrer</CardTitle>
                <CardDescription>Cliquez sur "Prise en charge" pour activer le suivi GPS</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {confirmedBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-dogwalking-green/10 rounded-full flex items-center justify-center">
                          <PawPrint className="w-6 h-6 text-dogwalking-green" />
                        </div>
                        <div>
                          <p className="font-medium">{booking.service}</p>
                          <p className="text-sm text-muted-foreground">Pour {booking.owner} - {booking.pet}</p>
                          <p className="text-sm text-muted-foreground">{booking.date} ({booking.duration})</p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge variant="default">Confirmé</Badge>
                        <div>
                          <Button size="sm" className="dogwalking-button-primary">
                            <Play className="w-4 h-4 mr-2" />
                            Prise en charge
                          </Button>
                        </div>
                        <p className="text-sm font-medium">{booking.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Demandes en attente */}
            <Card>
              <CardHeader>
                <CardTitle>Demandes en attente</CardTitle>
                <CardDescription>Répondez rapidement pour améliorer votre taux de réponse</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-between">
                          <PawPrint className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium">{booking.service}</p>
                          <p className="text-sm text-muted-foreground">Pour {booking.owner} - {booking.pet}</p>
                          <p className="text-sm text-muted-foreground">{booking.date} ({booking.duration})</p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge variant="secondary">En attente</Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Refuser
                          </Button>
                          <Button size="sm" className="dogwalking-button-primary">
                            Accepter
                          </Button>
                        </div>
                        <p className="text-sm font-medium">{booking.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4">
                      <div className="text-2xl">{activity.icon}</div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Toutes les demandes</CardTitle>
                <CardDescription>Gérez vos demandes de services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Vos demandes apparaîtront ici</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendrier des disponibilités</CardTitle>
                <CardDescription>Gérez vos créneaux disponibles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Votre calendrier apparaîtra ici</p>
                  <Button className="mt-4">Configurer mes disponibilités</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenus et paiements</CardTitle>
                <CardDescription>Suivez vos gains et historique des paiements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Vos revenus apparaîtront ici</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Conversations avec les propriétaires</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Aucune conversation pour le moment</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default SitterDashboard;
