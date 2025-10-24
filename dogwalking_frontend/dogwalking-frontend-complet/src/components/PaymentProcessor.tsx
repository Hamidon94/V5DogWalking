import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Lock, CheckCircle } from "lucide-react";

interface PaymentProcessorProps {
  amount: number;
  currency?: string;
  bookingId: string;
  onPaymentSuccess: (transactionId: string) => void;
  onPaymentError: (error: string) => void;
}

const PaymentProcessor = ({
  amount,
  currency = "EUR",
  bookingId,
  onPaymentSuccess,
  onPaymentError,
}: PaymentProcessorProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateCardData = () => {
    if (!cardData.cardNumber || cardData.cardNumber.length < 13) {
      onPaymentError("Numéro de carte invalide");
      return false;
    }
    if (!cardData.cardHolder) {
      onPaymentError("Nom du titulaire requis");
      return false;
    }
    if (!cardData.expiryDate || cardData.expiryDate.length < 5) {
      onPaymentError("Date d'expiration invalide");
      return false;
    }
    if (!cardData.cvv || cardData.cvv.length < 3) {
      onPaymentError("CVV invalide");
      return false;
    }
    return true;
  };

  const handlePaymentSubmit = async () => {
    if (!validateCardData()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Simulation du traitement du paiement
      // En production, cela appellerait une API backend sécurisée
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Appeler le callback de succès
      onPaymentSuccess(transactionId);
    } catch (error) {
      onPaymentError("Erreur lors du traitement du paiement");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayPalPayment = async () => {
    setIsProcessing(true);

    try {
      // Simulation du traitement PayPal
      // En production, cela utiliserait l'API PayPal
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const transactionId = `PAYPAL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      onPaymentSuccess(transactionId);
    } catch (error) {
      onPaymentError("Erreur lors du paiement PayPal");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Paiement Sécurisé
        </CardTitle>
        <CardDescription>
          Montant à payer : <span className="font-bold text-foreground">{amount.toFixed(2)} {currency}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sélection de la méthode de paiement */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Méthode de paiement</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setPaymentMethod("card")}
              className={`p-3 border-2 rounded-lg transition-all ${
                paymentMethod === "card"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <CreditCard className="w-5 h-5 mx-auto mb-2" />
              <span className="text-sm font-medium">Carte Bancaire</span>
            </button>
            <button
              onClick={() => setPaymentMethod("paypal")}
              className={`p-3 border-2 rounded-lg transition-all ${
                paymentMethod === "paypal"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="text-sm font-bold text-blue-600">PayPal</span>
            </button>
          </div>
        </div>

        {/* Formulaire de carte bancaire */}
        {paymentMethod === "card" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Numéro de carte</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardData.cardNumber}
                onChange={handleCardInputChange}
                maxLength={19}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Nom du titulaire</label>
              <input
                type="text"
                name="cardHolder"
                placeholder="Jean Dupont"
                value={cardData.cardHolder}
                onChange={handleCardInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date d'expiration</label>
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={cardData.expiryDate}
                  onChange={handleCardInputChange}
                  maxLength={5}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  placeholder="123"
                  value={cardData.cvv}
                  onChange={handleCardInputChange}
                  maxLength={4}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Informations PayPal */}
        {paymentMethod === "paypal" && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <p className="text-sm text-blue-700">
              Vous serez redirigé vers PayPal pour finaliser votre paiement de manière sécurisée.
            </p>
          </div>
        )}

        {/* Sécurité */}
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <Lock className="w-4 h-4 text-green-600" />
          <span className="text-sm text-green-700">Paiement 100% sécurisé et chiffré</span>
        </div>

        {/* Conditions */}
        <div className="flex items-start gap-2">
          <input type="checkbox" id="terms" className="mt-1" />
          <label htmlFor="terms" className="text-sm text-muted-foreground">
            J'accepte les conditions d'utilisation et la politique de confidentialité de DogWalking
          </label>
        </div>

        {/* Bouton de paiement */}
        <Button
          onClick={paymentMethod === "card" ? handlePaymentSubmit : handlePayPalPayment}
          disabled={isProcessing}
          className="w-full"
          size="lg"
        >
          {isProcessing ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Traitement du paiement...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 mr-2" />
              Payer {amount.toFixed(2)} {currency}
            </>
          )}
        </Button>

        {/* Informations supplémentaires */}
        <div className="pt-4 border-t space-y-2 text-xs text-muted-foreground">
          <p>Référence de réservation : {bookingId}</p>
          <p>Votre paiement sera traité en toute sécurité par nos partenaires de paiement agréés.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentProcessor;

