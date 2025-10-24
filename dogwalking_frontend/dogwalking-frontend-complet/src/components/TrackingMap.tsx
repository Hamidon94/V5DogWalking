import React, { useEffect, useState } from 'react';
import { MapPin, Navigation, Clock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TrackingMapProps {
  bookingId: string;
  walkerName: string;
  walkDuration: number;
}

const TrackingMap: React.FC<TrackingMapProps> = ({ bookingId, walkerName, walkDuration }) => {
  const [walkerLocation, setWalkerLocation] = useState({ lat: 0, lng: 0 });
  const [walkStarted, setWalkStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [walkPath, setWalkPath] = useState<Array<{lat: number, lng: number, timestamp: Date}>>([]);

  // Simulation de la localisation GPS du promeneur
  useEffect(() => {
    if (walkStarted) {
      const interval = setInterval(() => {
        // Simulation de mouvement GPS
        setWalkerLocation(prev => ({
          lat: prev.lat + (Math.random() - 0.5) * 0.001,
          lng: prev.lng + (Math.random() - 0.5) * 0.001
        }));
        
        setElapsedTime(prev => prev + 1);
        
        setWalkPath(prev => [...prev, {
          lat: walkerLocation.lat,
          lng: walkerLocation.lng,
          timestamp: new Date()
        }]);
      }, 5000); // Mise à jour toutes les 5 secondes

      return () => clearInterval(interval);
    }
  }, [walkStarted, walkerLocation]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5" />
            Suivi en temps réel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Promeneur</p>
              <p className="font-semibold">{walkerName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Durée écoulée</p>
              <p className="font-semibold">{formatTime(elapsedTime)}</p>
            </div>
          </div>
          
          <div className="mt-4 flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Contacter
            </Button>
            <Button 
              size="sm" 
              variant={walkStarted ? "destructive" : "default"}
              onClick={() => setWalkStarted(!walkStarted)}
            >
              {walkStarted ? "Arrêter le suivi" : "Démarrer le suivi"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Map Simulation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Localisation actuelle
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center relative">
            {walkStarted ? (
              <div className="text-center">
                <div className="w-4 h-4 bg-primary rounded-full animate-pulse mb-2 mx-auto"></div>
                <p className="text-sm text-muted-foreground">
                  Position: {walkerLocation.lat.toFixed(6)}, {walkerLocation.lng.toFixed(6)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Dernière mise à jour: {new Date().toLocaleTimeString()}
                </p>
              </div>
            ) : (
              <div className="text-center">
                <MapPin className="w-12 h-12 text-muted-foreground mb-2 mx-auto" />
                <p className="text-muted-foreground">
                  La carte s'affichera quand la promenade commencera
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Walk Statistics */}
      {walkStarted && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Statistiques de la promenade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{walkPath.length}</p>
                <p className="text-sm text-muted-foreground">Points GPS</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">
                  {(walkPath.length * 0.05).toFixed(1)} km
                </p>
                <p className="text-sm text-muted-foreground">Distance estimée</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">
                  {Math.round((walkPath.length * 0.05) / (elapsedTime / 3600))} km/h
                </p>
                <p className="text-sm text-muted-foreground">Vitesse moyenne</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TrackingMap;