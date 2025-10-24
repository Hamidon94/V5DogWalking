import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchForm from "@/components/search/SearchForm";
import { Link } from "react-router-dom";
import { Home, Clock, Shield, Heart, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import dogBoardingImage from "@/assets/dog-boarding.jpg";

const Boarding = () => {
  const benefits = [
    {
      icon: <Home className="w-6 h-6" />,
      title: "Un foyer chaleureux pour votre animal",
      description: "Votre animal sera hébergé dans une maison familiale chaleureuse, pas dans un chenil froid. Il recevra l'attention personnalisée qu'il mérite."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Des promeneur certifiés passionnés",
      description: "Nos promeneur certifiés adorent les animaux et les traitent comme les leurs. Votre compagnon sera entre de bonnes mains aimantes."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Sécurité et tranquillité d'esprit",
      description: "Tous nos promeneur certifiés sont vérifiés et couverts par la DogWalking Guarantee jusqu'à 25 000 € en soins vétérinaires."
    }
  ];

  const features = [
    "Hébergement dans un foyer familial",
    "Attention personnalisée 24h/24",
    "Promenades et temps de jeu réguliers",
    "Mises à jour quotidiennes avec photos",
    "Respect de la routine de votre animal",
    "Environnement sûr et sécurisé"
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Content */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Hébergement
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  Votre animal reste dans le foyer chaleureux de votre promeneur certifié. Il sera traité comme un membre de la famille dans un environnement confortable.
                </p>

                {/* Service Navigation */}
                <div className="mb-8">
                  <p className="text-sm font-medium text-gray-700 mb-4">
                    Découvrez d'autres services :
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-dogwalking-green text-white rounded-full text-sm">
                      Hébergement • chez le promeneur certifié
                    </span>
                    <Link to="/services/house-sitting" className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition-colors">
                      Garde à domicile • chez vous
                    </Link>
                    <Link to="/services/drop-in-visits" className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition-colors">
                      Visites à domicile • visites à votre domicile
                    </Link>
                    <Link to="/services/doggy-daycare" className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition-colors">
                      Garderie pour chien • chez le promeneur certifié
                    </Link>
                    <Link to="/services/dog-walking" className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition-colors">
                      Promenade de chien • dans votre quartier
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right side - Search Form */}
              <div>
                <SearchForm compact />
              </div>
            </div>
          </div>
        </section>

        {/* Trustpilot Banner */}
        <section className="py-8 bg-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-green-500 text-green-500" />
                ))}
              </div>
              <span className="text-gray-700">Plus de 24 000 avis sur</span>
              <span className="font-bold text-green-600">Trustpilot</span>
            </div>
          </div>
        </section>

        {/* Main Content Image */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <img 
              src={dogBoardingImage} 
              alt="Hébergement de chien" 
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Pourquoi choisir l'hébergement DogWalking ?
              </h2>
              <p className="text-xl text-gray-600">
                Une alternative chaleureuse et personnalisée aux chenils traditionnels
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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

            {/* Features Grid */}
            <div className="dogwalking-card p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Ce qui est inclus dans l'hébergement
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-dogwalking-green rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-dogwalking-gray-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Comment ça marche
              </h2>
              <p className="text-xl text-gray-600">
                Réservez un hébergement en toute simplicité
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Recherchez",
                  description: "Trouvez des promeneur certifiés près de chez vous et consultez leurs profils détaillés."
                },
                {
                  step: "2", 
                  title: "Rencontrez",
                  description: "Organisez une rencontre gratuite pour vous assurer que c'est le bon match."
                },
                {
                  step: "3",
                  title: "Réservez",
                  description: "Confirmez votre réservation et préparez votre animal pour son séjour."
                },
                {
                  step: "4",
                  title: "Détendez-vous",
                  description: "Recevez des mises à jour régulières et des photos de votre animal."
                }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-dogwalking-blue rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {step.step}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/search?serviceType=boarding">
                <Button className="dogwalking-button-secondary px-8 py-4 text-lg">
                  Trouver un hébergement
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Tarifs transparents
              </h2>
              <p className="text-xl text-gray-600">
                Pas de frais cachés, payez seulement pour le service choisi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="dogwalking-card p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Hébergement Standard</h3>
                <div className="text-3xl font-bold text-dogwalking-green mb-2">25-40€</div>
                <p className="text-gray-600 mb-4">par nuit</p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>Hébergement chez le promeneur certifié</li>
                  <li>Promenades quotidiennes</li>
                  <li>Mises à jour avec photos</li>
                </ul>
              </div>

              <div className="dogwalking-card p-6 text-center border-2 border-dogwalking-green relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-dogwalking-green text-white px-4 py-1 rounded-full text-sm">
                  Populaire
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Hébergement Premium</h3>
                <div className="text-3xl font-bold text-dogwalking-green mb-2">40-60€</div>
                <p className="text-gray-600 mb-4">par nuit</p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>Tout du standard +</li>
                  <li>Attention extra personnalisée</li>
                  <li>Jardin privé disponible</li>
                  <li>Mises à jour 2x par jour</li>
                </ul>
              </div>

              <div className="dogwalking-card p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Hébergement Luxe</h3>
                <div className="text-3xl font-bold text-dogwalking-green mb-2">60€+</div>
                <p className="text-gray-600 mb-4">par nuit</p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>Service 5 étoiles</li>
                  <li>Promeneur certifié expérimenté</li>
                  <li>Services supplémentaires</li>
                  <li>Disponible 24h/24</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 dogwalking-bg-gradient">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Offrez à votre animal des vacances qu'il mérite
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Trouvez l'hébergement parfait près de chez vous
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/search?serviceType=boarding">
                <Button className="dogwalking-button-primary bg-white text-dogwalking-green hover:bg-gray-100 px-8 py-4 text-lg">
                  Réserver maintenant
                </Button>
              </Link>
              <Link to="/become-sitter">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-dogwalking-green px-8 py-4 text-lg">
                  Devenir promeneur certifié
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Boarding;