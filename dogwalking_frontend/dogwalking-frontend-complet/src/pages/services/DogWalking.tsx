import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchForm from "@/components/search/SearchForm";
import { Link } from "react-router-dom";
import { MapPin, Clock, Shield, Heart, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import dogWalkingImage from "@/assets/dog-walking.jpg";

const DogWalking = () => {
  const benefits = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Des promeneurs de confiance pour votre chien",
      description: "Les profils des promeneurs de chien ont été examinés et approuvés individuellement par DogWalking et 97 % des réservations ont reçu une évaluation 5 étoiles."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Une première rencontre en toute simplicité",
      description: "Rencontrez le dog sitter idéal pour votre chien avant de réserver. Programmez gratuitement une première rencontre en personne, directement à partir de votre boîte de réception DogWalking."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Simple à programmer",
      description: "Pour respecter la routine de votre chien, choisissez les horaires et les jours de la semaine pendant lesquels il a besoin d'une promenade."
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Trouvez le promeneur idéal",
      description: "Parcourez les profils des promeneurs de chien près de chez vous et lisez les avis d'autres propriétaires."
    },
    {
      step: "2",
      title: "Réservez et rencontrez-vous",
      description: "Organisez une rencontre gratuite pour vous assurer que c'est le bon match pour votre chien."
    },
    {
      step: "3",
      title: "Profitez de la tranquillité d'esprit",
      description: "Recevez des mises à jour et des photos pendant la promenade de votre chien."
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
            style={{ backgroundImage: `url(${dogWalkingImage})` }}
          ></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Content */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Promenade de chien
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  Des soins personnalisés pour votre animal, une tranquilité d'esprit pour vous
                </p>

                {/* Service Navigation */}
                <div className="mb-8">
                  <p className="text-sm font-medium text-gray-700 mb-4">
                    Découvrez d'autres services :
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link to="/services/boarding" className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition-colors">
                      Hébergement • chez le promeneur certifié
                    </Link>
                    <Link to="/services/house-sitting" className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition-colors">
                      Garde à domicile • chez vous
                    </Link>
                    <Link to="/services/drop-in-visits" className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition-colors">
                      Visites à domicile • visites à votre domicile
                    </Link>
                    <Link to="/services/doggy-daycare" className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition-colors">
                      Garderie pour chien • chez le promeneur certifié
                    </Link>
                    <span className="px-4 py-2 bg-dogwalking-green text-white rounded-full text-sm">
                      Promenade de chien • dans votre quartier
                    </span>
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
              src={dogWalkingImage} 
              alt="Promenade de chien" 
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Enfin une solution de promenade de chien qui plaît aux toutous
              </h2>
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

        {/* How It Works Section */}
        <section className="py-20 bg-dogwalking-gray-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Comment ça marche
              </h2>
              <p className="text-xl text-gray-600">
                Réservez une promenade de chien en quelques clics
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorks.map((step, index) => (
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
              <Link to="/search?serviceType=dog-walking">
                <Button className="dogwalking-button-secondary px-8 py-4 text-lg">
                  Trouver un promeneur maintenant
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Questions fréquentes
              </h2>
            </div>

            <div className="space-y-8">
              <div className="dogwalking-card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Combien coûte une promenade de chien ?
                </h3>
                <p className="text-gray-600">
                  Les prix varient selon votre localisation et le promeneur choisi, mais la plupart des promenades coûtent entre 15€ et 25€ pour une promenade de 30 minutes.
                </p>
              </div>

              <div className="dogwalking-card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Puis-je rencontrer le promeneur avant la première promenade ?
                </h3>
                <p className="text-gray-600">
                  Absolument ! Nous recommandons vivement d'organiser une rencontre gratuite pour vous assurer que le promeneur convient à votre chien.
                </p>
              </div>

              <div className="dogwalking-card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Que se passe-t-il si mon chien a des besoins spéciaux ?
                </h3>
                <p className="text-gray-600">
                  Vous pouvez communiquer tous les besoins spéciaux de votre chien lors de la réservation. Beaucoup de nos promeneurs ont de l'expérience avec des chiens ayant des besoins particuliers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 dogwalking-bg-gradient">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Prêt à offrir à votre chien sa prochaine aventure ?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Trouvez des promeneurs de confiance près de chez vous
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/search?serviceType=dog-walking">
                <Button className="dogwalking-button-primary bg-white text-dogwalking-green hover:bg-gray-100 px-8 py-4 text-lg">
                  Commencer la recherche
                </Button>
              </Link>
              <Link to="/become-sitter">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-dogwalking-green px-8 py-4 text-lg">
                  Devenir promeneur
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

export default DogWalking;