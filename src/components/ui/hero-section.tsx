import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')` 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
            Trouvez le Promeneur{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent gradient-animate">
              Certifié Idéal
            </span>
            {" "}pour Votre Compagnon
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Trouvez des promeneurs de confiance près de chez vous et offrez à votre compagnon 
            l'exercice et l'attention qu'il mérite.
          </p>
          
          {/* Formulaire de recherche rapide */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <select className="bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/70">
                <option value="">Type d'animal</option>
                <option value="chien">Chien</option>
                <option value="chat">Chat</option>
              </select>
              <select className="bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/70">
                <option value="">Service</option>
                <option value="promenade">Promenade</option>
                <option value="visite">Visite simple</option>
                <option value="garde">Garde à domicile</option>
                <option value="pension">Pension canine</option>
                <option value="veterinaire">Accompagnement vétérinaire</option>
              </select>
              <div className="relative">
                <input 
                  type="text" 
                  id="address-input"
                  placeholder="Votre adresse" 
                  className="bg-white/20 border border-white/30 rounded-lg px-4 py-3 pr-12 text-white placeholder-white/70 w-full"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          const input = document.getElementById('address-input') as HTMLInputElement;
                          if (input) {
                            input.value = `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
                          }
                        },
                        (error) => {
                          console.error('Erreur de géolocalisation:', error);
                          alert('Impossible d\'obtenir votre position. Veuillez entrer votre adresse manuellement.');
                        }
                      );
                    } else {
                      alert('La géolocalisation n\'est pas supportée par votre navigateur.');
                    }
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Utiliser ma position actuelle"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <circle cx="12" cy="12" r="10"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
              <select className="bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/70">
                <option value="">Taille du chien</option>
                <option value="petit">Petit (moins de 10kg)</option>
                <option value="moyen">Moyen (10-25kg)</option>
                <option value="grand">Grand (plus de 25kg)</option>
              </select>
              <input 
                type="date" 
                placeholder="Date souhaitée" 
                className="bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/70"
              />
              <input 
                type="time" 
                placeholder="Heure souhaitée" 
                className="bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/70"
              />
            </div>
            <Button 
              variant="hero" 
              size="lg" 
              className="w-full mt-4 text-lg px-8 py-4 h-auto"
              onClick={() => window.location.href = '/search'}
            >
              Rechercher des promeneurs
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button variant="hero" size="lg" className="text-lg px-8 py-4 h-auto" onClick={() => window.location.href = '/auth'}>
              Réserver une promenade
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto bg-white/10 border-white/30 text-white hover:bg-white/20" onClick={() => window.location.href = '/walker/register'}>
              Devenir promeneur
            </Button>
          </div>
          
          <div className="mt-12 flex justify-center items-center gap-8 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sage rounded-full"></div>
              <span>Promeneurs vérifiés</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-ocean rounded-full"></div>
              <span>Paiement sécurisé</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sage rounded-full"></div>
              <span>Suivi en temps réel</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};