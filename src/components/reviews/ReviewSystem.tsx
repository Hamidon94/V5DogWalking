import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Camera, X } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface Review {
  id: string;
  bookingId: string;
  rating: number;
  comment: string;
  photos: string[];
  authorName: string;
  authorType: 'owner' | 'walker';
  targetName: string;
  targetType: 'owner' | 'walker';
  timestamp: number;
}

interface ReviewSystemProps {
  bookingId: string;
  authorName: string;
  authorType: 'owner' | 'walker';
  targetName: string;
  targetType: 'owner' | 'walker';
  onReviewSubmitted?: () => void;
}

export const ReviewSystem: React.FC<ReviewSystemProps> = ({
  bookingId,
  authorName,
  authorType,
  targetName,
  targetType,
  onReviewSubmitted
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (photos.length + files.length > 5) {
      toast({
        title: "Limite atteinte",
        description: "Vous pouvez ajouter maximum 5 photos",
        variant: "destructive",
      });
      return;
    }

    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Fichier trop volumineux",
          description: `${file.name} dépasse 5 Mo`,
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPhotos(prev => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast({
        title: "Note requise",
        description: "Veuillez attribuer une note avant de soumettre",
        variant: "destructive",
      });
      return;
    }

    if (comment.trim().length < 10) {
      toast({
        title: "Commentaire trop court",
        description: "Veuillez écrire au moins 10 caractères",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const review: Review = {
        id: Date.now().toString(),
        bookingId,
        rating,
        comment: comment.trim(),
        photos,
        authorName,
        authorType,
        targetName,
        targetType,
        timestamp: Date.now()
      };

      // Sauvegarder l'avis dans le localStorage
      const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
      reviews.push(review);
      localStorage.setItem('reviews', JSON.stringify(reviews));

      // Mettre à jour les statistiques du promeneur/propriétaire
      updateTargetStats(review);

      toast({
        title: "Avis publié",
        description: "Merci pour votre retour ! Votre avis a été publié avec succès.",
      });

      // Réinitialiser le formulaire
      setRating(0);
      setComment('');
      setPhotos([]);

      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la publication de l'avis",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateTargetStats = (review: Review) => {
    // Mettre à jour les statistiques de la personne évaluée
    const statsKey = `stats_${targetType}_${targetName}`;
    const stats = JSON.parse(localStorage.getItem(statsKey) || '{"totalReviews": 0, "averageRating": 0, "totalRating": 0}');
    
    stats.totalReviews += 1;
    stats.totalRating += review.rating;
    stats.averageRating = (stats.totalRating / stats.totalReviews).toFixed(1);
    
    localStorage.setItem(statsKey, JSON.stringify(stats));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Laisser un avis</CardTitle>
        <p className="text-sm text-muted-foreground">
          Partagez votre expérience avec {targetName}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Notation par étoiles */}
          <div className="space-y-2">
            <Label>Votre note *</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoverRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-muted-foreground">
                {rating === 1 && "Très insatisfait"}
                {rating === 2 && "Insatisfait"}
                {rating === 3 && "Moyen"}
                {rating === 4 && "Satisfait"}
                {rating === 5 && "Très satisfait"}
              </p>
            )}
          </div>

          {/* Commentaire */}
          <div className="space-y-2">
            <Label htmlFor="comment">Votre commentaire *</Label>
            <Textarea
              id="comment"
              placeholder="Partagez votre expérience en détail..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              required
              minLength={10}
            />
            <p className="text-xs text-muted-foreground">
              Minimum 10 caractères ({comment.length}/10)
            </p>
          </div>

          {/* Photos */}
          <div className="space-y-2">
            <Label>Ajouter des photos (optionnel)</Label>
            <div className="space-y-3">
              {photos.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {photos.length < 5 && (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => document.getElementById('photo-upload')?.click()}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Ajouter des photos ({photos.length}/5)
                    </Button>
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Maximum 5 photos, 5 Mo chacune
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Bouton de soumission */}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || rating === 0 || comment.trim().length < 10}
          >
            {isSubmitting ? "Publication..." : "Publier l'avis"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// Composant pour afficher les avis existants
export const ReviewsList: React.FC<{ targetName: string; targetType: 'owner' | 'walker' }> = ({
  targetName,
  targetType
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Charger les avis depuis le localStorage
    const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    const filteredReviews = allReviews.filter(
      (r: Review) => r.targetName === targetName && r.targetType === targetType
    );
    setReviews(filteredReviews.sort((a: Review, b: Review) => b.timestamp - a.timestamp));
  }, [targetName, targetType]);

  if (reviews.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Aucun avis pour le moment</p>
        </CardContent>
      </Card>
    );
  }

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="space-y-4">
      {/* Statistiques globales */}
      <Card>
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">{averageRating}</div>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.round(parseFloat(averageRating))
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{reviews.length}</div>
              <div className="text-sm text-muted-foreground">avis</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des avis */}
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarFallback>
                  {review.authorName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-medium">{review.authorName}</div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-3 w-3 ${
                            star <= review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(review.timestamp).toLocaleDateString('fr-FR')}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{review.comment}</p>
                {review.photos.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {review.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-20 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

