import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MessageCircle, Upload, User, Calendar } from "lucide-react";

interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  photos?: string[];
  verified: boolean;
}

interface ReviewSystemProps {
  promeneurId: string;
  promeneurName: string;
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
  onSubmitReview?: (review: Omit<Review, "id" | "date">) => void;
}

const ReviewSystem = ({
  promeneurId,
  promeneurName,
  averageRating,
  totalReviews,
  reviews,
  onSubmitReview,
}: ReviewSystemProps) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    rating: 5,
    title: "",
    comment: "",
    photos: [] as string[],
  });

  const handleSubmitReview = () => {
    if (!formData.title || !formData.comment) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    const newReview: Omit<Review, "id" | "date"> = {
      author: "Vous",
      rating: formData.rating,
      title: formData.title,
      comment: formData.comment,
      photos: formData.photos,
      verified: true,
    };

    onSubmitReview?.(newReview);

    // Réinitialiser le formulaire
    setFormData({
      rating: 5,
      title: "",
      comment: "",
      photos: [],
    });
    setShowForm(false);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const ratingDistribution = [
    { stars: 5, count: Math.floor(totalReviews * 0.7) },
    { stars: 4, count: Math.floor(totalReviews * 0.2) },
    { stars: 3, count: Math.floor(totalReviews * 0.07) },
    { stars: 2, count: Math.floor(totalReviews * 0.02) },
    { stars: 1, count: Math.floor(totalReviews * 0.01) },
  ];

  return (
    <div className="space-y-6">
      {/* Résumé des avis */}
      <Card>
        <CardHeader>
          <CardTitle>Avis et Évaluations</CardTitle>
          <CardDescription>{totalReviews} avis vérifiés</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Note globale */}
          <div className="flex items-start gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
              <div className="flex gap-1 mt-2 justify-center">
                {renderStars(Math.round(averageRating))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">{totalReviews} avis</p>
            </div>

            {/* Distribution des notes */}
            <div className="flex-1 space-y-2">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-2">
                  <span className="text-sm w-12">{item.stars} ⭐</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400"
                      style={{
                        width: `${(item.count / totalReviews) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bouton pour ajouter un avis */}
          {!showForm && (
            <Button onClick={() => setShowForm(true)} className="w-full">
              <MessageCircle className="w-4 h-4 mr-2" />
              Laisser un Avis
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Formulaire d'ajout d'avis */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Votre Avis sur {promeneurName}</CardTitle>
            <CardDescription>Aidez d'autres propriétaires à faire leur choix</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Note */}
            <div>
              <label className="block text-sm font-medium mb-2">Votre note *</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= formData.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Titre */}
            <div>
              <label className="block text-sm font-medium mb-2">Titre de l'avis *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Excellent service, très recommandé"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Commentaire */}
            <div>
              <label className="block text-sm font-medium mb-2">Votre avis *</label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                placeholder="Décrivez votre expérience avec ce promeneur..."
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={4}
              />
            </div>

            {/* Photos */}
            <div>
              <label className="block text-sm font-medium mb-2">Photos (optionnel)</label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Cliquez pour ajouter des photos</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button onClick={handleSubmitReview} className="flex-1">
                Publier l'Avis
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowForm(false)}
                className="flex-1"
              >
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Liste des avis */}
      <div className="space-y-4">
        <h3 className="font-semibold">Avis Récents</h3>
        {reviews.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              Pas encore d'avis. Soyez le premier à partager votre expérience !
            </CardContent>
          </Card>
        ) : (
          reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-6">
                {/* En-tête de l'avis */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-semibold">{review.author}</p>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs mt-1">
                            ✓ Achat Vérifié
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {renderStars(review.rating)}
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {review.date}
                    </p>
                  </div>
                </div>

                {/* Titre et contenu */}
                <h4 className="font-semibold mb-2">{review.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{review.comment}</p>

                {/* Photos */}
                {review.photos && review.photos.length > 0 && (
                  <div className="flex gap-2 mb-3">
                    {review.photos.map((photo, idx) => (
                      <img
                        key={idx}
                        src={photo}
                        alt={`Photo ${idx + 1}`}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSystem;

