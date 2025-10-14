import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Clock, Play, Square, Camera } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface GPSTrackerProps {
  bookingId: string;
  walkerName: string;
  dogName: string;
  isWalker?: boolean;
}

interface Position {
  lat: number;
  lng: number;
  timestamp: number;
}

export const GPSTracker: React.FC<GPSTrackerProps> = ({
  bookingId,
  walkerName,
  dogName,
  isWalker = false
}) => {
  const [isTracking, setIsTracking] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
  const [path, setPath] = useState<Position[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);

  // Simuler le suivi GPS
  useEffect(() => {
    if (!isTracking) return;

    const interval = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const newPos: Position = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              timestamp: Date.now()
            };
            
            setCurrentPosition(newPos);
            setPath(prev => [...prev, newPos]);
            
            // Calculer la distance parcourue
            if (path.length > 0) {
              const lastPos = path[path.length - 1];
              const dist = calculateDistance(lastPos, newPos);
              setDistance(prev => prev + dist);
            }
          },
          (error) => {
            console.error('Erreur de géolocalisation:', error);
          }
        );
      }
    }, 5000); // Mise à jour toutes les 5 secondes

    return () => clearInterval(interval);
  }, [isTracking, path]);

  // Mettre à jour la durée
  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      setDuration(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const calculateDistance = (pos1: Position, pos2: Position): number => {
    // Formule de Haversine pour calculer la distance entre deux points GPS
    const R = 6371; // Rayon de la Terre en km
    const dLat = toRad(pos2.lat - pos1.lat);
    const dLon = toRad(pos2.lng - pos1.lng);
    const lat1 = toRad(pos1.lat);
    const lat2 = toRad(pos2.lat);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c;
    
    return d; // Distance en km
  };

  const toRad = (value: number): number => {
    return value * Math.PI / 180;
  };

  const handleStartTracking = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const initialPos: Position = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            timestamp: Date.now()
          };
          
          setCurrentPosition(initialPos);
          setPath([initialPos]);
          setIsTracking(true);
          setStartTime(Date.now());
          setDistance(0);
          
          toast({
            title: "Suivi GPS activé",
            description: "La promenade a commencé. Le propriétaire peut suivre votre position en temps réel.",
          });

          // Notifier le propriétaire
          notifyOwner('start');
        },
        (error) => {
          toast({
            title: "Erreur de géolocalisation",
            description: "Impossible d'accéder à votre position. Vérifiez les autorisations.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Géolocalisation non supportée",
        description: "Votre navigateur ne supporte pas la géolocalisation.",
        variant: "destructive",
      });
    }
  };

  const handleStopTracking = () => {
    setIsTracking(false);
    
    toast({
      title: "Suivi GPS arrêté",
      description: `Promenade terminée ! Distance parcourue: ${distance.toFixed(2)} km`,
    });

    // Notifier le propriétaire
    notifyOwner('end');

    // Générer le rapport
    generateReport();
  };

  const notifyOwner = (type: 'start' | 'end') => {
    // Envoyer une notification au propriétaire
    const notification = {
      type,
      bookingId,
      walkerName,
      dogName,
      timestamp: Date.now(),
      position: currentPosition
    };

    // Sauvegarder dans le localStorage pour simulation
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications.push(notification);
    localStorage.setItem('notifications', JSON.stringify(notifications));
  };

  const generateReport = () => {
    const report = {
      bookingId,
      walkerName,
      dogName,
      startTime,
      endTime: Date.now(),
      duration,
      distance: distance.toFixed(2),
      path,
      photos: [] // Les photos seront ajoutées séparément
    };

    // Sauvegarder le rapport
    const reports = JSON.parse(localStorage.getItem('walk_reports') || '[]');
    reports.push(report);
    localStorage.setItem('walk_reports', JSON.stringify(reports));
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}min ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}min ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Suivi GPS en temps réel
          </div>
          {isTracking && (
            <Badge variant="default" className="animate-pulse">
              En cours
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Informations de la promenade */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
          <div>
            <div className="text-sm text-muted-foreground">Promeneur</div>
            <div className="font-medium">{walkerName}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Chien</div>
            <div className="font-medium">{dogName}</div>
          </div>
        </div>

        {/* Statistiques en temps réel */}
        {isTracking && (
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-primary/10 rounded-lg">
              <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-sm text-muted-foreground">Durée</div>
              <div className="font-bold">{formatDuration(duration)}</div>
            </div>
            <div className="text-center p-3 bg-primary/10 rounded-lg">
              <Navigation className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-sm text-muted-foreground">Distance</div>
              <div className="font-bold">{distance.toFixed(2)} km</div>
            </div>
            <div className="text-center p-3 bg-primary/10 rounded-lg">
              <MapPin className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-sm text-muted-foreground">Points</div>
              <div className="font-bold">{path.length}</div>
            </div>
          </div>
        )}

        {/* Carte (simulation) */}
        <div className="relative h-64 bg-muted rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {currentPosition ? (
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto mb-2 text-primary animate-bounce" />
                <div className="text-sm font-medium">Position actuelle</div>
                <div className="text-xs text-muted-foreground">
                  {currentPosition.lat.toFixed(6)}, {currentPosition.lng.toFixed(6)}
                </div>
                {isTracking && (
                  <div className="mt-2 text-xs text-primary">
                    Mise à jour en temps réel...
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <div className="text-sm">Carte GPS</div>
                <div className="text-xs">Démarrez le suivi pour voir la position</div>
              </div>
            )}
          </div>
        </div>

        {/* Boutons de contrôle (pour le promeneur uniquement) */}
        {isWalker && (
          <div className="flex gap-2">
            {!isTracking ? (
              <Button
                onClick={handleStartTracking}
                className="flex-1"
                size="lg"
              >
                <Play className="h-4 w-4 mr-2" />
                Démarrer la prise en charge
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleStopTracking}
                  variant="destructive"
                  className="flex-1"
                  size="lg"
                >
                  <Square className="h-4 w-4 mr-2" />
                  Terminer la promenade
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    // Ouvrir l'appareil photo pour prendre une photo
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.capture = 'environment';
                    input.onchange = (e: any) => {
                      const file = e.target.files[0];
                      if (file) {
                        toast({
                          title: "Photo envoyée",
                          description: "La photo a été envoyée au propriétaire",
                        });
                      }
                    };
                    input.click();
                  }}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        )}

        {/* Message pour le propriétaire */}
        {!isWalker && !isTracking && (
          <div className="text-center text-sm text-muted-foreground p-4 bg-muted/30 rounded-lg">
            Le suivi GPS sera activé lorsque le promeneur démarrera la prise en charge
          </div>
        )}
      </CardContent>
    </Card>
  );
};

