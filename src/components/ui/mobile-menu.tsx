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
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={toggleMenu} />
          <div className="fixed top-0 right-0 h-full w-64 bg-background border-l shadow-lg">
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
            
            <nav className="p-4 space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block py-2 text-foreground hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  {item.label}
                </a>
              ))}
              
              <div className="pt-4 border-t space-y-3">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => {
                    window.location.href = '/auth';
                    toggleMenu();
                  }}
                >
                  Connexion
                </Button>
                <Button 
                  variant="hero" 
                  className="w-full" 
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
