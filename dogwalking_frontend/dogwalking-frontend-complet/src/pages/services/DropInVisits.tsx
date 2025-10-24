import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchForm from "@/components/search/SearchForm";
import { Link } from "react-router-dom";
import { Clock, Home, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import dogWalkingImage from "@/assets/dog-walking.jpg";

const DropInVisits = () => {
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
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Visites à domicile
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  Des visites courtes chez vous pour nourrir, promener et jouer avec vos animaux. Parfait pour les animaux qui préfèrent rester à la maison.
                </p>

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
                    <span className="px-4 py-2 bg-dogwalking-green text-white rounded-full text-sm">
                      Visites à domicile • visites à votre domicile
                    </span>
                    <Link to="/services/doggy-daycare" className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition-colors">
                      Garderie pour chien • chez le promeneur certifié
                    </Link>
                    <Link to="/services/dog-walking" className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition-colors">
                      Promenade de chien • dans votre quartier
                    </Link>
                  </div>
                </div>
              </div>

              <div>
                <SearchForm compact />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Parfait pour les journées chargées
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-dogwalking-green/10 rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8 text-dogwalking-green" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Flexibilité totale
                </h3>
                <p className="text-gray-600">
                  Programmez des visites selon vos besoins, de 30 minutes à plusieurs heures.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-dogwalking-green/10 rounded-full flex items-center justify-center">
                  <Home className="w-8 h-8 text-dogwalking-green" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Confort à domicile
                </h3>
                <p className="text-gray-600">
                  Vos animaux restent dans leur environnement familier et sécurisé.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-dogwalking-green/10 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-dogwalking-green" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Soins personnalisés
                </h3>
                <p className="text-gray-600">
                  Alimentation, promenades, jeux et câlins selon les besoins de vos animaux.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 dogwalking-bg-gradient">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Des visites quand vous en avez besoin
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Réservez des visites flexibles pour vos animaux
            </p>
            
            <Link to="/search?serviceType=drop-in-visits">
              <Button className="dogwalking-button-primary bg-white text-dogwalking-green hover:bg-gray-100 px-8 py-4 text-lg">
                Réserver des visites
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DropInVisits;