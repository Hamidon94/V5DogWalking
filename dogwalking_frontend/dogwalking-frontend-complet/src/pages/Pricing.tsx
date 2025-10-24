import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  const services = [
    {
      title: "Promenade",
      duration: "30 min",
      price: "7 €",
      description: "Promenade de base pour votre chien",
      features: ["Promenade dans le quartier", "Photos incluses", "Rapport de promenade"]
    },
    {
      title: "Promenade",
      duration: "1h",
      price: "13 €",
      description: "Promenade longue pour plus d'exercice",
      features: ["Promenade étendue", "Photos incluses", "Rapport détaillé", "Possibilité d'ajouter des tranches de 30 min"]
    },
    {
      title: "Visite simple",
      duration: "30 min",
      price: "19 €",
      description: "Visite à domicile pour votre animal",
      features: ["Visite à domicile", "Compagnie pour votre animal", "Soins de base", "Rapport de visite"]
    },
    {
      title: "Visite sanitaire / entretien",
      duration: "30 min",
      price: "35 €",
      description: "Visite avec soins spécialisés",
      features: ["Soins sanitaires", "Entretien spécialisé", "Suivi médical", "Rapport détaillé"]
    },
    {
      title: "Garde à domicile",
      duration: "nuitée / 24h",
      price: "31 €",
      description: "Garde complète à votre domicile",
      features: ["Garde 24h/24", "À votre domicile", "Surveillance de la maison", "Routine préservée"]
    },
    {
      title: "Pension canine",
      duration: "24h",
      price: "26 €",
      description: "Hébergement chez le promeneur",
      features: ["Hébergement familial", "Attention 24h/24", "Environnement sécurisé", "Mises à jour quotidiennes"]
    },
    {
      title: "Accompagnement vétérinaire",
      duration: "service complet",
      price: "35 €",
      description: "Transport chez le vétérinaire",
      features: ["Transport aller-retour", "Accompagnement chez le vétérinaire", "Suivi médical", "Rapport de visite"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tarification <span className="text-dogwalking-blue">DogWalking</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tarification définie et choisie par le propriétaire. Tous nos services sont proposés par tranches de 30 minutes (sauf pension/garde).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.duration}</p>
                  <div className="text-4xl font-bold text-dogwalking-blue mb-2">{service.price}</div>
                  <p className="text-gray-600">{service.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-dogwalking-green mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className="w-full bg-dogwalking-blue hover:bg-dogwalking-blue/90 text-white">
                  Réserver
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-dogwalking-blue/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Possibilité d'ajouter des tranches supplémentaires
              </h2>
              <p className="text-gray-600 mb-6">
                Pour les promenades, vous pouvez ajouter des tranches de 30 minutes supplémentaires selon vos besoins.
              </p>
              <Button className="bg-dogwalking-green hover:bg-dogwalking-green/90 text-white">
                Personnaliser votre service
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
