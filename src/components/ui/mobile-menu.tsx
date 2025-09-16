import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { href: "#comment-ca-marche", label: "Comment ça marche" },
    { href: "#tarifs", label: "Tarifs" },
    { href: "#promeneurs", label: "Nos promeneurs" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <>
      {/* Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleMenu}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="fixed inset-0 bg-black/60" onClick={toggleMenu} />
          <div className="fixed top-0 right-0 h-full w-80 bg-background border-l shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <div className="text-xl">🐕</div>
                <span className="font-bold bg-gradient-primary bg-clip-text text-transparent">
                  DogWalking
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <nav className="p-6 space-y-6">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block py-3 px-2 text-lg font-medium text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                  onClick={toggleMenu}
                >
                  {item.label}
                </a>
              ))}
              
              <div className="pt-6 border-t space-y-4">
                <Button 
                  variant="ghost" 
                  size="lg"
                  className="w-full justify-center text-lg" 
                  onClick={() => {
                    window.location.href = '/auth';
                    toggleMenu();
                  }}
                >
                  Connexion
                </Button>
                <Button 
                  variant="hero" 
                  size="lg"
                  className="w-full text-lg" 
                  onClick={() => {
                    window.location.href = '/auth';
                    toggleMenu();
                  }}
                >
                  S'inscrire
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
