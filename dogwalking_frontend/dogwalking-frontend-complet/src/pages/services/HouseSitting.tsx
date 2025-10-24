import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchForm from "@/components/search/SearchForm";
import { Link } from "react-router-dom";
import { Home, Shield, Heart, Star, Key, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import dogBoardingImage from "@/assets/dog-boarding.jpg";

const HouseSitting = () => {
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
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Garde à domicile
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  Votre promeneur certifié s'occupe de vos animaux et de votre maison. Vos animaux recevront toute l'attention dont ils ont besoin dans le confort de leur foyer.
                </p>

                <div className="mb-8">
                  <p className="text-sm font-medium text-gray-700 mb-4">
                    Découvrez d'autres services :
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link to="/services/boarding" className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition-colors">
                      Hébergement • chez le promeneur certifié
                    </Link>
                    <span className="px-4 py-2 bg-dogwalking-green text-white rounded-full text-sm">
                      Garde à domicile • chez vous
                    </span>
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
                Pourquoi choisir la garde à domicile ?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-dogwalking-green/10 rounded-full flex items-center justify-center">
                  <Home className="w-8 h-8 text-dogwalking-green" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Confort de la maison
                </h3>
                <p className="text-gray-600">
                  Vos animaux restent dans leur environnement familier, réduisant le stress et l'anxiété.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-dogwalking-green/10 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-dogwalking-green" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Sécurité de votre domicile
                </h3>
                <p className="text-gray-600">
                  Votre maison est surveillée et entretenue pendant votre absence.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-dogwalking-green/10 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-dogwalking-green" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Attention personnalisée
                </h3>
                <p className="text-gray-600">
                  Votre promeneur certifié se consacre entièrement à vos animaux et votre maison.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 dogwalking-bg-gradient">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Partez l'esprit tranquille
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Trouvez un promeneur certifié de confiance pour s'occuper de vos animaux et de votre maison
            </p>
            
            <Link to="/search?serviceType=house-sitting">
              <Button className="dogwalking-button-primary bg-white text-dogwalking-green hover:bg-gray-100 px-8 py-4 text-lg">
                Trouver un promeneur certifié
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HouseSitting;