import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export const PricingSection = () => {
  const services = [
    {
      name: "Promenade",
      duration: "30 min",
      price: "7",
      description: "Promenade classique pour votre chien",
      features: [
        "Promenade en laisse",
        "Exercice adapté",
        "Rapport de promenade",
        "Photos pendant la sortie"
      ],
      popular: true,
      variant: "hero" as const
    },
    {
      name: "Promenade",
      duration: "1 heure",
      price: "13",
      description: "Promenade longue durée",
      features: [
        "Promenade d'1 heure",
        "Exercice et jeux",
        "Rapport détaillé",
        "Photos et vidéos"
      ],
      popular: false,
      variant: "outline" as const
    },
    {
      name: "Visite simple",
      duration: "30 min",
      price: "19",
      description: "Visite à domicile pour compagnie",
      features: [
        "Compagnie pour votre animal",
        "Vérification eau et nourriture",
        "Jeux et câlins",
        "Rapport de visite"
      ],
      popular: false,
      variant: "outline" as const
    },
    {
      name: "Visite sanitaire",
      duration: "30 min",
      price: "35",
      description: "Soins d'hygiène et entretien",
      features: [
        "Brossage et entretien",
        "Nettoyage yeux et oreilles",
        "Vérification des pattes",
        "Soins d'hygiène de base"
      ],
      popular: false,
      variant: "outline" as const
    },
    {
      name: "Garde à domicile",
      duration: "24h",
      price: "31",
      description: "Garde de nuit à votre domicile",
      features: [
        "Présence toute la nuit",
        "Maintien des habitudes",
        "Sécurité de votre domicile",
        "Soins et attention continue"
      ],
      popular: false,
      variant: "ocean" as const
    },
    {
      name: "Pension canine",
      duration: "24h",
      price: "26",
      description: "Hébergement chez le promeneur",
      features: [
        "Hébergement familial",
        "Socialisation avec autres chiens",
        "Activités et promenades",
        "Environnement sécurisé"
      ],
      popular: false,
      variant: "outline" as const
    },
    {
      name: "Accompagnement vétérinaire",
      duration: "Service complet",
      price: "35",
      description: "Transport et accompagnement chez le vétérinaire",
      features: [
        "Récupération à domicile",
        "Transport sécurisé",
        "Accompagnement chez le vétérinaire",
        "Retour à domicile"
      ],
      popular: false,
      variant: "outline" as const
    }
  ];

  return (
    <section id="tarifs" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nos{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              tarifs
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des prix transparents et abordables pour le bien-être de votre compagnon
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`shadow-card hover:shadow-lg transition-all duration-300 border-0 relative ${
                service.popular 
                  ? 'bg-gradient-to-b from-sage/5 to-ocean/5 ring-2 ring-sage/20 scale-105' 
                  : 'bg-gradient-card'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Le plus populaire
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl mb-2">{service.name}</CardTitle>
                <CardDescription className="text-base mb-4">{service.description}</CardDescription>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{service.price}€</span>
                  <span className="text-muted-foreground ml-1">/ {service.duration}</span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-sage mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={service.variant} 
                  size="lg" 
                  className="w-full"
                  onClick={() => window.location.href = '/services'}
                >
                  Réserver ce service
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Tous nos tarifs incluent l'assurance responsabilité civile
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sage rounded-full"></div>
              <span>Annulation gratuite 2h avant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-ocean rounded-full"></div>
              <span>Paiement sécurisé</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sage rounded-full"></div>
              <span>Satisfaction garantie</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
