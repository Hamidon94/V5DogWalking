import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, DollarSign, Star, MessageSquare, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface BookingRequest {
  id: string;
  petOwner: string;
  petName: string;
  petType: string;
  service: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  status: "pending" | "accepted" | "completed" | "cancelled";
}

interface Availability {
  day: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

const SitterDashboardComplete = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [bookingRequests] = useState<BookingRequest[]>([
    {
      id: "REQ001",
      petOwner: "Jean Dupont",
      petName: "Max",
      petType: "Chien",
      service: "Promenade",
      date: "2024-10-25",
      time: "14:00",
      duration: "45 min",
      price: 25,
      status: "pending",
    },
    {
      id: "REQ002",
      petOwner: "Marie Martin",
      petName: "Luna",
      petType: "Chien",
      service: "Hébergement",
      date: "2024-10-26",
      time: "10:00",
      duration: "2 jours",
      price: 80,
      status: "accepted",
    },
    {
      id: "REQ003",
      petOwner: "Pierre Durand",
      petName: "Bella",
      petType: "Chat",
      service: "Visite",
      date: "2024-10-27",
      time: "15:30",
      duration: "30 min",
      price: 15,
      status: "completed",
    },
  ]);

  const [availabilities] = useState<Availability[]>([
    { day: "Lundi", startTime: "09:00", endTime: "17:00", available: true },
    { day: "Mardi", startTime: "09:00", endTime: "17:00", available: true },
    { day: "Mercredi", startTime: "14:00", endTime: "20:00", available: true },
    { day: "Jeudi", startTime: "09:00", endTime: "17:00", available: true },
    { day: "Vendredi", startTime: "09:00", endTime: "17:00", available: true },
    { day: "Samedi", startTime: "10:00", endTime: "18:00", available: true },
    { day: "Dimanche", startTime: "10:00", endTime: "16:00", available: false },
  ]);

  const stats = {
    totalEarnings: 2850.5,
    monthlyEarnings: 1250.0,
    completedServices: 142,
    averageRating: 4.8,
    pendingRequests: 5,
    acceptanceRate: 92,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "En attente";
      case "accepted":
        return "Acceptée";
      case "completed":
        return "Complétée";
      case "cancelled":
        return "Annulée";
      default:
        return "Inconnu";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mon Dashboard Promeneur</h1>
          <p className="text-muted-foreground">
            Gérez vos réservations, disponibilités et revenus
          </p>
        </div>

        {/* Onglets */}
        <div className="flex gap-2 mb-8 border-b">
          {["overview", "requests", "calendar", "earnings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-green-500 text-green-600"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "overview" && "Aperçu"}
              {tab === "requests" && "Demandes"}
              {tab === "calendar" && "Calendrier"}
              {tab === "earnings" && "Revenus"}
            </button>
          ))}
        </div>

        {/* Aperçu */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Revenus Totaux</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalEarnings.toFixed(2)}€</div>
                  <p className="text-xs text-muted-foreground mt-1">Depuis le début</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Ce Mois</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.monthlyEarnings.toFixed(2)}€</div>
                  <p className="text-xs text-muted-foreground mt-1">Octobre 2024</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Services Complétés</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.completedServices}</div>
                  <p className="text-xs text-muted-foreground mt-1">Depuis le début</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Note Moyenne</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.averageRating}/5</div>
                  <p className="text-xs text-muted-foreground mt-1">⭐⭐⭐⭐⭐</p>
                </CardContent>
              </Card>
            </div>

            {/* Demandes en attente */}
            <Card>
              <CardHeader>
                <CardTitle>Demandes en Attente</CardTitle>
                <CardDescription>{stats.pendingRequests} demandes à traiter</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {bookingRequests
                  .filter((r) => r.status === "pending")
                  .map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted">
                      <div className="flex-1">
                        <p className="font-semibold">{request.petName} - {request.service}</p>
                        <p className="text-sm text-muted-foreground">
                          {request.petOwner} • {request.date} à {request.time}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-green-600">{request.price}€</span>
                        <Button size="sm">Accepter</Button>
                        <Button size="sm" variant="outline">Refuser</Button>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* Prochains services */}
            <Card>
              <CardHeader>
                <CardTitle>Prochains Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {bookingRequests
                  .filter((r) => r.status === "accepted")
                  .map((request) => (
                    <div key={request.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{request.petName} ({request.petType})</p>
                        <p className="text-sm text-muted-foreground">
                          {request.date} • {request.time} • {request.duration}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Détails</Button>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Demandes */}
        {activeTab === "requests" && (
          <Card>
            <CardHeader>
              <CardTitle>Toutes les Demandes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {bookingRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-semibold">{request.petName} - {request.service}</p>
                      <p className="text-sm text-muted-foreground">
                        {request.petOwner} • {request.date} à {request.time}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold">{request.price}€</span>
                      <Badge className={getStatusColor(request.status)}>
                        {getStatusLabel(request.status)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Calendrier */}
        {activeTab === "calendar" && (
          <Card>
            <CardHeader>
              <CardTitle>Mes Disponibilités</CardTitle>
              <CardDescription>Gérez votre calendrier de disponibilités</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {availabilities.map((avail) => (
                  <div key={avail.day} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-semibold">{avail.day}</p>
                      <p className="text-sm text-muted-foreground">
                        {avail.startTime} - {avail.endTime}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {avail.available ? (
                        <Badge className="bg-green-100 text-green-800">Disponible</Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">Indisponible</Badge>
                      )}
                      <Button variant="outline" size="sm">Modifier</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Revenus */}
        {activeTab === "earnings" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Taux d'Acceptation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.acceptanceRate}%</div>
                  <p className="text-xs text-muted-foreground mt-1">Demandes acceptées</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Revenus Moyens</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(stats.monthlyEarnings / 4).toFixed(2)}€
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Par semaine</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Historique des Revenus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-2 px-4">
                  {[45, 52, 48, 61, 55, 67, 72].map((value, idx) => (
                    <div
                      key={idx}
                      className="flex-1 bg-green-500 rounded-t-lg"
                      style={{ height: `${(value / 80) * 100}%` }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SitterDashboardComplete;

