import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold dogwalking-text-green mb-4">
              🐾 DogWalking
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Le plus grand réseau mondial de promeneur certifiés et promeneurs de chiens 5 étoiles.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-dogwalking-green transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-dogwalking-green transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-dogwalking-green transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-dogwalking-green transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/dog-walking" className="text-gray-600 hover:text-dogwalking-green transition-colors">
                  Promenade de chien
                </Link>
              </li>
              <li>
                <Link to="/services/boarding" className="text-gray-600 hover:text-dogwalking-green transition-colors">
                  Hébergement
                </Link>
              </li>
              <li>
                <Link to="/services/house-sitting" className="text-gray-600 hover:text-dogwalking-green transition-colors">
                  Garde à domicile
                </Link>
              </li>
              <li>
                <Link to="/services/drop-in-visits" className="text-gray-600 hover:text-dogwalking-green transition-colors">
                  Visites à domicile
                </Link>
              </li>
              <li>
                <Link to="/services/doggy-daycare" className="text-gray-600 hover:text-dogwalking-green transition-colors">
                  Garderie pour chien
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-600 hover:text-dogwalking-green transition-colors">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-dogwalking-green transition-colors">
                  Nous contacter
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-gray-600 hover:text-dogwalking-green transition-colors">
                  Sécurité
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Entreprise</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-dogwalking-green transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-dogwalking-green transition-colors">
                  Carrières
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-dogwalking-green transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-dogwalking-green transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2024 DogWalking Clone. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-500 text-sm">Trustpilot</span>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-green-500">★</span>
                ))}
              </div>
              <span className="text-gray-500 text-sm">24,000+ avis</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;