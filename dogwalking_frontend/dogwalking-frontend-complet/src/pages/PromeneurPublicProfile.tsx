import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, DollarSign, Heart, MessageSquare, Calendar } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  petName: string;
}

const PromeneurPublicProfile = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const promeneurInfo = {
    name: "Marie Dubois",
    avatar: "👩‍🦰",
    location: "Paris 11ème",
    rating: 4.9,
    reviewCount: 87,
    completedServices: 142,
    responseTime: "< 1 heure",
    pricePerHour: 25,
    bio: "Passionnée par les animaux depuis l'enfance, j'offre des services de promenade et d'hébergement de qualité. Je traite chaque animal comme le mien !",
    experience: "5 ans d'expérience",
    languages: ["Français", "Anglais"],
    services: ["Promenade", "Hébergement", "Visite", "Garderie"],
    availability: "Disponible 7j/7",
    verified: true,
    background_checked: true,
  };

  const [reviews] = useState<Review[]>([
    {
      id: "REV001",
      author: "Jean Dupont",
      rating: 5,
      comment: "Marie est fantastique ! Max l'adore et elle envoie des photos régulièrement.",
      date: "Il y a 2 semaines",
      petName: "Max",
    },
    {
      id: "REV002",
      author: "Sophie Martin",
      rating: 5,
      comment: "Très professionnelle et attentionnée. Luna a passé un excellent séjour chez elle.",
      date: "Il y a 1 mois",
      petName: "Luna",
    },
    {
      id: "REV003",
      author: "Pierre Durand",
      rating: 4,
      comment: "Bon service, très réactif aux messages. Bella était heureuse.",
      date: "Il y a 1 mois",
      petName: "Bella",
    },
  ]);

  const stats = [
    { label: "Avis", value: promeneurInfo.reviewCount, icon: "⭐" },
    { label: "Services", value: promeneurInfo.completedServices, icon: "✓" },
    { label: "Taux", value: "92%", icon: "📈" },
    { label: "Réponse", value: promeneurInfo.responseTime, icon: "⏱️" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* En-tête du profil */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-6">
                <div className="text-7xl">{promeneurInfo.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{promeneurInfo.name}</h1>
                    {promeneurInfo.verified && (
                      <Badge className="bg-blue-100 text-blue-800">✓ Vérifié</Badge>
                    )}
                    {promeneurInfo.background_checked && (
                      <Badge className="bg-green-100 text-green-800">
                        ✓ Casier B2 OK
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.round(promeneurInfo.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 font-semibold">
                        {promeneurInfo.rating}/5 ({promeneurInfo.reviewCount} avis)
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {promeneurInfo.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {promeneurInfo.availability}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      À partir de {promeneurInfo.pricePerHour}€/h
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </Button>
                <Button size="lg">
                  <Calendar className="w-5 h-5 mr-2" />
                  Réserver
                </Button>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-muted p-4 rounded-lg mb-6">
              <p className="text-sm">{promeneurInfo.bio}</p>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Détails */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* À propos */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>À Propos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Expérience</h3>
                <p className="text-sm text-muted-foreground">{promeneurInfo.experience}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Services Proposés</h3>
                <div className="flex flex-wrap gap-2">
                  {promeneurInfo.services.map((service, idx) => (
                    <Badge key={idx} variant="secondary">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Langues</h3>
                <div className="flex flex-wrap gap-2">
                  {promeneurInfo.languages.map((lang, idx) => (
                    <Badge key={idx}>{lang}</Badge>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-700">
                  <strong>✓ Vérification Complète :</strong> Identité vérifiée, casier judiciaire B2 approuvé, et avis authentifiés.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tarifs */}
          <Card>
            <CardHeader>
              <CardTitle>Tarifs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { service: "Promenade (30 min)", price: "15€" },
                { service: "Promenade (45 min)", price: "25€" },
                { service: "Promenade (1h)", price: "30€" },
                { service: "Hébergement (jour)", price: "50€" },
                { service: "Visite (15 min)", price: "10€" },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>{item.service}</span>
                  <span className="font-semibold">{item.price}</span>
                </div>
              ))}
              <Button className="w-full mt-4">Voir tous les tarifs</Button>
            </CardContent>
          </Card>
        </div>

        {/* Avis */}
        <Card>
          <CardHeader>
            <CardTitle>Avis des Propriétaires</CardTitle>
            <CardDescription>{reviews.length} avis vérifiés</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold">{review.author}</p>
                    <p className="text-xs text-muted-foreground">
                      Pour {review.petName} • {review.date}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm">{review.comment}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <Button size="lg" className="flex-1">
            <Calendar className="w-5 h-5 mr-2" />
            Réserver Maintenant
          </Button>
          <Button size="lg" variant="outline" className="flex-1">
            <MessageSquare className="w-5 h-5 mr-2" />
            Envoyer un Message
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PromeneurPublicProfile;

