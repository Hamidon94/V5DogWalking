import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  MapPin, 
  Calendar, 
  Clock, 
  Heart, 
  Share2, 
  MessageCircle, 
  Shield, 
  Camera, 
  PawPrint,
  Home,
  Zap
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const SitterProfile = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock data - En production, récupérer depuis l'API
  const sitter = {
    id: id || "1",
    name: "Marie Dubois",
    photo: "/placeholder.svg",
    rating: 4.9,
    reviewCount: 127,
    location: "Paris 11ème",
    joinDate: "2022",
    responseTime: "< 1 heure",
    verified: true,
    dogwalking_approved: true,
    services: [
      { name: "Promenade de chien", price: "25€", duration: "30 min" },
      { name: "Garde à domicile", price: "45€", duration: "nuit" },
      { name: "Visite à domicile", price: "20€", duration: "visite" }
    ],
    availability: ["Lun", "Mar", "Mer", "Jeu", "Ven"],
    about: "Passionnée d'animaux depuis toujours, j'ai grandi entourée de chiens et de chats. Je propose des services de garde avec beaucoup d'amour et d'attention. Votre compagnon sera traité comme un membre de ma famille ! J'habite dans un appartement spacieux avec un balcon, parfait pour les petites pauses. Je suis très flexible sur les horaires et disponible pour des services d'urgence.",
    experience: "5 ans d'expérience",
    pets_owned: ["Chien", "Chat"],
    languages: ["Français", "Anglais"],
    background_check: true
  };

  const reviews = [
    {
      id: 1,
      author: "Sophie L.",
      rating: 5,
      date: "Il y a 2 semaines",
      comment: "Marie est fantastique ! Max a adoré ses promenades et je la recommande vivement. Très professionnelle et attentionnée.",
      petName: "Max"
    },
    {
      id: 2,
      author: "Pierre M.",
      rating: 5,
      date: "Il y a 1 mois",
      comment: "Excellente communication et Luna était très heureuse après sa garde. Marie envoie des photos régulièrement, c'est rassurant !",
      petName: "Luna"
    },
    {
      id: 3,
      author: "Julie D.",
      rating: 4,
      date: "Il y a 2 mois",
      comment: "Très bonne expérience, Milo s'est bien amusé. Marie est ponctuelle et fiable.",
      petName: "Milo"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Accueil</Link>
          <span>/</span>
          <Link to="/search" className="hover:text-foreground">Recherche</Link>
          <span>/</span>
          <span className="text-foreground">{sitter.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={sitter.photo} alt={sitter.name} />
                      <AvatarFallback className="text-2xl">{sitter.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {sitter.verified && (
                      <div className="absolute -bottom-2 -right-2 bg-dogwalking-green text-white rounded-full p-2">
                        <Shield className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">{sitter.name}</h1>
                        <div className="flex items-center gap-4 text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{sitter.rating}</span>
                            <span>({sitter.reviewCount} avis)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{sitter.location}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {sitter.dogwalking_approved && (
                            <Badge variant="default" className="bg-dogwalking-green">
                              <Zap className="w-3 h-3 mr-1" />
                              DogWalking Approuvé
                            </Badge>
                          )}
                          <Badge variant="secondary">
                            <Clock className="w-3 h-3 mr-1" />
                            Répond en {sitter.responseTime}
                          </Badge>
                          <Badge variant="secondary">
                            Membre depuis {sitter.joinDate}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4 md:mt-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsFavorite(!isFavorite)}
                        >
                          <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                          Favoris
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4 mr-2" />
                          Partager
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="about" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">À propos</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="reviews">Avis</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>À propos de {sitter.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{sitter.about}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      <div>
                        <h4 className="font-medium mb-2">Expérience</h4>
                        <p className="text-muted-foreground">{sitter.experience}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Animaux possédés</h4>
                        <div className="flex gap-2">
                          {sitter.pets_owned.map((pet) => (
                            <Badge key={pet} variant="secondary">{pet}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Langues parlées</h4>
                        <div className="flex gap-2">
                          {sitter.languages.map((lang) => (
                            <Badge key={lang} variant="secondary">{lang}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Vérifications</h4>
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-dogwalking-green" />
                          <span className="text-sm text-muted-foreground">Vérification des antécédents</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="services" className="space-y-6">
                <div className="grid gap-4">
                  {sitter.services.map((service, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium text-lg">{service.name}</h3>
                            <p className="text-muted-foreground">{service.duration}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-dogwalking-green">{service.price}</p>
                            <Button size="sm" className="mt-2">Réserver</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Avis des propriétaires</CardTitle>
                    <CardDescription>
                      {sitter.reviewCount} avis • Note moyenne: {sitter.rating}/5
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b last:border-b-0 pb-6 last:pb-0">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium">{review.author}</span>
                              <div className="flex">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                            <p className="text-muted-foreground mb-2">{review.comment}</p>
                            <Badge variant="outline" className="text-xs">
                              <PawPrint className="w-3 h-3 mr-1" />
                              {review.petName}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card>
              <CardHeader>
                <CardTitle>Réserver avec {sitter.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" size="lg">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Envoyer un message
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <Calendar className="w-4 h-4 mr-2" />
                  Voir les disponibilités
                </Button>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle>Disponibilités</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
                    <Badge 
                      key={day} 
                      variant={sitter.availability.includes(day) ? "default" : "secondary"}
                      className={sitter.availability.includes(day) ? "bg-dogwalking-green" : ""}
                    >
                      {day}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Généralement disponible en semaine
                </p>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle>Localisation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{sitter.location}</span>
                </div>
                <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">Carte à venir</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SitterProfile;