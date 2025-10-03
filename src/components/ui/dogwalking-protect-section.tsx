import { Shield, Heart, Clock, CheckCircle, Users, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const DogWalkingProtectSection = () => {
  const protections = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Promeneurs Vérifiés",
      description: "Tous nos promeneurs sont vérifiés avec pièce d'identité et casier judiciaire vierge B2"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Assurance Complète",
      description: "Couverture d'assurance responsabilité civile professionnelle pour tous nos services"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Suivi en Temps Réel",
      description: "Suivez la promenade de votre chien en direct avec notre système GPS intégré"
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Paiement Sécurisé",
      description: "Transactions sécurisées avec Stripe et factures automatiques"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Support 7j/7",
      description: "Notre équipe est disponible 7 jours sur 7 pour vous accompagner"
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Satisfaction Garantie",
      description: "Remboursement intégral si vous n'êtes pas satisfait de nos services"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Shield className="h-4 w-4" />
            DogWalkingProtect
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Votre Tranquillité d'Esprit,{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Notre Priorité
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Avec DogWalkingProtect, profitez d'un service premium avec toutes les garanties 
            de sécurité et de qualité pour votre compagnon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {protections.map((protection, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {protection.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {protection.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {protection.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-primary/10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Pourquoi Choisir DogWalkingProtect ?
            </h3>
            <p className="text-gray-600 mb-6">
              Notre programme de protection va au-delà des services classiques. Nous nous engageons 
              à offrir une expérience premium avec des garanties uniques sur le marché.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-gray-600">Promeneurs vérifiés</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-gray-600">Support disponible</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">5★</div>
                <div className="text-sm text-gray-600">Note moyenne</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
