import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AlertTriangle, Scale, FileText } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-dogwalking-green/10 to-dogwalking-blue/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-dogwalking-green/10 rounded-full flex items-center justify-center">
              <Scale className="w-10 h-10 text-dogwalking-green" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Conditions d'utilisation
            </h1>
            
            <p className="text-xl text-gray-600">
              Dernière mise à jour : 1er janvier 2024
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Notice */}
            <div className="dogwalking-card p-6 mb-8 bg-blue-50 border-l-4 border-dogwalking-blue">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-dogwalking-blue flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Important</h3>
                  <p className="text-gray-700">
                    En utilisant les services DogWalking, vous acceptez ces conditions d'utilisation. 
                    Veuillez les lire attentivement avant d'utiliser notre plateforme.
                  </p>
                </div>
              </div>
            </div>

            {/* Terms Content */}
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptation des conditions</h2>
              <p className="text-gray-600 mb-6">
                En accédant et en utilisant le site web et l'application mobile de DogWalking ("Services"), 
                vous acceptez d'être lié par ces Conditions d'utilisation ("Conditions"). Si vous n'acceptez 
                pas ces conditions, veuillez ne pas utiliser nos Services.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description des services</h2>
              <p className="text-gray-600 mb-4">
                DogWalking est une plateforme qui met en relation les propriétaires d'animaux de compagnie 
                ("Propriétaires") avec des prestataires de services de garde d'animaux ("Promeneur Certifiés"). 
                Nos services incluent :
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Hébergement d'animaux de compagnie</li>
                <li>Garde à domicile</li>
                <li>Promenades de chiens</li>
                <li>Visites à domicile</li>
                <li>Garderie pour chiens</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Inscription et comptes utilisateur</h2>
              <p className="text-gray-600 mb-4">
                Pour utiliser certains aspects de nos Services, vous devez créer un compte. 
                Vous vous engagez à :
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Fournir des informations exactes, complètes et à jour</li>
                <li>Maintenir la sécurité de votre mot de passe</li>
                <li>Être responsable de toute activité sur votre compte</li>
                <li>Nous notifier immédiatement de tout usage non autorisé</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Responsabilités des utilisateurs</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Propriétaires d'animaux</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li>Fournir des informations précises sur votre animal</li>
                <li>Divulguer tout problème de santé ou comportement</li>
                <li>S'assurer que votre animal est à jour dans ses vaccinations</li>
                <li>Respecter les politiques d'annulation</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Promeneur Certifiés</h3>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Fournir des services avec professionnalisme et soin</li>
                <li>Respecter les instructions spécifiques du propriétaire</li>
                <li>Maintenir un environnement sûr pour les animaux</li>
                <li>Signaler immédiatement tout incident ou problème</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Paiements et frais</h2>
              <p className="text-gray-600 mb-4">
                Les paiements sont traités de manière sécurisée via notre plateforme. 
                DogWalking perçoit une commission sur chaque réservation complétée.
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Les prix sont fixés par les Promeneur Certifiés</li>
                <li>Les paiements sont libérés après la completion du service</li>
                <li>Les remboursements sont soumis à notre politique d'annulation</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. La DogWalking Guarantee</h2>
              <p className="text-gray-600 mb-6">
                DogWalking offre certaines protections pour les réservations éligibles, incluant une couverture 
                pour les soins vétérinaires d'urgence jusqu'à 25 000€. Les détails complets sont disponibles 
                dans notre Police de la DogWalking Guarantee.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation de responsabilité</h2>
              <p className="text-gray-600 mb-6">
                DogWalking agit comme un intermédiaire entre les Propriétaires et les Promeneur Certifiés. 
                Nous ne sommes pas responsables des actions ou omissions des utilisateurs de notre plateforme. 
                Vous utilisez nos Services à vos propres risques.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Propriété intellectuelle</h2>
              <p className="text-gray-600 mb-6">
                Tous les droits de propriété intellectuelle sur nos Services appartiennent à DogWalking ou 
                à nos concédants de licence. Vous ne pouvez pas reproduire, distribuer ou créer des 
                œuvres dérivées sans notre autorisation écrite préalable.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Résiliation</h2>
              <p className="text-gray-600 mb-6">
                Nous nous réservons le droit de suspendre ou de résilier votre compte à tout moment, 
                avec ou sans préavis, si nous estimons que vous avez violé ces Conditions ou 
                toute loi applicable.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Modifications des conditions</h2>
              <p className="text-gray-600 mb-6">
                Nous pouvons modifier ces Conditions à tout moment. Les modifications importantes 
                seront notifiées par email ou via notre plateforme. Votre utilisation continue 
                constitue une acceptation des nouvelles Conditions.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Droit applicable</h2>
              <p className="text-gray-600 mb-6">
                Ces Conditions sont régies par le droit français. Tout litige sera soumis à la 
                juridiction exclusive des tribunaux de Paris, France.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact</h2>
              <p className="text-gray-600 mb-6">
                Pour toute question concernant ces Conditions d'utilisation, contactez-nous à :
              </p>
              <div className="dogwalking-card p-6">
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email :</strong> legal@dogwalking.fr</p>
                  <p><strong>Adresse :</strong> 123 Avenue des Champs-Élysées, 75008 Paris, France</p>
                  <p><strong>Téléphone :</strong> 01 23 45 67 89</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="py-16 bg-dogwalking-gray-light">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="dogwalking-card p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <FileText className="w-6 h-6 text-dogwalking-green" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Politique de confidentialité
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Découvrez comment nous collectons, utilisons et protégeons vos données personnelles.
                </p>
                <a href="/privacy" className="text-dogwalking-green hover:underline">
                  Lire la politique de confidentialité →
                </a>
              </div>

              <div className="dogwalking-card p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Scale className="w-6 h-6 text-dogwalking-green" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    DogWalking Guarantee
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Apprenez-en plus sur notre programme de protection et les couvertures disponibles.
                </p>
                <a href="/dogwalking-guarantee" className="text-dogwalking-green hover:underline">
                  Voir les détails de la garantie →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;