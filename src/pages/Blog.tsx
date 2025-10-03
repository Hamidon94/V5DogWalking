import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  User, 
  Search, 
  Heart,
  Dog,
  Stethoscope,
  BookOpen,
  TrendingUp,
  CalendarDays,
  Tag
} from "lucide-react";

const Blog = () => {
  const featuredArticle = {
    id: 1,
    title: "Les 10 règles d'or pour une promenade réussie avec votre chien",
    excerpt: "Découvrez les conseils essentiels de nos experts pour transformer chaque sortie en moment de bonheur partagé avec votre compagnon à quatre pattes.",
    author: "Dr. Marie Dubois",
    date: "15 septembre 2025",
    category: "Conseils",
    readTime: "5 min"
  };

  const articles = [
    {
      id: 2,
      title: "Comment choisir le bon promeneur pour votre chien ?",
      excerpt: "Les critères essentiels à considérer pour trouver le promeneur idéal qui saura prendre soin de votre animal.",
      author: "Sophie Martin",
      date: "12 septembre 2025",
      category: "Guide",
      readTime: "4 min"
    },
    {
      id: 3,
      title: "L'importance de la socialisation chez le chien",
      excerpt: "Pourquoi et comment bien socialiser votre chien pour son équilibre et son bien-être.",
      author: "Dr. Pierre Leroy",
      date: "10 septembre 2025",
      category: "Santé",
      readTime: "6 min"
    },
    {
      id: 4,
      title: "Préparer son chien aux promenades urbaines",
      excerpt: "Conseils pratiques pour habituer votre chien à l'environnement urbain en toute sécurité.",
      author: "Julie Moreau",
      date: "8 septembre 2025",
      category: "Conseils",
      readTime: "3 min"
    },
    {
      id: 5,
      title: "Les bienfaits de l'exercice régulier pour votre animal",
      excerpt: "Découvrez pourquoi l'activité physique est cruciale pour la santé physique et mentale de votre chien.",
      author: "Dr. Marie Dubois",
      date: "5 septembre 2025",
      category: "Santé",
      readTime: "5 min"
    },
    {
      id: 6,
      title: "Que faire en cas d'urgence pendant une promenade ?",
      excerpt: "Guide pratique des premiers secours et des réflexes à avoir en cas d'incident lors d'une sortie.",
      author: "Dr. Pierre Leroy",
      date: "3 septembre 2025",
      category: "Urgences",
      readTime: "7 min"
    }
  ];

  const categories = [
    { name: "Tous", count: 25, active: true },
    { name: "Conseils", count: 12, active: false },
    { name: "Santé", count: 8, active: false },
    { name: "Guide", count: 5, active: false }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Conseils":
        return <BookOpen className="h-4 w-4" />;
      case "Santé":
        return <Stethoscope className="h-4 w-4" />;
      case "Guide":
        return <Dog className="h-4 w-4" />;
      case "Urgences":
        return <Heart className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Conseils":
        return "bg-blue-100 text-blue-800";
      case "Santé":
        return "bg-green-100 text-green-800";
      case "Guide":
        return "bg-purple-100 text-purple-800";
      case "Urgences":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-orange-50 to-yellow-50 pt-8">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Blog DogWalking
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conseils d'experts, guides pratiques et actualités pour le bien-être de votre compagnon. 
              Découvrez tout ce qu'il faut savoir sur les soins et l'éducation canine.
            </p>
          </div>

          {/* Barre de recherche et filtres */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Rechercher un article..." 
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={category.active ? "default" : "outline"}
                  size="sm"
                  className="flex items-center gap-1"
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>

          {/* Article en vedette */}
          <Card className="mb-12 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="h-64 md:h-full bg-gradient-to-r from-blue-400 to-green-400 flex items-center justify-center">
                  <Dog className="h-24 w-24 text-white opacity-50" />
                </div>
              </div>
              <div className="md:w-1/2 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={getCategoryColor(featuredArticle.category)}>
                    {getCategoryIcon(featuredArticle.category)}
                    <span className="ml-1">{featuredArticle.category}</span>
                  </Badge>
                  <Badge variant="secondary">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Article vedette
                  </Badge>
                </div>
                <h2 className="text-2xl font-bold mb-3">{featuredArticle.title}</h2>
                <p className="text-gray-600 mb-4">{featuredArticle.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {featuredArticle.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {featuredArticle.date}
                  </div>
                  <span>{featuredArticle.readTime} de lecture</span>
                </div>
                <Button>Lire l'article</Button>
              </div>
            </div>
          </Card>

          {/* Grille d'articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {articles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="h-48 bg-gradient-to-r from-blue-400 to-green-400 flex items-center justify-center">
                  <Dog className="h-16 w-16 text-white opacity-50" />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getCategoryColor(article.category)} variant="secondary">
                      {getCategoryIcon(article.category)}
                      <span className="ml-1">{article.category}</span>
                    </Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {article.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {article.date}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{article.readTime} de lecture</span>
                    <Button variant="ghost" size="sm">Lire →</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter */}
          <Card className="bg-gradient-to-r from-primary to-blue-600 text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Restez informé</CardTitle>
              <CardDescription className="text-blue-100">
                Recevez nos derniers articles et conseils directement dans votre boîte mail
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  placeholder="Votre adresse email" 
                  className="bg-white text-gray-900"
                />
                <Button variant="secondary">
                  S'abonner
                </Button>
              </div>
              <p className="text-center text-sm text-blue-100 mt-4">
                Pas de spam, désinscription possible à tout moment
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default Blog;


