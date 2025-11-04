import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20 md:pt-24 bg-ocean-500">
      {/* Background Image - Simplifié */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')` 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-ocean/80 to-ocean/50" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
            Trouvez le Promeneur Certifié Idéal
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Offrez à votre compagnon l'exercice et l'attention qu'il mérite.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button variant="hero" size="lg" className="text-lg px-8 py-4 h-auto" onClick={() => window.location.href = '/search'}>
              Rechercher des Promeneurs
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto bg-white/10 border-white/30 text-white hover:bg-white/20" onClick={() => window.location.href = '/walker/register'}>
              Devenir Promeneur
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
