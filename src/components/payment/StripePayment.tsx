import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { CreditCard, Lock, Check } from 'lucide-react';

interface StripePaymentProps {
  amount: number;
  serviceName: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const StripePayment: React.FC<StripePaymentProps> = ({
  amount,
  serviceName,
  onSuccess,
  onCancel
}) => {
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [tipAmount, setTipAmount] = useState(0);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulation du paiement (en production, utiliser l'API Stripe réelle)
    try {
      // Validation basique
      if (cardNumber.replace(/\s/g, '').length !== 16) {
        throw new Error('Numéro de carte invalide');
      }
      if (!expiryDate.match(/^\d{2}\/\d{2}$/)) {
        throw new Error('Date d\'expiration invalide');
      }
      if (cvv.length !== 3) {
        throw new Error('CVV invalide');
      }

      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Générer un ID de transaction
      const transactionId = 'TXN-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();

      toast({
        title: "Paiement réussi",
        description: `Votre paiement de ${(amount + tipAmount).toFixed(2)}€ a été traité avec succès. Transaction: ${transactionId}`,
      });

      // Générer la facture
      generateInvoice(transactionId);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      toast({
        title: "Erreur de paiement",
        description: error.message || "Une erreur est survenue lors du traitement du paiement.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateInvoice = (transactionId: string) => {
    // Créer un objet de facture
    const invoice = {
      id: transactionId,
      date: new Date().toISOString(),
      service: serviceName,
      amount: amount,
      tip: tipAmount,
      total: amount + tipAmount,
      customerName: cardholderName,
    };

    // Sauvegarder dans le localStorage pour récupération ultérieure
    const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    invoices.push(invoice);
    localStorage.setItem('invoices', JSON.stringify(invoices));
  };

  const totalAmount = amount + tipAmount;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Paiement sécurisé
        </CardTitle>
        <CardDescription>
          Vos informations de paiement sont sécurisées et cryptées
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Résumé de la commande */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Service :</span>
              <span>{serviceName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Montant :</span>
              <span>{amount.toFixed(2)}€</span>
            </div>
            {tipAmount > 0 && (
              <div className="flex justify-between text-primary">
                <span className="font-medium">Pourboire :</span>
                <span>+{tipAmount.toFixed(2)}€</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between text-lg font-bold">
              <span>Total :</span>
              <span>{totalAmount.toFixed(2)}€</span>
            </div>
          </div>

          {/* Pourboire optionnel */}
          <div className="space-y-2">
            <Label>Ajouter un pourboire (optionnel)</Label>
            <div className="grid grid-cols-4 gap-2">
              {[0, 2, 5, 10].map((tip) => (
                <Button
                  key={tip}
                  type="button"
                  variant={tipAmount === tip ? "default" : "outline"}
                  onClick={() => setTipAmount(tip)}
                  className="w-full"
                >
                  {tip === 0 ? 'Aucun' : `${tip}€`}
                </Button>
              ))}
            </div>
          </div>

          {/* Informations de carte */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardholderName">Nom du titulaire</Label>
              <Input
                id="cardholderName"
                placeholder="Jean Dupont"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="cardNumber">Numéro de carte</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                maxLength={19}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Date d'expiration</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/AA"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                  maxLength={5}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  type="password"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  maxLength={3}
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="saveCard"
                checked={saveCard}
                onChange={(e) => setSaveCard(e.target.checked)}
              />
              <Label htmlFor="saveCard" className="text-sm cursor-pointer">
                Enregistrer cette carte pour les prochains paiements
              </Label>
            </div>
          </div>

          {/* Sécurité */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
            <Lock className="h-4 w-4" />
            <span>Paiement 100% sécurisé avec cryptage SSL et Stripe</span>
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-3">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={loading}
                className="flex-1"
              >
                Annuler
              </Button>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="flex-1"
            >
              {loading ? (
                "Traitement..."
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Payer {totalAmount.toFixed(2)}€
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

