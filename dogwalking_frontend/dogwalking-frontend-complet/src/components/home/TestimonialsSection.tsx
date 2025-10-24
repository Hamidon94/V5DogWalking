import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah M.",
      location: "Paris, France",
      rating: 5,
      text: "DogWalking a changé ma vie ! Je peux maintenant voyager l'esprit tranquille en sachant que mon chien Max est entre de bonnes mains. Les promeneur certifiés sont incroyables !",
      petName: "Max",
      petType: "Golden Retriever"
    },
    {
      id: 2,
      name: "Pierre L.",
      location: "Lyon, France",
      rating: 5,
      text: "Excellent service ! La communication avec le promeneur certifié était parfaite, et j'ai reçu des photos de Luna tous les jours. Je recommande vivement !",
      petName: "Luna",
      petType: "Chat Persan"
    },
    {
      id: 3,
      name: "Marie C.",
      location: "Marseille, France",
      rating: 5,
      text: "Grâce à DogWalking, j'ai trouvé le promeneur parfait pour mon bouledogue. Charlie adore ses promenades quotidiennes et revient toujours fatigué et heureux !",
      petName: "Charlie",
      petType: "Bouledogue Français"
    },
    {
      id: 4,
      name: "Antoine R.",
      location: "Toulouse, France",
      rating: 5,
      text: "Service exceptionnel ! Le promeneur certifié a pris soin de mes deux chats comme s'ils étaient les siens. Interface facile à utiliser et réservation simple.",
      petName: "Milo & Simba",
      petType: "Chats domestiques"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Rejoignez des milliers de propriétaires d'animaux satisfaits qui font confiance à DogWalking
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="dogwalking-card p-6">
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-dogwalking-green/30" />
              </div>

              {/* Stars */}
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <Star key={index} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-dogwalking-green">
                      Propriétaire de {testimonial.petName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {testimonial.petType}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trustpilot Section */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-4 p-6 bg-green-50 rounded-xl">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 fill-green-500 text-green-500" />
              ))}
            </div>
            <div className="text-left">
              <p className="text-lg font-semibold text-gray-900">
                Plus de 24,000+ avis sur
              </p>
              <p className="text-2xl font-bold text-green-600">
                Trustpilot
              </p>
            </div>
          </div>

          <p className="text-gray-600 mt-4">
            Rejoignez la plus grande communauté de propriétaires d'animaux satisfaits
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;