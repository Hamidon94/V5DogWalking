import { Link } from "react-router-dom";
import { Home, Heart, MapPin, Users, Clock } from "lucide-react";
import dogWalkingImage from "@/assets/dog-walking.jpg";
import dogBoardingImage from "@/assets/dog-boarding.jpg";

const ServicesSection = () => {
  const services = [
    {
      id: "boarding",
      title: "Hébergement",
      description: "Vos animaux passent la nuit chez votre promeneur certifié. Ils seront traités comme des membres de la famille dans un environnement confortable.",
      icon: <Home className="w-8 h-8" />,
      image: dogBoardingImage,
      link: "/services/boarding"
    },
    {
      id: "house-sitting",
      title: "Garde à domicile",
      description: "Votre promeneur certifié s'occupe de vos animaux et de votre maison. Vos animaux recevront toute l'attention dont ils ont besoin dans le confort de leur foyer.",
      icon: <Heart className="w-8 h-8" />,
      image: dogBoardingImage,
      link: "/services/house-sitting"
    },
    {
      id: "dog-walking",
      title: "Promenade de chien",
      description: "Votre chien fait une promenade dans votre quartier. Parfait pour les journées chargées et les chiens ayant de l'énergie supplémentaire à brûler.",
      icon: <MapPin className="w-8 h-8" />,
      image: dogWalkingImage,
      link: "/services/dog-walking"
    },
    {
      id: "doggy-daycare",
      title: "Garderie pour chien",
      description: "Votre chien passe la journée chez votre promeneur certifié. Ils joueront et socialiseront dans un environnement sûr et supervisé.",
      icon: <Users className="w-8 h-8" />,
      image: dogBoardingImage,
      link: "/services/doggy-daycare"
    },
    {
      id: "drop-in-visits",
      title: "Visites à domicile",
      description: "Des visites courtes chez vous pour nourrir, promener et jouer avec vos animaux. Parfait pour les animaux qui préfèrent rester à la maison.",
      icon: <Clock className="w-8 h-8" />,
      image: dogWalkingImage,
      link: "/services/drop-in-visits"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Services pour tous les chiens et chats
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des soins personnalisés pour votre animal, une tranquillité d'esprit pour vous
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link key={service.id} to={service.link} className="group">
              <div className="dogwalking-card p-0 overflow-hidden">
                {/* Image */}
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-dogwalking-green">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {service.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mt-4 text-dogwalking-green font-semibold group-hover:text-dogwalking-green-dark transition-colors">
                    En savoir plus →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Link to="/services">
            <button className="dogwalking-button-primary px-8 py-4 text-lg">
              Voir tous les services
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;