import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Check, MapPin, Calendar, Clock, DogIcon, User } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface BookingDetails {
  id: string;
  status: "confirmed" | "pending" | "completed";
  createdAt: string;
  pet: {
    name: string;
    type: string;
    breed: string;
  };
  sitter: {
    name: string;
    rating: number;
    location: string;
  };
  service: {
    name: string;
    price: number;
  };
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  additionalServices: Array<{
    name: string;
    price: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  transactionId: string;
}

const BookingConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Mock booking data - en production, cela viendrait d'une API
  const booking: BookingDetails = {
    id: "BK-2024-10-001",
    status: "confirmed",
    createdAt: new Date().toLocaleDateString("fr-FR"),
    pet: {
      name: "Max",
      type: "Chien",
      breed: "Golden Retriever",
    },
    sitter: {
      name: "Marie Dubois",
      rating: 4.9,
      location: "Paris 11ème",
    },
    service: {
      name: "Promenade de chien",
      price: 25,
    },
    startDate: "2024-10-25",
    endDate: "2024-10-25",
    startTime: "14:00",
    endTime: "14:30",
    additionalServices: [
      { name: "Photos quotidiennes", price: 3 },
    ],
    subtotal: 28,
    tax: 5.32,
    total: 33.32,
    transactionId: "TXN-1729610400000-abc123def",
  };

  const handleDownloadInvoice = () => {
    // Simulation du téléchargement de la facture
    const invoiceContent = generateInvoiceContent(booking);
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(invoiceContent));
    element.setAttribute("download", `facture-${booking.id}.txt`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const generateInvoiceContent = (booking: BookingDetails) => {
    return `
FACTURE DOGWALKING
==================

Numéro de facture: ${booking.id}
Date: ${booking.createdAt}
Statut: ${booking.status === "confirmed" ? "CONFIRMÉE" : "EN ATTENTE"}

CLIENT
------
Réservation pour: ${booking.pet.name} (${booking.pet.type} - ${booking.pet.breed})

PROMENEUR CERTIFIÉ
-------------------
Nom: ${booking.sitter.name}
Localisation: ${booking.sitter.location}
Note: ${booking.sitter.rating}/5

DÉTAILS DE LA RÉSERVATION
--------------------------
Service: ${booking.service.name}
Date: ${booking.startDate}
Heure: ${booking.startTime} - ${booking.endTime}

DÉTAIL DES FRAIS
-----------------
${booking.service.name}: ${booking.service.price.toFixed(2)}€
${booking.additionalServices.map((s) => `${s.name}: ${s.price.toFixed(2)}€`).join("\n")}

Sous-total: ${booking.subtotal.toFixed(2)}€
TVA (19%): ${booking.tax.toFixed(2)}€
---
TOTAL: ${booking.total.toFixed(2)}€

PAIEMENT
--------
Méthode: Carte bancaire
ID Transaction: ${booking.transactionId}
Statut: APPROUVÉ

INFORMATIONS IMPORTANTES
------------------------
- Vous pouvez annuler jusqu'à 3 heures avant la réservation
- Une confirmation SMS sera envoyée au promeneur
- Les photos du service seront disponibles dans votre dashboard
- En cas de problème, contactez notre support 24h/24

Merci d'avoir choisi DogWalking!
    `;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Message de confirmation */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Réservation Confirmée !</h1>
            <p className="text-muted-foreground">
              Votre réservation a été confirmée avec succès. Un SMS de confirmation a été envoyé au promeneur.
            </p>
          </div>

          {/* Détails de la réservation */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Détails de la Réservation</CardTitle>
              <CardDescription>Numéro de réservation: {booking.id}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Informations de l'animal */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <DogIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{booking.pet.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {booking.pet.type} • {booking.pet.breed}
                  </p>
                </div>
              </div>

              {/* Informations du promeneur */}
              <div className="flex items-start gap-4 border-t pt-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{booking.sitter.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    ⭐ {booking.sitter.rating}/5 • {booking.sitter.location}
                  </p>
                </div>
              </div>

              {/* Service et dates */}
              <div className="space-y-3 border-t pt-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-semibold">{booking.startDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Heure</p>
                    <p className="font-semibold">
                      {booking.startTime} - {booking.endTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Résumé des frais */}
              <div className="space-y-2 border-t pt-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{booking.service.name}</span>
                  <span className="font-medium">{booking.service.price.toFixed(2)}€</span>
                </div>
                {booking.additionalServices.map((service) => (
                  <div key={service.name} className="flex justify-between">
                    <span className="text-muted-foreground">{service.name}</span>
                    <span className="font-medium">+{service.price.toFixed(2)}€</span>
                  </div>
                ))}
                <div className="flex justify-between border-t pt-2">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span className="font-medium">{booking.subtotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">TVA</span>
                  <span className="font-medium">{booking.tax.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span className="text-green-600">{booking.total.toFixed(2)}€</span>
                </div>
              </div>

              {/* Statut du paiement */}
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <Check className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-semibold text-green-900">Paiement Approuvé</p>
                  <p className="text-sm text-green-700">ID Transaction: {booking.transactionId}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-6 border-t">
                <Button onClick={handleDownloadInvoice} variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger la Facture
                </Button>
                <Button onClick={() => navigate("/dashboard")} className="flex-1">
                  Voir dans Mon Compte
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Informations utiles */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informations Importantes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Avant la réservation</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Un SMS de confirmation sera envoyé au promeneur</li>
                  <li>Vous recevrez une notification une fois que le promeneur aura accepté</li>
                  <li>Vous pouvez communiquer avec le promeneur via la messagerie intégrée</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Pendant la réservation</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Le promeneur enverra des photos du service</li>
                  <li>Vous pouvez suivre l'activité en temps réel</li>
                  <li>En cas d'urgence, contactez notre support 24h/24</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Après la réservation</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Vous pouvez laisser un avis sur le promeneur</li>
                  <li>Votre facture est disponible dans votre compte</li>
                  <li>Remboursement possible jusqu'à 3h avant la réservation</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingConfirmation;

