import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Calendar, Clock, Euro, X } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  service: string;
  date: string;
  time: string;
  amount: number;
  walkerName: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
}

interface CancellationManagerProps {
  booking: Booking;
  onCancelled?: () => void;
  onModified?: () => void;
}

export const CancellationManager: React.FC<CancellationManagerProps> = ({
  booking,
  onCancelled,
  onModified
}) => {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculer le temps restant avant le rendez-vous
  const getTimeUntilBooking = (): number => {
    const bookingDateTime = new Date(`${booking.date}T${booking.time}`);
    const now = new Date();
    const diffInMs = bookingDateTime.getTime() - now.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    return diffInHours;
  };

  const canCancel = (): boolean => {
    const hoursUntil = getTimeUntilBooking();
    return hoursUntil > 3 && ['pending', 'confirmed'].includes(booking.status);
  };

  const canModify = (): boolean => {
    const hoursUntil = getTimeUntilBooking();
    return hoursUntil > 3 && ['pending', 'confirmed'].includes(booking.status);
  };

  const getRefundAmount = (): number => {
    const hoursUntil = getTimeUntilBooking();
    
    if (hoursUntil > 3) {
      // Remboursement intégral si annulation plus de 3h avant
      return booking.amount;
    } else if (hoursUntil > 1) {
      // Remboursement partiel (50%) si annulation entre 1h et 3h avant
      return booking.amount * 0.5;
    } else {
      // Pas de remboursement si annulation moins de 1h avant
      return 0;
    }
  };

  const handleCancel = async () => {
    setIsProcessing(true);

    try {
      const hoursUntil = getTimeUntilBooking();
      const refundAmount = getRefundAmount();

      // Simuler le traitement de l'annulation
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mettre à jour le statut de la réservation
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const updatedBookings = bookings.map((b: Booking) => 
        b.id === booking.id 
          ? { ...b, status: 'cancelled', cancelledAt: new Date().toISOString() }
          : b
      );
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));

      // Enregistrer le remboursement
      if (refundAmount > 0) {
        const refunds = JSON.parse(localStorage.getItem('refunds') || '[]');
        refunds.push({
          bookingId: booking.id,
          amount: refundAmount,
          processedAt: new Date().toISOString(),
          status: 'processed',
          method: 'automatic',
          estimatedArrival: '3-5 jours ouvrés'
        });
        localStorage.setItem('refunds', JSON.stringify(refunds));
      }

      // Notifier le promeneur
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      notifications.push({
        type: 'booking_cancelled',
        bookingId: booking.id,
        walkerName: booking.walkerName,
        timestamp: new Date().toISOString(),
        message: `Réservation annulée par le propriétaire`
      });
      localStorage.setItem('notifications', JSON.stringify(notifications));

      toast({
        title: "Réservation annulée",
        description: refundAmount > 0 
          ? `Votre remboursement de ${refundAmount.toFixed(2)}€ sera traité sous 3-5 jours ouvrés`
          : "Votre réservation a été annulée",
      });

      setShowCancelDialog(false);
      
      if (onCancelled) {
        onCancelled();
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'annulation",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleModify = () => {
    toast({
      title: "Modification de réservation",
      description: "Vous allez être redirigé vers le formulaire de modification",
    });
    
    // Rediriger vers la page de modification
    window.location.href = `/booking/modify/${booking.id}`;
    
    if (onModified) {
      onModified();
    }
  };

  const hoursUntil = getTimeUntilBooking();
  const refundAmount = getRefundAmount();

  return (
    <div className="space-y-4">
      {/* Informations sur la politique d'annulation */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Politique d'annulation :</strong>
          <ul className="mt-2 space-y-1 text-sm">
            <li>• Plus de 3h avant : Remboursement intégral (100%)</li>
            <li>• Entre 1h et 3h avant : Remboursement partiel (50%)</li>
            <li>• Moins de 1h avant : Aucun remboursement</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Temps restant */}
      {hoursUntil > 0 && (
        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
          <Clock className="h-5 w-5 text-primary" />
          <div>
            <div className="text-sm font-medium">
              Temps restant avant le rendez-vous
            </div>
            <div className="text-xs text-muted-foreground">
              {hoursUntil > 24 
                ? `${Math.floor(hoursUntil / 24)} jour(s) et ${Math.floor(hoursUntil % 24)} heure(s)`
                : `${Math.floor(hoursUntil)} heure(s) et ${Math.floor((hoursUntil % 1) * 60)} minute(s)`
              }
            </div>
          </div>
        </div>
      )}

      {/* Boutons d'action */}
      <div className="flex gap-3">
        {canModify() && (
          <Button
            variant="outline"
            onClick={handleModify}
            className="flex-1"
            disabled={booking.status === 'cancelled'}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Modifier
          </Button>
        )}
        
        {canCancel() && (
          <Button
            variant="destructive"
            onClick={() => setShowCancelDialog(true)}
            className="flex-1"
            disabled={booking.status === 'cancelled'}
          >
            <X className="h-4 w-4 mr-2" />
            Annuler
          </Button>
        )}
      </div>

      {!canCancel() && !canModify() && booking.status !== 'cancelled' && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            La modification ou l'annulation n'est plus possible (moins de 3h avant le rendez-vous)
          </AlertDescription>
        </Alert>
      )}

      {/* Dialog de confirmation d'annulation */}
      {showCancelDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Confirmer l'annulation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Êtes-vous sûr de vouloir annuler cette réservation ?
              </p>

              {/* Détails de la réservation */}
              <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service :</span>
                  <span className="font-medium">{booking.service}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date :</span>
                  <span className="font-medium">
                    {new Date(booking.date).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Heure :</span>
                  <span className="font-medium">{booking.time}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Promeneur :</span>
                  <span className="font-medium">{booking.walkerName}</span>
                </div>
              </div>

              {/* Informations de remboursement */}
              {refundAmount > 0 ? (
                <Alert>
                  <Euro className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Remboursement :</strong> {refundAmount.toFixed(2)}€
                    <br />
                    <span className="text-xs">
                      Le remboursement sera traité automatiquement sous 3-5 jours ouvrés
                    </span>
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Aucun remboursement</strong>
                    <br />
                    <span className="text-xs">
                      L'annulation est trop proche du rendez-vous
                    </span>
                  </AlertDescription>
                </Alert>
              )}

              {/* Boutons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowCancelDialog(false)}
                  className="flex-1"
                  disabled={isProcessing}
                >
                  Retour
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleCancel}
                  className="flex-1"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Annulation..." : "Confirmer l'annulation"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

