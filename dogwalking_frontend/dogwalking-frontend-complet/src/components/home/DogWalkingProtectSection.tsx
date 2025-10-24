import { Shield, CheckCircle, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const DogWalkingProtectSection = () => {
  return (
    <section className="py-20 bg-dogwalking-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-10 h-10 text-dogwalking-blue" />
              <h2 className="text-4xl font-bold text-gray-900">
                DogWalkingProtect
              </h2>
            </div>
            
            <p className="text-2xl font-semibold text-gray-800 mb-6">
              La sécurité et la confiance au cœur de chaque réservation.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-dogwalking-green mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Vérification d'identité obligatoire
                  </h3>
                  <p className="text-gray-600">
                    Tous nos promeneurs présentent une pièce d'identité vérifiée. Votre sécurité est notre priorité absolue.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-dogwalking-green mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Casier judiciaire vierge B2 exigé
                  </h3>
                  <p className="text-gray-600">
                    Chaque promeneur fournit un casier judiciaire vierge B2. Une garantie de confiance unique sur le marché.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-dogwalking-green mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Support 24h/24 et 7j/7
                  </h3>
                  <p className="text-gray-600">
                    Notre équipe est disponible en permanence, y compris pour l'assistance vétérinaire d'urgence.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-6 h-6 text-dogwalking-green mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Couverture jusqu'à 25 000€
                  </h3>
                  <p className="text-gray-600">
                    Assurance premium incluse : soins vétérinaires, dommages matériels et protection complète de votre animal.
                  </p>
                </div>
              </div>
            </div>

            <Button className="dogwalking-button-secondary">
              En savoir plus sur DogWalkingProtect
            </Button>
          </div>

          {/* Right side - Image/Illustration */}
          <div className="relative">
            <div className="dogwalking-card p-8">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 bg-dogwalking-blue/10 rounded-full flex items-center justify-center">
                  <Shield className="w-16 h-16 text-dogwalking-blue" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Protection et Tranquillité d'Esprit
                </h3>
                
                <p className="text-gray-600 mb-6">
                  Chaque réservation DogWalking est protégée par une couverture complète, 
                  pour que vous puissiez vous concentrer sur l'essentiel : le bonheur de votre animal.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-700">Couverture Soins Vétérinaires</span>
                    <span className="font-semibold text-dogwalking-green">✓ Jusqu'à 25 000€</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-700">Support d'Urgence 24h/24</span>
                    <span className="font-semibold text-dogwalking-green">✓ Toujours Disponible</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-700">Vérification d'Identité</span>
                    <span className="font-semibold text-dogwalking-green">✓ Tous les Promeneurs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DogWalkingProtectSection;