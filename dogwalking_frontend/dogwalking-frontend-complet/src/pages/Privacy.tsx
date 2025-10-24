import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Shield, Eye, Lock, UserCheck, Database, Globe } from "lucide-react";

const Privacy = () => {
  const dataTypes = [
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Informations personnelles",
      description: "Nom, email, téléphone, adresse, photo de profil",
      usage: "Pour créer et gérer votre compte, vous identifier et communiquer avec vous"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Données de l'animal",
      description: "Nom, race, âge, taille, besoins médicaux, photos",
      usage: "Pour faciliter la mise en relation avec les promeneur certifiés appropriés"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Données de localisation",
      description: "Adresse, localisation GPS pour les services",
      usage: "Pour trouver des promeneur certifiés près de chez vous et organiser les services"
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
              <Shield className="w-10 h-10 text-dogwalking-green" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Politique de confidentialité
            </h1>
            
            <p className="text-xl text-gray-600">
              Dernière mise à jour : 1er janvier 2024
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="dogwalking-card p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Notre engagement envers votre vie privée
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Chez DogWalking, nous prenons votre vie privée au sérieux. Cette politique explique 
                comment nous collectons, utilisons, partageons et protégeons vos informations 
                personnelles lorsque vous utilisez nos services. Nous nous engageons à être 
                transparents sur nos pratiques et à vous donner le contrôle sur vos données.
              </p>
            </div>

            {/* Data Collection */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Quelles données collectons-nous ?
              </h2>
              
              <div className="space-y-6">
                {dataTypes.map((type, index) => (
                  <div key={index} className="dogwalking-card p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-dogwalking-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="text-dogwalking-green">
                          {type.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {type.title}
                        </h3>
                        <p className="text-gray-600 mb-3">
                          <strong>Données collectées :</strong> {type.description}
                        </p>
                        <p className="text-gray-600">
                          <strong>Utilisation :</strong> {type.usage}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Sections */}
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Comment utilisons-nous vos données ?</h2>
              <p className="text-gray-600 mb-4">
                Nous utilisons vos informations personnelles uniquement dans les buts suivants :
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Fournir, maintenir et améliorer nos services</li>
                <li>Faciliter les réservations et communications entre utilisateurs</li>
                <li>Traiter les paiements et transactions</li>
                <li>Assurer la sécurité et prévenir la fraude</li>
                <li>Respecter nos obligations légales</li>
                <li>Vous envoyer des communications importantes sur le service</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Partage d'informations</h2>
              <p className="text-gray-600 mb-4">
                Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos informations 
                uniquement dans les cas suivants :
              </p>
              
              <div className="dogwalking-card p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Avec d'autres utilisateurs</h3>
                <p className="text-gray-600">
                  Certaines informations de profil sont visibles par les autres utilisateurs pour 
                  faciliter les réservations (nom, photo, avis, localisation générale).
                </p>
              </div>

              <div className="dogwalking-card p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Avec nos prestataires de services</h3>
                <p className="text-gray-600">
                  Nous travaillons avec des tiers de confiance pour le traitement des paiements, 
                  l'hébergement des données et d'autres services essentiels.
                </p>
              </div>

              <div className="dogwalking-card p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Pour des raisons légales</h3>
                <p className="text-gray-600">
                  Nous pouvons divulguer des informations si requis par la loi ou pour protéger 
                  nos droits, notre propriété ou la sécurité de nos utilisateurs.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sécurité des données</h2>
              <p className="text-gray-600 mb-6">
                Nous mettons en œuvre des mesures de sécurité techniques, administratives et physiques 
                pour protéger vos informations personnelles contre l'accès non autorisé, la perte, 
                le vol ou l'utilisation abusive.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="dogwalking-card p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Lock className="w-6 h-6 text-dogwalking-green" />
                    <h4 className="font-semibold text-gray-900">Chiffrement</h4>
                  </div>
                  <p className="text-gray-600">
                    Toutes les données sensibles sont chiffrées en transit et au repos.
                  </p>
                </div>

                <div className="dogwalking-card p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Eye className="w-6 h-6 text-dogwalking-green" />
                    <h4 className="font-semibold text-gray-900">Accès limité</h4>
                  </div>
                  <p className="text-gray-600">
                    Seuls les employés autorisés peuvent accéder à vos données personnelles.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Vos droits</h2>
              <p className="text-gray-600 mb-4">
                Conformément au RGPD et aux lois locales sur la protection des données, vous avez les droits suivants :
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-dogwalking-green rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Droit d'accès :</strong>
                    <span className="text-gray-600"> Demander une copie de vos données</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-dogwalking-green rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Droit de rectification :</strong>
                    <span className="text-gray-600"> Corriger des données inexactes</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-dogwalking-green rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Droit à l'effacement :</strong>
                    <span className="text-gray-600"> Supprimer vos données</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-dogwalking-green rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Droit d'opposition :</strong>
                    <span className="text-gray-600"> Vous opposer au traitement</span>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies et technologies similaires</h2>
              <p className="text-gray-600 mb-6">
                Nous utilisons des cookies et technologies similaires pour améliorer votre expérience, 
                analyser l'utilisation de nos services et personnaliser le contenu. Vous pouvez gérer 
                vos préférences de cookies dans les paramètres de votre navigateur.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Conservation des données</h2>
              <p className="text-gray-600 mb-6">
                Nous conservons vos informations personnelles aussi longtemps que nécessaire pour 
                fournir nos services, respecter nos obligations légales, résoudre les litiges et 
                faire respecter nos accords.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Transferts internationaux</h2>
              <p className="text-gray-600 mb-6">
                Vos données peuvent être transférées et traitées dans des pays autres que votre pays 
                de résidence. Nous nous assurons que ces transferts respectent les standards de 
                protection des données applicables.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Modifications de cette politique</h2>
              <p className="text-gray-600 mb-6">
                Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. 
                Nous vous notifierons de tout changement important par email ou via notre plateforme.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-dogwalking-gray-light">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="dogwalking-card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Nous contacter
              </h2>
              <p className="text-gray-600 mb-6">
                Si vous avez des questions sur cette politique de confidentialité ou souhaitez exercer 
                vos droits, contactez notre délégué à la protection des données :
              </p>
              
              <div className="space-y-3 text-gray-700">
                <p><strong>Email :</strong> privacy@dogwalking.fr</p>
                <p><strong>Adresse :</strong> Délégué à la Protection des Données<br />
                DogWalking France<br />
                123 Avenue des Champs-Élysées<br />
                75008 Paris, France</p>
                <p><strong>Téléphone :</strong> 01 23 45 67 89</p>
              </div>

              <p className="text-sm text-gray-500 mt-6">
                Vous avez également le droit de déposer une plainte auprès de la Commission Nationale 
                de l'Informatique et des Libertés (CNIL) si vous estimez que le traitement de vos 
                données personnelles ne respecte pas la réglementation.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;