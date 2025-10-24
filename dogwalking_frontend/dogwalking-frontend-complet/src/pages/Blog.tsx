import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";

const Blog = () => {
  const articles = [
    {
      id: 1,
      title: "Comment choisir le bon promeneur pour votre chien",
      excerpt: "Découvrez les critères essentiels pour sélectionner un promeneur de confiance qui prendra soin de votre compagnon.",
      author: "Équipe DogWalking",
      date: "15 Mars 2024",
      category: "Conseils",
      image: "/api/placeholder/400/250"
    },
    {
      id: 2,
      title: "Les bienfaits de la promenade quotidienne pour votre chien",
      excerpt: "Explorez les avantages physiques et mentaux d'une routine de promenade régulière pour le bien-être de votre animal.",
      author: "Dr. Marie Dubois",
      date: "12 Mars 2024",
      category: "Santé",
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "Préparer votre chien pour sa première garde à domicile",
      excerpt: "Conseils pratiques pour faciliter l'adaptation de votre chien lors de sa première expérience de garde à domicile.",
      author: "Sophie Martin",
      date: "10 Mars 2024",
      category: "Garde",
      image: "/api/placeholder/400/250"
    },
    {
      id: 4,
      title: "Sécurité et assurance : ce qu'il faut savoir",
      excerpt: "Tout ce que vous devez savoir sur les garanties et assurances DogWalkingProtect pour la sécurité de votre animal.",
      author: "Équipe DogWalking",
      date: "8 Mars 2024",
      category: "Sécurité",
      image: "/api/placeholder/400/250"
    },
    {
      id: 5,
      title: "Les races de chiens et leurs besoins spécifiques",
      excerpt: "Guide complet des différentes races de chiens et de leurs besoins particuliers en matière d'exercice et de soins.",
      author: "Dr. Pierre Leroy",
      date: "5 Mars 2024",
      category: "Éducation",
      image: "/api/placeholder/400/250"
    },
    {
      id: 6,
      title: "Comment devenir un promeneur certifié DogWalking",
      excerpt: "Découvrez les étapes pour rejoindre notre communauté de promeneurs certifiés et commencer votre activité.",
      author: "Équipe DogWalking",
      date: "3 Mars 2024",
      category: "Carrière",
      image: "/api/placeholder/400/250"
    }
  ];

  const categories = ["Tous", "Conseils", "Santé", "Garde", "Sécurité", "Éducation", "Carrière"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Blog <span className="text-dogwalking-blue">DogWalking</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conseils, astuces et informations pour prendre soin de votre compagnon à quatre pattes.
            </p>
          </div>

          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "Tous" ? "default" : "outline"}
                className={category === "Tous" ? "bg-dogwalking-blue hover:bg-dogwalking-blue/90" : ""}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article key={article.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-gray-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-dogwalking-blue/20 to-dogwalking-green/20 flex items-center justify-center">
                    <span className="text-gray-600 font-medium">Image de l'article</span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-dogwalking-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {article.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {article.date}
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full group">
                    Lire l'article
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16">
            <div className="bg-gradient-to-r from-dogwalking-blue to-dogwalking-green rounded-2xl p-8 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Restez informé des dernières actualités
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Recevez nos conseils et astuces directement dans votre boîte mail.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
                />
                <Button className="bg-white text-dogwalking-blue hover:bg-gray-100">
                  S'abonner
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
