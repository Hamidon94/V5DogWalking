import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Users, Heart, Award, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

const Careers = () => {
  const benefits = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Travail passionnant",
      description: "Rejoignez une équipe qui partage votre amour pour les animaux de compagnie."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Équipe collaborative",
      description: "Travaillez avec des collègues motivés dans un environnement bienveillant."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Croissance professionnelle",
      description: "Développez vos compétences avec des formations et opportunités d'évolution."
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Avantages compétitifs",
      description: "Salaire attractif, télétravail flexible et avantages sociaux étendus."
    }
  ];

  const openPositions = [
    {
      title: "Développeur Full Stack",
      department: "Technique",
      location: "Paris / Remote",
      type: "CDI"
    },
    {
      title: "Responsable Marketing",
      department: "Marketing",
      location: "Lyon",
      type: "CDI"
    },
    {
      title: "Customer Success Manager",
      department: "Support Client",
      location: "Remote",
      type: "CDI"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Rejoignez l'équipe DogWalking
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Aidez-nous à créer le meilleur service de garde d'animaux au monde
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Voir nos offres
            </Button>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Pourquoi nous rejoindre ?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <div className="text-primary">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-20 bg-muted/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Postes ouverts
            </h2>
            
            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <div key={index} className="bg-card p-6 rounded-lg border">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span>{position.department}</span>
                        <span>•</span>
                        <span>{position.location}</span>
                        <span>•</span>
                        <span>{position.type}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="mt-4 md:mt-0">
                      Postuler
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Vous ne trouvez pas le poste idéal ?
              </p>
              <Button variant="outline">
                Candidature spontanée
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;