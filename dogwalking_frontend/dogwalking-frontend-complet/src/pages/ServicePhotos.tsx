import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, Send, Trash2, Eye } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface ServicePhoto {
  id: string;
  url: string;
  timestamp: string;
  caption: string;
  sent: boolean;
}

interface ActiveService {
  id: string;
  petName: string;
  petType: string;
  ownerName: string;
  startTime: string;
  location: string;
  status: "in_progress" | "completed";
}

const ServicePhotos = () => {
  const [activeService] = useState<ActiveService>({
    id: "SRV001",
    petName: "Max",
    petType: "Golden Retriever",
    ownerName: "Jean Dupont",
    startTime: "14:00",
    location: "Parc de la Tête d'Or, Lyon",
    status: "in_progress",
  });

  const [photos, setPhotos] = useState<ServicePhoto[]>([
    {
      id: "PHOTO001",
      url: "🐕",
      timestamp: "14:15",
      caption: "Max au parc, très heureux !",
      sent: true,
    },
    {
      id: "PHOTO002",
      url: "🐕‍🦺",
      timestamp: "14:35",
      caption: "En train de jouer avec d'autres chiens",
      sent: true,
    },
    {
      id: "PHOTO003",
      url: "🏃",
      timestamp: "14:50",
      caption: "Moment de repos avant de rentrer",
      sent: false,
    },
  ]);

  const [newCaption, setNewCaption] = useState("");
  const [showCamera, setShowCamera] = useState(false);

  const handleAddPhoto = () => {
    if (!newCaption.trim()) return;

    const newPhoto: ServicePhoto = {
      id: `PHOTO${Date.now()}`,
      url: "📸",
      timestamp: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      caption: newCaption,
      sent: false,
    };

    setPhotos([...photos, newPhoto]);
    setNewCaption("");
  };

  const handleSendPhoto = (photoId: string) => {
    setPhotos(
      photos.map((photo) =>
        photo.id === photoId ? { ...photo, sent: true } : photo
      )
    );
  };

  const handleDeletePhoto = (photoId: string) => {
    setPhotos(photos.filter((photo) => photo.id !== photoId));
  };

  const unsentPhotos = photos.filter((p) => !p.sent);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Photos du Service</h1>
          <p className="text-muted-foreground">
            Capturez et partagez des photos du service en cours
          </p>
        </div>

        {/* Service actif */}
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-green-900">{activeService.petName}</CardTitle>
                <CardDescription className="text-green-700">
                  Service en cours depuis {activeService.startTime}
                </CardDescription>
              </div>
              <Badge className="bg-green-600">En cours</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">
              <strong>Type :</strong> {activeService.petType}
            </p>
            <p className="text-sm">
              <strong>Propriétaire :</strong> {activeService.ownerName}
            </p>
            <p className="text-sm">
              <strong>Localisation :</strong> {activeService.location}
            </p>
          </CardContent>
        </Card>

        {/* Zone de capture */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ajouter une Photo</CardTitle>
            <CardDescription>
              Prenez une photo ou téléchargez une image depuis votre galerie
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Button
                onClick={() => setShowCamera(!showCamera)}
                className="flex-1"
              >
                <Camera className="w-4 h-4 mr-2" />
                Prendre une Photo
              </Button>
              <Button variant="outline" className="flex-1">
                <Upload className="w-4 h-4 mr-2" />
                Télécharger
              </Button>
            </div>

            {showCamera && (
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <p className="text-muted-foreground mb-4">
                  📷 Caméra activée - Prenez une photo
                </p>
                <div className="bg-gray-300 rounded-lg h-64 flex items-center justify-center mb-4">
                  <span className="text-6xl">📸</span>
                </div>
                <Button className="w-full">Capturer la Photo</Button>
              </div>
            )}

            <div className="space-y-3">
              <label className="block text-sm font-medium">
                Description (optionnel)
              </label>
              <textarea
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
                placeholder="Décrivez ce que vous avez photographié..."
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                rows={3}
              />
              <Button
                onClick={handleAddPhoto}
                disabled={!newCaption.trim()}
                className="w-full"
              >
                Ajouter la Photo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Galerie des photos */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Galerie des Photos</CardTitle>
            <CardDescription>
              {photos.length} photo(s) capturée(s) • {unsentPhotos.length} à envoyer
            </CardDescription>
          </CardHeader>
          <CardContent>
            {photos.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Aucune photo capturée pour le moment
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="bg-gray-100 h-48 flex items-center justify-center text-6xl">
                      {photo.url}
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <p className="text-sm font-semibold">{photo.caption}</p>
                        <p className="text-xs text-muted-foreground">
                          {photo.timestamp}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        {photo.sent ? (
                          <Badge className="bg-green-100 text-green-800 w-full justify-center">
                            ✓ Envoyée
                          </Badge>
                        ) : (
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => handleSendPhoto(photo.id)}
                          >
                            <Send className="w-3 h-3 mr-1" />
                            Envoyer
                          </Button>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-3 h-3 mr-1" />
                          Aperçu
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeletePhoto(photo.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Résumé des photos à envoyer */}
        {unsentPhotos.length > 0 && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-yellow-900">
                Photos à Envoyer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {unsentPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-yellow-200"
                >
                  <div>
                    <p className="text-sm font-semibold">{photo.caption}</p>
                    <p className="text-xs text-muted-foreground">{photo.timestamp}</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleSendPhoto(photo.id)}
                  >
                    <Send className="w-3 h-3 mr-1" />
                    Envoyer
                  </Button>
                </div>
              ))}
              <Button className="w-full">
                Envoyer les {unsentPhotos.length} Photo(s)
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Informations */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Conseils pour les Photos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold mb-2">📸 Bonnes pratiques</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Prenez des photos claires et bien éclairées</li>
                <li>Montrez l'animal en train de s'amuser ou de se reposer</li>
                <li>Incluez des détails de la localisation si pertinent</li>
                <li>Envoyez les photos régulièrement au propriétaire</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-700">
                <strong>💡 Astuce :</strong> Les photos envoyées rassurent les propriétaires et augmentent vos avis positifs !
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default ServicePhotos;

