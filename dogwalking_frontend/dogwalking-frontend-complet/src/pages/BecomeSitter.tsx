import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Shield, Euro, Star, Users, Heart, Calendar } from "lucide-react";
import dogBoardingImage from "@/assets/dog-boarding.jpg";

const BecomeSitter = () => {
  const benefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Flexibilité totale",
      description: "Fixez vos propres horaires et tarifs. Proposez n'importe quelle combinaison de services de garde d'animaux."
    },
    {
      icon: <Euro className="w-6 h-6" />,
      title: "Revenus supplémentaires",
      description: "Gagnez de l'argent en faisant ce que vous aimez. Les promeneur certifiés gagnent en moyenne 500€ par mois."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Protection complète",
      description: "Bénéficiez de la DogWalking Guarantee avec une couverture jusqu'à 25 000€ pour les soins vétérinaires."
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Créez votre profil",
      description: "Nous vous guidons dans la création d'un profil qui met en valeur les informations importantes pour les propriétaires d'animaux.",
      details: [
        "Photos de qualité",
        "Description personnalisée",
        "Vérification d'identité",
        "Tarifs et disponibilités"
      ]
    },
    {
      number: "2",
      title: "Acceptez les demandes",
      description: "Indiquez-nous les types d'animaux dont vous voulez vous occuper et les dates qui vous conviennent. Vous gérez votre propre emploi du temps.",
      details: [
        "Choisissez vos clients",
        "Fixez vos conditions", 
        "Rencontres gratuites",
        "Communication sécurisée"
      ]
    },
    {
      number: "3",
      title: "Soyez payé",
      description: "Les paiements sont prêts à être retirés deux jours après avoir terminé un service.",
      details: [
        "Paiement sécurisé",
        "Virement automatique",
        "Pas de frais cachés",
        "Support 24h/24"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Cari C.",
      location: "Plano TX",
      text: "C'est facile. Je vais au calendrier et je me marque comme disponible quand je veux l'être.",
      service: "Garde à domicile"
    },
    {
      name: "Carol U.", 
      location: "Atlanta GA",
      text: "Grâce à l'app DogWalking, je suis informée immédiatement des demandes et je réponds rapidement !",
      service: "Hébergement"
    }
  ];

  const services = [
    {
      name: "Hébergement",
      description: "Les animaux dorment chez vous",
      price: "25-50€/nuit",
      icon: <Heart className="w-5 h-5" />
    },
    {
      name: "Garde à domicile", 
      description: "Vous gardez chez le propriétaire",
      price: "40-70€/nuit",
      icon: <Calendar className="w-5 h-5" />
    },
    {
      name: "Promenade de chien",
      description: "Promenades dans le quartier", 
      price: "15-25€/promenade",
      icon: <Users className="w-5 h-5" />
    },
    {
      name: "Visites à domicile",
      description: "Visites courtes chez le propriétaire",
      price: "15-20€/visite", 
      icon: <Clock className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-dogwalking-green/10 to-dogwalking-blue/10">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: `url(${dogBoardingImage})` }}
          ></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Gagnez de l'argent en gardant
                <br />
                <span className="dogwalking-text-green">des animaux</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Transformez votre amour des animaux en revenus supplémentaires. 
                Rejoignez des milliers de promeneur certifiés qui gagnent leur vie sur DogWalking.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup?type=sitter">
                  <Button className="dogwalking-button-secondary px-8 py-4 text-lg">
                    Commencer maintenant
                  </Button>
                </Link>
                <Button variant="outline" className="px-8 py-4 text-lg">
                  En savoir plus
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <div className="text-center">
                  <div className="text-3xl font-bold text-dogwalking-green mb-2">500€+</div>
                  <div className="text-gray-600">revenus moyens/mois</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-dogwalking-green mb-2">97%</div>
                  <div className="text-gray-600">d'avis 5 étoiles</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-dogwalking-green mb-2">24h/24</div>
                  <div className="text-gray-600">support inclus</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Pourquoi devenir promeneur certifié sur DogWalking ?
              </h2>
              <p className="text-xl text-gray-600">
                La flexibilité vous donne le contrôle
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-dogwalking-green/10 rounded-full flex items-center justify-center">
                    <div className="text-dogwalking-green">
                      {benefit.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-dogwalking-gray-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="dogwalking-card p-8">
                  <div className="flex space-x-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-lg text-gray-700 mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                    <div className="text-sm text-dogwalking-green">{testimonial.service}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Comment ça marche
              </h2>
              <p className="text-xl text-gray-600">
                Commencez à gagner en 3 étapes simples
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Step Number */}
                  <div className="w-16 h-16 mx-auto mb-6 bg-dogwalking-blue rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {step.description}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="dogwalking-card p-4">
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-dogwalking-green flex-shrink-0" />
                          <span className="text-sm text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200 transform -translate-x-8" />
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/signup?type=sitter">
                <Button className="dogwalking-button-secondary px-8 py-4 text-lg">
                  Commencer maintenant
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services & Pricing */}
        <section className="py-20 bg-dogwalking-gray-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Services que vous pouvez proposer
              </h2>
              <p className="text-xl text-gray-600">
                Choisissez les services qui vous conviennent
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <div key={index} className="dogwalking-card p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-dogwalking-green/10 rounded-full flex items-center justify-center">
                    <div className="text-dogwalking-green">
                      {service.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    {service.description}
                  </p>
                  
                  <div className="text-lg font-bold text-dogwalking-green">
                    {service.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Les outils pour réussir
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-dogwalking-blue/10 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-dogwalking-blue" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  La DogWalking Guarantee
                </h3>
                <p className="text-gray-600">
                  Inclut jusqu'à 25 000€ de remboursement pour les soins vétérinaires.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-dogwalking-blue/10 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-dogwalking-blue" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Application DogWalking
                </h3>
                <p className="text-gray-600">
                  Gérez votre emploi du temps de promeneur certifié et plus encore avec l'app DogWalking.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-dogwalking-blue/10 rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8 text-dogwalking-blue" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Support 24h/24
                </h3>
                <p className="text-gray-600">
                  Support 24h/24 et 7j/7, y compris l'assistance vétérinaire.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 dogwalking-bg-gradient">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Prêt à commencer votre aventure ?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Rejoignez des milliers de promeneur certifiés qui gagnent leur vie en faisant ce qu'ils aiment
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup?type=sitter">
                <Button className="dogwalking-button-primary bg-white text-dogwalking-green hover:bg-gray-100 px-8 py-4 text-lg">
                  Devenir promeneur certifié
                </Button>
              </Link>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-dogwalking-green px-8 py-4 text-lg">
                Télécharger l'app
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BecomeSitter;