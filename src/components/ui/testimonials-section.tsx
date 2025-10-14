import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Marie Dubois",
      location: "Paris 15ème",
      rating: 5,
      text: "Service exceptionnel ! Sophie s'occupe de mon Golden Retriever avec tant d'amour. Je recommande vivement !",
      avatar: "👩‍🦰"
    },
    {
      name: "Pierre Martin",
      location: "Lyon 6ème",
      rating: 5,
      text: "Enfin une solution fiable pour les promenades de mon chien. L'application est intuitive et les promeneurs sont fantastiques.",
      avatar: "👨‍💼"
    },
    {
      name: "Julie Leroy",
      location: "Marseille 8ème",
      rating: 5,
      text: "Mon Labrador adore ses promenades avec Thomas. Le suivi GPS me rassure complètement. Parfait !",
      avatar: "👩‍🎓"
    },
    {
      name: "Antoine Rousseau",
      location: "Toulouse 1er",
      rating: 5,
      text: "Service professionnel et promeneurs passionnés. Mon Beagle revient toujours épanoui de ses sorties.",
      avatar: "👨‍🔬"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-warm/50 to-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ce que disent nos{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              clients
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Plus de 10 000 propriétaires nous font confiance pour le bonheur de leur compagnon
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-card hover:shadow-lg transition-all duration-300 bg-gradient-card border-0 h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{testimonial.avatar}</div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground flex-wrap">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">4.9/5</span>
              <span>Note moyenne</span>
            </div>
            <div className="w-px h-4 bg-border"></div>
            <div>
              <span className="font-semibold">10 000+</span>
              <span className="ml-1">clients satisfaits</span>
            </div>
            <div className="w-px h-4 bg-border"></div>
            <div>
              <span className="font-semibold">50 000+</span>
              <span className="ml-1">promenades réalisées</span>
            </div>
          </div>
          
          {/* Intégration Trustpilot */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">Noté Excellent sur Trustpilot</p>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-6 py-3 shadow-sm">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-green-500 text-green-500" />
                ))}
              </div>
              <span className="font-bold text-lg">4.8</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-sm text-muted-foreground">2 347 avis</span>
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 126 31'%3E%3Cpath fill='%2300B67A' d='M0 0h126v31H0z'/%3E%3Cpath fill='%23FFF' d='M30.4 11.7h-7.6l-2.4-7.3-2.3 7.3h-7.6l6.1 4.5-2.3 7.3 6.1-4.5 6.1 4.5-2.3-7.3 6.2-4.5zm32.3 0h-7.6l-2.3-7.3-2.4 7.3h-7.6l6.2 4.5-2.4 7.3 6.2-4.5 6.1 4.5-2.3-7.3 6.1-4.5zm32.4 0h-7.6l-2.4-7.3-2.3 7.3h-7.6l6.1 4.5-2.3 7.3 6.1-4.5 6.1 4.5-2.3-7.3 6.2-4.5z'/%3E%3C/svg%3E" 
                alt="Trustpilot" 
                className="h-5 ml-2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
