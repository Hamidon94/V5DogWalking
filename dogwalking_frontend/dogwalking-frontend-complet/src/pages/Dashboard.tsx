import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Star, Heart, Settings, Bell, CreditCard, Users, PawPrint } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const upcomingBookings = [
    {
      id: 1,
      petSitter: "Marie D.",
      service: "Promenade de chien",
      date: "Aujourd'hui à 14h00",
      pet: "Max",
      status: "confirmé",
      price: "25€"
    },
    {
      id: 2,
      petSitter: "Pierre L.",
      service: "Garde à domicile",
      date: "15-20 Oct 2024",
      pet: "Luna & Milo",
      status: "en_attente",
      price: "150€"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Réservation confirmée",
      description: "Marie D. a accepté votre demande de promenade",
      time: "Il y a 2h",
      icon: "✅"
    },
    {
      id: 2,
      action: "Nouveau message",
      description: "Pierre L. vous a envoyé un message",
      time: "Il y a 4h",
      icon: "💬"
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
            <p className="text-muted-foreground">Gérez vos réservations et suivez vos animaux</p>
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="bookings">Réservations</TabsTrigger>
            <TabsTrigger value="pets">Mes Animaux</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Réservations actives</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">+1 depuis la semaine dernière</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Promeneur certifiés favoris</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">Dans votre liste</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Dépenses ce mois</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">284€</div>
                  <p className="text-xs text-muted-foreground">-12% par rapport au mois dernier</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avis laissés</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">Note moyenne: 4.8/5</p>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Prochaines réservations</CardTitle>
                <CardDescription>Vos prochains rendez-vous avec vos promeneur certifiés</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-dogwalking-green/10 rounded-full flex items-center justify-center">
                          <PawPrint className="w-6 h-6 text-dogwalking-green" />
                        </div>
                        <div>
                          <p className="font-medium">{booking.service}</p>
                          <p className="text-sm text-muted-foreground">Avec {booking.petSitter}</p>
                          <p className="text-sm text-muted-foreground">{booking.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={booking.status === "confirmé" ? "default" : "secondary"}>
                          {booking.status === "confirmé" ? "Confirmé" : "En attente"}
                        </Badge>
                        <p className="text-sm font-medium mt-1">{booking.price}</p>
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

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Toutes les réservations</CardTitle>
                <CardDescription>Historique et réservations à venir</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <PawPrint className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Vos réservations apparaîtront ici</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mes animaux</CardTitle>
                <CardDescription>Gérez les profils de vos compagnons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <PawPrint className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Ajoutez vos animaux pour commencer</p>
                  <Button className="mt-4">Ajouter un animal</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Conversations avec vos promeneur certifiés</CardDescription>
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

export default Dashboard;