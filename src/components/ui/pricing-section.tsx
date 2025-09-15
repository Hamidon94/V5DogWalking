import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export const PricingSection = () => {
  const plans = [
    {
      name: "Promenade Express",
      duration: "30 minutes",
      price: "15",
      description: "Parfait pour une sortie rapide",
      features: [
        "Promenade de 30 minutes",
        "Suivi GPS en temps réel",
        "Photos de la promenade",
        "Rapport de sortie",
        "Support client"
      ],
      popular: false,
      variant: "outline" as const
    },
    {
      name: "Promenade Standard",
      duration: "1 heure",
      price: "25",
      description: "Le choix le plus populaire",
      features: [
        "Promenade d'1 heure",
        "Suivi GPS en temps réel",
        "Photos et vidéos",
        "Rapport détaillé",
        "Jeux et socialisation",
        "Support prioritaire"
      ],
      popular: true,
      variant: "hero" as const
    },
    {
      name: "Promenade Premium",
      duration: "1h30",
      price: "35",
      description: "Pour les chiens les plus actifs",
      features: [
        "Promenade d'1h30",
        "Suivi GPS en temps réel",
        "Photos et vidéos HD",
        "Rapport complet",
        "Jeux et exercices",
        "Brossage inclus",
        "Support VIP 24/7"
      ],
      popular: false,
      variant: "ocean" as const
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`shadow-card hover:shadow-lg transition-all duration-300 border-0 relative ${
                plan.popular 
                  ? 'bg-gradient-to-b from-sage/5 to-ocean/5 ring-2 ring-sage/20 scale-105' 
                  : 'bg-gradient-card'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Le plus populaire
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-base mb-4">{plan.description}</CardDescription>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}€</span>
                  <span className="text-muted-foreground ml-1">/ {plan.duration}</span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-sage mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.variant} 
                  size="lg" 
                  className="w-full"
                  onClick={() => window.location.href = '/auth'}
                >
                  Choisir ce forfait
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
