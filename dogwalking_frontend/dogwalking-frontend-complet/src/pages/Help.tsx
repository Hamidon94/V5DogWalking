import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  HelpCircle, 
  Users, 
  CreditCard, 
  Shield, 
  Heart,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Phone,
  Mail
} from "lucide-react";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const categories = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Commencer",
      description: "Créer un compte, première réservation",
      articles: 12
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Réservations",
      description: "Gérer vos réservations et communications",
      articles: 18
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Paiements",
      description: "Tarifs, remboursements, facturation",
      articles: 8
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Sécurité",
      description: "DogWalking Guarantee et sécurité",
      articles: 15
    }
  ];

  const faqs = [
    {
      question: "Comment choisir le bon promeneur certifié ?",
      answer: "Consultez les profils détaillés, lisez les avis d'autres propriétaires, vérifiez les certifications et organisez une rencontre gratuite avant de réserver."
    },
    {
      question: "Que couvre la DogWalking Guarantee ?",
      answer: "La DogWalking Guarantee inclut jusqu'à 25 000€ de couverture pour les soins vétérinaires d'urgence, une assurance responsabilité et un support 24h/24."
    },
    {
      question: "Comment annuler une réservation ?",
      answer: "Vous pouvez annuler dans votre tableau de bord jusqu'à 24h avant le début de la garde. Les conditions d'annulation varient selon le délai."
    },
    {
      question: "Que faire si mon promeneur certifié ne répond pas ?",
      answer: "Contactez notre équipe de support qui interviendra pour résoudre le problème et vous aider à trouver une solution alternative si nécessaire."
    },
    {
      question: "Comment sont vérifiés les promeneur certifiés ?",
      answer: "Tous nos promeneur certifiés passent une vérification d'identité par un tiers, nous vérifions leurs références et ils doivent maintenir d'excellentes évaluations."
    },
    {
      question: "Puis-je modifier ma réservation après confirmation ?",
      answer: "Les modifications dépendent de la disponibilité du promeneur certifié. Contactez-le directement via notre messagerie pour discuter des changements."
    }
  ];

  const contactOptions = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Chat en direct",
      description: "Réponse immédiate pendant nos heures d'ouverture",
      action: "Démarrer le chat",
      available: true
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Téléphone",
      description: "Support téléphonique 7j/7",
      action: "01 23 45 67 89",
      available: true
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      description: "Réponse sous 24h",
      action: "support@dogwalking.fr",
      available: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-dogwalking-green/10 to-dogwalking-blue/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-dogwalking-green/10 rounded-full flex items-center justify-center">
              <HelpCircle className="w-10 h-10 text-dogwalking-green" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Centre d'aide DogWalking
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Comment pouvons-nous vous aider aujourd'hui ?
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Rechercher dans l'aide..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="dogwalking-input pl-12 py-4 text-lg"
              />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Explorez par catégorie
              </h2>
              <p className="text-lg text-gray-600">
                Trouvez rapidement les réponses dont vous avez besoin
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <div key={index} className="dogwalking-card p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="w-12 h-12 mx-auto mb-4 bg-dogwalking-green/10 rounded-full flex items-center justify-center">
                    <div className="text-dogwalking-green">
                      {category.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>

                  <span className="text-dogwalking-green text-sm font-medium">
                    {category.articles} articles
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-dogwalking-gray-light">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Questions fréquentes
              </h2>
              <p className="text-lg text-gray-600">
                Les réponses aux questions les plus posées par notre communauté
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="dogwalking-card">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    {expandedFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  
                  {expandedFAQ === index && (
                    <div className="px-6 pb-6 border-t border-gray-200">
                      <p className="text-gray-600 pt-4 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Besoin d'aide supplémentaire ?
              </h2>
              <p className="text-lg text-gray-600">
                Notre équipe de support est là pour vous aider
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactOptions.map((option, index) => (
                <div key={index} className="dogwalking-card p-8 text-center">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
                    option.available ? 'bg-dogwalking-green/10' : 'bg-gray-100'
                  }`}>
                    <div className={option.available ? 'text-dogwalking-green' : 'text-gray-400'}>
                      {option.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {option.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {option.description}
                  </p>

                  <Button 
                    className={`w-full ${
                      option.available 
                        ? 'dogwalking-button-secondary' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!option.available}
                  >
                    {option.action}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="py-20 bg-dogwalking-gray-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Articles populaires
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                "Comment préparer la première garde de mon animal ?",
                "Que faire en cas d'urgence vétérinaire ?",
                "Comment devenir un promeneur certifié sur DogWalking ?",
                "Comprendre les tarifs et les paiements",
                "Conseils pour une rencontre réussie",
                "Gérer les communications avec votre promeneur certifié"
              ].map((title, index) => (
                <div key={index} className="dogwalking-card p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <h3 className="font-medium text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500">Article d'aide</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Help;