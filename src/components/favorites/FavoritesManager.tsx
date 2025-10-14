import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface Walker {
  id: string;
  name: string;
  photo?: string;
  rating: number;
  location: string;
  price: number;
}

interface FavoritesManagerProps {
  walkerId: string;
  walkerName: string;
  walkerPhoto?: string;
  walkerRating?: number;
  walkerLocation?: string;
  walkerPrice?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const FavoritesManager: React.FC<FavoritesManagerProps> = ({
  walkerId,
  walkerName,
  walkerPhoto,
  walkerRating = 0,
  walkerLocation = '',
  walkerPrice = 0,
  size = 'md',
  showLabel = false
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Charger les favoris depuis le localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.some((fav: Walker) => fav.id === walkerId));
  }, [walkerId]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      // Retirer des favoris
      const updatedFavorites = favorites.filter((fav: Walker) => fav.id !== walkerId);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
      
      toast({
        title: "Retiré des favoris",
        description: `${walkerName} a été retiré de vos promeneurs favoris`,
      });
    } else {
      // Ajouter aux favoris
      const newFavorite: Walker = {
        id: walkerId,
        name: walkerName,
        photo: walkerPhoto,
        rating: walkerRating,
        location: walkerLocation,
        price: walkerPrice
      };
      
      favorites.push(newFavorite);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
      
      // Animation
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
      
      toast({
        title: "Ajouté aux favoris",
        description: `${walkerName} a été ajouté à vos promeneurs favoris`,
      });
    }
  };

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const buttonSizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  return (
    <Button
      variant={isFavorite ? "default" : "outline"}
      size="icon"
      onClick={toggleFavorite}
      className={`${buttonSizeClasses[size]} transition-all duration-300 ${
        isAnimating ? 'scale-125' : ''
      } ${isFavorite ? 'bg-red-500 hover:bg-red-600' : 'hover:bg-red-50'}`}
      title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      <Heart
        className={`${sizeClasses[size]} transition-all ${
          isFavorite ? 'fill-white text-white' : 'text-gray-600'
        } ${isAnimating ? 'animate-ping' : ''}`}
      />
      {showLabel && (
        <span className="ml-2 text-sm">
          {isFavorite ? 'Favori' : 'Ajouter'}
        </span>
      )}
    </Button>
  );
};

// Composant pour afficher la liste des favoris
export const FavoritesList: React.FC = () => {
  const [favorites, setFavorites] = useState<Walker[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  };

  const removeFavorite = (walkerId: string) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== walkerId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
    
    toast({
      title: "Retiré des favoris",
      description: "Le promeneur a été retiré de vos favoris",
    });
  };

  if (favorites.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-semibold mb-2">Aucun favori</h3>
          <p className="text-muted-foreground">
            Ajoutez des promeneurs à vos favoris pour les retrouver facilement
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {favorites.map((walker) => (
        <Card key={walker.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                {walker.photo ? (
                  <img
                    src={walker.photo}
                    alt={walker.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-primary">
                    {walker.name.charAt(0)}
                  </span>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold truncate">{walker.name}</h3>
                    {walker.location && (
                      <p className="text-sm text-muted-foreground truncate">
                        {walker.location}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFavorite(walker.id)}
                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  {walker.rating > 0 && (
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-medium">{walker.rating.toFixed(1)}</span>
                    </div>
                  )}
                  {walker.price > 0 && (
                    <span className="text-sm font-semibold text-primary">
                      {walker.price}€/h
                    </span>
                  )}
                </div>
                
                <Button
                  className="w-full mt-3"
                  size="sm"
                  onClick={() => {
                    // Rediriger vers la page de réservation avec ce promeneur
                    window.location.href = `/booking?walker=${walker.id}`;
                  }}
                >
                  Réserver
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

