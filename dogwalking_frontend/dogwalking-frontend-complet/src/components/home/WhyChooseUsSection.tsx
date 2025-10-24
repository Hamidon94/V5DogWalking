import { Star, Shield, Clock, MapPin, Heart, Award } from "lucide-react";

const WhyChooseUsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Pourquoi choisir <span className="dogwalking-text-green">DogWalking</span> ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            La seule plateforme qui combine sécurité maximale, transparence totale et 
            service d'exception pour le bien-être de votre compagnon.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Security First */}
          <div className="dogwalking-card p-8 text-center group hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-6 bg-dogwalking-blue/10 rounded-full flex items-center justify-center group-hover:bg-dogwalking-blue/20 transition-colors">
              <Shield className="w-8 h-8 text-dogwalking-blue" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Sécurité Maximale
            </h3>
            <p className="text-gray-600 mb-4">
              Seule plateforme exigeant un casier judiciaire vierge B2 et une vérification d'identité 
              obligatoire pour tous les promeneurs. Votre sécurité n'a pas de prix.
            </p>
            <div className="text-sm text-dogwalking-blue font-semibold">
              100% des promeneurs vérifiés
            </div>
          </div>

          {/* Transparent Pricing */}
          <div className="dogwalking-card p-8 text-center group hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-6 bg-dogwalking-green/10 rounded-full flex items-center justify-center group-hover:bg-dogwalking-green/20 transition-colors">
              <Star className="w-8 h-8 text-dogwalking-green" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Tarifs Transparents
            </h3>
            <p className="text-gray-600 mb-4">
              Fini les surprises ! Tarification claire par tranches de 30 minutes. 
              Promenade dès 7€, garde à domicile 31€. Pas de frais cachés.
            </p>
            <div className="text-sm text-dogwalking-green font-semibold">
              Prix fixes et transparents
            </div>
          </div>

          {/* Real-time Tracking */}
          <div className="dogwalking-card p-8 text-center group hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <MapPin className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Suivi GPS en Temps Réel
            </h3>
            <p className="text-gray-600 mb-4">
              Suivez la promenade de votre animal en direct sur votre smartphone. 
              Photos et vidéos envoyées pendant la mission pour votre tranquillité.
            </p>
            <div className="text-sm text-purple-600 font-semibold">
              Technologie de pointe
            </div>
          </div>

          {/* 24/7 Support */}
          <div className="dogwalking-card p-8 text-center group hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Support 24h/24
            </h3>
            <p className="text-gray-600 mb-4">
              Notre équipe dédiée est disponible en permanence, même pour les urgences vétérinaires. 
              Votre animal n'est jamais seul.
            </p>
            <div className="text-sm text-orange-600 font-semibold">
              Assistance d'urgence incluse
            </div>
          </div>

          {/* Insurance Coverage */}
          <div className="dogwalking-card p-8 text-center group hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
              <Heart className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Assurance Premium
            </h3>
            <p className="text-gray-600 mb-4">
              Couverture jusqu'à 25 000€ pour les soins vétérinaires et dommages matériels. 
              Protection complète incluse dans chaque réservation.
            </p>
            <div className="text-sm text-red-600 font-semibold">
              Garantie DogWalking
            </div>
          </div>

          {/* Certified Walkers */}
          <div className="dogwalking-card p-8 text-center group hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-6 bg-yellow-100 rounded-full flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Promeneurs Certifiés
            </h3>
            <p className="text-gray-600 mb-4">
              Formations spécialisées, certifications en premiers secours animaux, 
              et évaluations continues. L'excellence au service de votre animal.
            </p>
            <div className="text-sm text-yellow-600 font-semibold">
              Formation continue
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="dogwalking-card p-8 bg-gradient-to-r from-dogwalking-green/10 to-dogwalking-blue/10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Rejoignez plus de 24 000 propriétaires satisfaits
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Faites confiance au leader français de la garde d'animaux. 
              Votre compagnon mérite ce qu'il y a de mieux.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="dogwalking-button-primary px-8 py-3">
                Trouver un Promeneur
              </button>
              <button className="dogwalking-button-secondary px-8 py-3">
                Devenir Promeneur Certifié
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
