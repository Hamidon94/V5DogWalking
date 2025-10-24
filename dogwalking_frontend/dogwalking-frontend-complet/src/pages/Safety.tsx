import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Shield, CheckCircle, AlertTriangle, Phone, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Safety = () => {
  const safetyFeatures = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Vérification d'identité",
      description: "Tous nos promeneur certifiés passent une vérification d'identité par un tiers de confiance avant de pouvoir accepter des réservations."
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Évaluations et avis",
      description: "Consultez les avis authentiques d'autres propriétaires d'animaux pour choisir le promeneur certifié idéal en toute confiance."
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Support 24h/24",
      description: "Notre équipe de support est disponible 24h/24 et 7j/7 pour vous aider, y compris en cas d'urgence vétérinaire."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Rencontres préalables",
      description: "Organisez une rencontre gratuite avec votre promeneur certifié avant la première réservation pour vous assurer du bon feeling."
    }
  ];

  const dogwalkingGuarantee = [
    {
      title: "Couverture vétérinaire",
      description: "Jusqu'à 25 000€ de remboursement pour les soins vétérinaires d'urgence pendant la garde",
      amount: "25 000€"
    },
    {
      title: "Assurance responsabilité",
      description: "Protection contre les dommages matériels causés par votre animal pendant la garde",
      amount: "Incluse"
    },
    {
      title: "Assistance d'urgence",
      description: "Accès à une ligne d'assistance vétérinaire 24h/24 pendant toute la durée de la garde",
      amount: "24h/24"
    }
  ];

  const safetyTips = [
    {
      category: "Avant la garde",
      tips: [
        "Organisez une rencontre préalable avec le promeneur certifié",
        "Partagez toutes les informations médicales importantes",
        "Laissez les coordonnées de votre vétérinaire",
        "Préparez une trousse de premiers secours"
      ]
    },
    {
      category: "Pendant la garde",
      tips: [
        "Restez en contact avec votre promeneur certifié",
        "Demandez des nouvelles et photos régulièrement",
        "Signalez tout comportement inhabituel",
        "Gardez votre téléphone à portée de main"
      ]
    },
    {
      category: "Après la garde",
      tips: [
        "Vérifiez l'état de votre animal",
        "Laissez un avis honnête sur le service",
        "Signalez tout problème à notre équipe",
        "Programmez un suivi vétérinaire si nécessaire"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-dogwalking-green/10 to-dogwalking-blue/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-dogwalking-green/10 rounded-full flex items-center justify-center">
                <Shield className="w-10 h-10 text-dogwalking-green" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                La sécurité avant tout
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Votre animal mérite les meilleurs soins. Découvrez toutes les mesures de sécurité 
                que nous mettons en place pour assurer sa protection et votre tranquillité d'esprit.
              </p>
            </div>
          </div>
        </section>

        {/* Safety Features */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Nos garanties de sécurité
              </h2>
              <p className="text-xl text-gray-600">
                Chaque réservation bénéficie de nos standards de sécurité les plus élevés
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {safetyFeatures.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-dogwalking-green/10 rounded-full flex items-center justify-center">
                    <div className="text-dogwalking-green">
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DogWalking Guarantee */}
        <section className="py-20 bg-dogwalking-gray-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                La DogWalking Guarantee
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Une protection complète pour chaque réservation. Parce que votre animal mérite ce qu'il y a de mieux.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {dogwalkingGuarantee.map((item, index) => (
                <div key={index} className="dogwalking-card p-8 text-center">
                  <div className="text-3xl font-bold text-dogwalking-green mb-4">
                    {item.amount}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button className="dogwalking-button-secondary">
                En savoir plus sur la DogWalking Guarantee
              </Button>
            </div>
          </div>
        </section>

        {/* Safety Tips */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Conseils de sécurité
              </h2>
              <p className="text-xl text-gray-600">
                Suivez ces recommandations pour une expérience optimale
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {safetyTips.map((section, index) => (
                <div key={index} className="dogwalking-card p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    {section.category}
                  </h3>
                  
                  <ul className="space-y-4">
                    {section.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-dogwalking-green flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-20 bg-dogwalking-gray-light">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              En cas d'urgence
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              Notre équipe d'urgence est disponible 24h/24 et 7j/7 pour vous aider 
              en cas de problème avec votre animal.
            </p>

            <div className="dogwalking-card p-8 max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Phone className="w-6 h-6 text-dogwalking-green" />
                <span className="text-2xl font-bold text-gray-900">
                  01 23 45 67 89
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-6">
                Ligne d'urgence disponible 24h/24
              </p>
              
              <Button className="dogwalking-button-primary w-full">
                Contacter le support d'urgence
              </Button>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Pour les urgences vitales, contactez directement votre vétérinaire ou les services d'urgence vétérinaire
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 dogwalking-bg-gradient">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Réservez en toute sécurité
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Trouvez le promeneur certifié parfait avec la garantie de nos standards de sécurité
            </p>
            
            <Button className="dogwalking-button-primary bg-white text-dogwalking-green hover:bg-gray-100 px-8 py-4 text-lg">
              Commencer ma recherche
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Safety;