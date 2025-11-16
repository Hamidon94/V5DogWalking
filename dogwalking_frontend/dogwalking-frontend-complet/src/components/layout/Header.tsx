import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, Heart, HelpCircle } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/dogwalking-logo.png" 
              alt="DogWalking" 
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/search"
              className="flex items-center space-x-1 text-gray-700 hover:text-dogwalking-green transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Rechercher</span>
            </Link>
            
            <Link
              to="/become-sitter"
              className="flex items-center space-x-1 text-gray-700 hover:text-dogwalking-green transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span>Devenir Promeneur</span>
            </Link>
            
            <Link
              to="/priority"
              className="text-gray-700 hover:text-dogwalking-green transition-colors"
            >
              Tarifs
            </Link>
            
            <Link
              to="/services"
              className="text-gray-700 hover:text-dogwalking-green transition-colors"
            >
              Services
            </Link>
            
            <Link
              to="/blog"
              className="text-gray-700 hover:text-dogwalking-green transition-colors"
            >
              Blog
            </Link>
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/help">
              <Button variant="ghost" size="sm" className="text-gray-600">
                <HelpCircle className="w-4 h-4 mr-1" />
                Aide
              </Button>
            </Link>

            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-gray-700">
                Se connecter
              </Button>
            </Link>

            <Link to="/signup">
              <Button className="dogwalking-button-primary">
                S'inscrire
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                to="/search"
                className="flex items-center space-x-2 text-gray-700 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Search className="w-4 h-4" />
                <span>Rechercher des promeneur certifiés</span>
              </Link>
              
              <Link
                to="/become-sitter"
                className="flex items-center space-x-2 text-gray-700 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart className="w-4 h-4" />
                <span>Devenir promeneur certifié</span>
              </Link>
              
              <Link
                to="/services"
                className="text-gray-700 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Nos services
              </Link>

              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Se connecter
                  </Button>
                </Link>
                
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="dogwalking-button-primary w-full">
                    S'inscrire
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
