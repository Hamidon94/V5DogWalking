import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { href: "/search", label: "Rechercher" },
    { href: "/walker/register", label: "Devenir Promeneur" },
    { href: "/priority", label: "Être prioritaire" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/help", label: "Aide" }
  ];

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleMenu}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="fixed inset-0 bg-black/60" onClick={toggleMenu} />
          <div className="fixed top-0 right-0 h-full w-80 bg-white border-l shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <div className="text-xl">🐕</div>
                <span className="font-bold text-gray-900">
                  DogWalking
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                <X className="h-6 w-6 text-gray-900" />
              </Button>
            </div>
            
            <nav className="p-6 space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item.href}
                  className="block w-full text-left py-3 px-4 text-base font-medium text-gray-900 hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                  onClick={() => {
                    window.location.href = item.href;
                    toggleMenu();
                  }}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="pt-6 border-t space-y-3">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full justify-center text-base border-gray-300 text-gray-900 hover:bg-gray-50" 
                  onClick={() => {
                    window.location.href = "/auth";
                    toggleMenu();
                  }}
                >
                  Connexion
                </Button>
                <Button 
                  size="lg"
                  className="w-full text-base bg-primary hover:bg-primary/90 text-white" 
                  onClick={() => {
                    window.location.href = "/auth";
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

