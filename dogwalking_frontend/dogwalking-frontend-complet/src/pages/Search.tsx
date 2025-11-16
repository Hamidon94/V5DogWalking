import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, MapPin, Heart, Filter, Grid, List } from "lucide-react";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState({
    serviceType: searchParams.get("serviceType") || "boarding",
    petType: searchParams.get("petType") || "dog",
    address: searchParams.get("address") || "",
    startDate: searchParams.get("startDate") || "",
    endDate: searchParams.get("endDate") || "",
    onlyStarSitters: false,
    hasFencedYard: false,
    hasHouse: false,
    noOtherPets: false,
  });

  // Mock data for demonstration
  const mockPromeneurs = [
    {
      id: 1,
      name: "Marie L.",
      location: "Paris 15ème",
      rating: 4.9,
      reviewCount: 127,
      price: 35,
      isStarSitter: true,
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=150&h=150&fit=crop&crop=face",
      about: "Passionnée d'animaux depuis toujours, j'ai grandi avec des chiens et des chats. Je traite tous les animaux comme les miens !",
      services: ["Hébergement", "Garde à domicile", "Promenade"],
      responseTime: "~2h",
      yearsExperience: 5,
      features: ["Jardin clôturé", "Première rencontre gratuite", "Photos quotidiennes"]
    },
    {
      id: 2,
      name: "Pierre M.",
      location: "Lyon 3ème", 
      rating: 4.8,
      reviewCount: 89,
      price: 28,
      isStarSitter: false,
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      about: "Retraité actif, je propose des services de garde pour vos compagnons. Grande expérience avec les chiens de toutes tailles.",
      services: ["Hébergement", "Promenade", "Visites"],
      responseTime: "~1h",
      yearsExperience: 8,
      features: ["Disponible en semaine", "Expérience avec seniors", "Proche parc"]
    },
    {
      id: 3,
      name: "Sophie D.",
      location: "Marseille 8ème",
      rating: 5.0,
      reviewCount: 234,
      price: 42,
      isStarSitter: true,
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      about: "Vétérinaire à temps partiel, j'offre des soins professionnels dans un cadre familial chaleureux.",
      services: ["Hébergement", "Garde à domicile", "Garderie", "Soins médicaux"],
      responseTime: "~30min",
      yearsExperience: 12,
      features: ["Formation vétérinaire", "Soins médicaux", "Urgences 24h/24"]
    }
  ];

  const serviceTypes = [
    { value: "boarding", label: "Hébergement • chez le promeneur certifié" },
    { value: "house-sitting", label: "Garde à domicile • chez vous" },
    { value: "drop-in-visits", label: "Visites à domicile • visites chez vous" },
    { value: "doggy-daycare", label: "Garderie • chez le promeneur certifié" },
    { value: "dog-walking", label: "Promenade • dans votre quartier" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="dogwalking-card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Pet Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pour mon :
              </label>
              <select 
                value={filters.petType}
                onChange={(e) => setFilters(prev => ({ ...prev, petType: e.target.value }))}
                className="dogwalking-input w-full"
              >
                <option value="dog">Chien</option>
                <option value="cat">Chat</option>
              </select>
            </div>

            {/* Service Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service :
              </label>
              <select 
                value={filters.serviceType}
                onChange={(e) => setFilters(prev => ({ ...prev, serviceType: e.target.value }))}
                className="dogwalking-input w-full"
              >
                {serviceTypes.map(service => (
                  <option key={service.value} value={service.value}>
                    {service.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse :
              </label>
              <Input
                placeholder="Votre adresse"
                value={filters.address}
                onChange={(e) => setFilters(prev => ({ ...prev, address: e.target.value }))}
                className="dogwalking-input"
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Début :
              </label>
              <Input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
                className="dogwalking-input"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fin :
              </label>
              <Input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
                className="dogwalking-input"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <Button className="dogwalking-button-secondary px-8">
              Rechercher
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="dogwalking-card p-6 sticky top-8">
              <div className="flex items-center space-x-2 mb-6">
                <Filter className="w-5 h-5 text-dogwalking-green" />
                <h3 className="text-lg font-semibold text-gray-900">Filtres</h3>
              </div>

              <div className="space-y-6">
                {/* Promeneurs Star */}
                <div>
                  <label className="flex items-center space-x-3">
                    <Checkbox 
                      checked={filters.onlyStarSitters}
                      onCheckedChange={(checked) => 
                        setFilters(prev => ({ ...prev, onlyStarSitters: checked as boolean }))
                      }
                    />
                    <span className="text-sm">Seulement les Promeneurs Star</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1 ml-6">
                    Promeneur certifiés d'élite avec les meilleures notes
                  </p>
                </div>

                {/* Housing Conditions */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Conditions de logement</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3">
                      <Checkbox 
                        checked={filters.hasHouse}
                        onCheckedChange={(checked) => 
                          setFilters(prev => ({ ...prev, hasHouse: checked as boolean }))
                        }
                      />
                      <span className="text-sm">A une maison (pas d'appartement)</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <Checkbox 
                        checked={filters.hasFencedYard}
                        onCheckedChange={(checked) => 
                          setFilters(prev => ({ ...prev, hasFencedYard: checked as boolean }))
                        }
                      />
                      <span className="text-sm">Jardin clôturé</span>
                    </label>
                  </div>
                </div>

                {/* Pets in Home */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Animaux à domicile</h4>
                  <label className="flex items-center space-x-3">
                    <Checkbox 
                      checked={filters.noOtherPets}
                      onCheckedChange={(checked) => 
                        setFilters(prev => ({ ...prev, noOtherPets: checked as boolean }))
                      }
                    />
                    <span className="text-sm">N'a pas d'autres animaux</span>
                  </label>
                </div>

                {/* Reset Filters */}
                <Button variant="outline" className="w-full" size="sm">
                  Réinitialiser les filtres
                </Button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Promeneur certifiés près de vous
                </h2>
                <p className="text-gray-600">
                  {mockPromeneurs.length} promeneur certifiés trouvés
                </p>
              </div>

              {/* View Toggle */}
              <div className="flex space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Sitters Grid */}
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
              {mockPromeneurs.map((promeneur) => (
                <div key={promeneur.id} className="dogwalking-card p-6">
                  {/* Header */}
                  <div className="flex items-start space-x-4 mb-4">
                    <img 
                      src={promeneur.profileImage} 
                      alt={promeneur.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {promeneur.name}
                        </h3>
                        {promeneur.isStarSitter && (
                          <span className="bg-dogwalking-orange text-white text-xs px-2 py-1 rounded-full font-medium">
                            STAR
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{promeneur.location}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{promeneur.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          ({promeneur.reviewCount} avis)
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-dogwalking-green">
                        {promeneur.price}€
                      </div>
                      <div className="text-sm text-gray-500">par nuit</div>
                    </div>
                  </div>

                  {/* About */}
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {promeneur.about}
                  </p>

                  {/* Services */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {promeneur.services.map((service, index) => (
                      <span 
                        key={index}
                        className="bg-dogwalking-green/10 text-dogwalking-green text-xs px-2 py-1 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="space-y-1 mb-4">
                    {promeneur.features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-dogwalking-green rounded-full"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <span>{promeneur.yearsExperience} ans d'expérience</span>
                    <span>Répond en {promeneur.responseTime}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <Button className="dogwalking-button-primary flex-1">
                      Contacter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" className="px-8">
                Voir plus de promeneur certifiés
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Search;