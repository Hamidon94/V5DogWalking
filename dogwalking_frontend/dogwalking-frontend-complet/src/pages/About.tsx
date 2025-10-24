import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Heart, Users, Globe, Award, Target, Shield } from "lucide-react";

const About = () => {
  const stats = [
    { number: "2M+", label: "Propriétaires d'animaux" },
    { number: "500K+", label: "Promeneur certifiés" },
    { number: "50M+", label: "Nuits de garde" },
    { number: "4.9★", label: "Note moyenne" }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "L'amour des animaux avant tout",
      description: "Nous croyons que tous les animaux méritent d'être aimés et choyés comme des membres de la famille."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Sécurité et confiance",
      description: "La sécurité de vos animaux est notre priorité absolue avec des standards de vérification rigoureux."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Communauté bienveillante",
      description: "Nous construisons une communauté où propriétaires et promeneur certifiés se soutiennent mutuellement."
    }
  ];

  const team = [
    {
      name: "Sarah Martin",
      role: "CEO & Fondatrice",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=300&h=300&fit=crop&crop=face",
      description: "Passionnée d'animaux depuis l'enfance, Sarah a créé DogWalking pour révolutionner la garde d'animaux."
    },
    {
      name: "Marc Dubois", 
      role: "CTO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      description: "Expert en technologie, Marc développe les outils qui connectent notre communauté."
    },
    {
      name: "Emma Chen",
      role: "Head of Safety",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face", 
      description: "Vétérinaire de formation, Emma supervise tous nos standards de sécurité et de bien-être animal."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-dogwalking-green/10 to-dogwalking-blue/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              À propos de DogWalking
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Nous croyons que tout le monde mérite l'amour inconditionnel d'un animal de compagnie—
              et chez DogWalking, notre mission est de faciliter cette expérience.
            </p>

            <Button className="dogwalking-button-secondary px-8 py-4 text-lg">
              Rejoindre notre mission
            </Button>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl font-bold text-dogwalking-green mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-dogwalking-gray-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Notre histoire
                </h2>
                
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p>
                    Fondé en 2011, DogWalking est né d'une idée simple : connecter les propriétaires d'animaux 
                    avec des personnes de confiance qui partagent leur amour des animaux.
                  </p>
                  
                  <p>
                    Ce qui a commencé comme une solution locale à Seattle s'est transformé en la plus grande 
                    plateforme mondiale de services pour animaux de compagnie, présente dans des milliers de villes 
                    à travers les États-Unis, le Canada, le Royaume-Uni et l'Europe.
                  </p>
                  
                  <p>
                    Aujourd'hui, nous autonomisons notre communauté de promeneur certifiés et promeneurs de chiens de confiance 
                    pour qu'ils puissent gérer leurs propres entreprises de soins pour animaux sur notre plateforme, 
                    tout en offrant aux propriétaires d'animaux la tranquillité d'esprit qu'ils méritent.
                  </p>
                </div>
              </div>
              
              <div className="dogwalking-card p-8">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 bg-dogwalking-green/10 rounded-full flex items-center justify-center">
                    <Heart className="w-16 h-16 text-dogwalking-green" />
                  </div>
                  
                  <blockquote className="text-xl text-gray-700 italic mb-4">
                    "Notre vision est un monde où aucun animal ne manque d'amour et d'attention, 
                    même quand ses propriétaires ne peuvent pas être là."
                  </blockquote>
                  
                  <cite className="text-dogwalking-green font-semibold">
                    — Équipe DogWalking
                  </cite>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Nos valeurs
              </h2>
              <p className="text-xl text-gray-600">
                Les principes qui guident tout ce que nous faisons
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-dogwalking-green/10 rounded-full flex items-center justify-center">
                    <div className="text-dogwalking-green">
                      {value.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-dogwalking-gray-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Notre équipe dirigeante
              </h2>
              <p className="text-xl text-gray-600">
                Des passionnés d'animaux qui dirigent notre mission
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="dogwalking-card p-8 text-center">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                  />
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  
                  <p className="text-dogwalking-green font-medium mb-4">
                    {member.role}
                  </p>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="dogwalking-card p-12">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-8 bg-dogwalking-green/10 rounded-full flex items-center justify-center">
                  <Target className="w-10 h-10 text-dogwalking-green" />
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Notre mission
                </h2>
                
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Rendre le monde meilleur pour les animaux de compagnie et leurs familles en créant 
                  la plateforme de confiance qui connecte les propriétaires d'animaux avec des personnes 
                  qui partagent leur amour et leur dévouement envers les animaux.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="flex items-start space-x-3">
                    <Award className="w-6 h-6 text-dogwalking-green mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Excellence du service</h4>
                      <p className="text-gray-600">Nous nous engageons à fournir le meilleur service possible pour chaque animal.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Globe className="w-6 h-6 text-dogwalking-green mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Impact global</h4>
                      <p className="text-gray-600">Nous œuvrons pour améliorer la vie des animaux partout dans le monde.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 dogwalking-bg-gradient">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Rejoignez notre communauté
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Que vous cherchiez un promeneur certifié ou souhaitiez en devenir un, nous sommes là pour vous
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="dogwalking-button-primary bg-white text-dogwalking-green hover:bg-gray-100 px-8 py-4 text-lg">
                Trouver un promeneur certifié
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-dogwalking-green px-8 py-4 text-lg">
                Devenir promeneur certifié
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;