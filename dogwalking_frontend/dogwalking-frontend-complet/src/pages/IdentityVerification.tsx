import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, CheckCircle, Clock, AlertCircle, Camera, FileText, Shield } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface VerificationStep {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in_progress" | "pending" | "failed";
  icon: React.ReactNode;
  documents?: string[];
}

const IdentityVerification = () => {
  const [verificationSteps] = useState<VerificationStep[]>([
    {
      id: "identity",
      title: "Vérification d'Identité",
      description: "Vérification de votre identité via pièce d'identité officielle",
      status: "completed",
      icon: <FileText className="w-6 h-6" />,
      documents: ["Carte d'Identité", "Passeport"],
    },
    {
      id: "background",
      title: "Casier Judiciaire B2",
      description: "Vérification du casier judiciaire (extrait de casier B2)",
      status: "completed",
      icon: <Shield className="w-6 h-6" />,
      documents: ["Extrait Casier B2"],
    },
    {
      id: "photo",
      title: "Vérification Faciale",
      description: "Vérification biométrique pour confirmer votre identité",
      status: "in_progress",
      icon: <Camera className="w-6 h-6" />,
      documents: [],
    },
    {
      id: "address",
      title: "Vérification d'Adresse",
      description: "Vérification de votre adresse résidentielle",
      status: "pending",
      icon: <FileText className="w-6 h-6" />,
      documents: [],
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Vérifié";
      case "in_progress":
        return "En cours";
      case "pending":
        return "En attente";
      case "failed":
        return "Échoué";
      default:
        return "Inconnu";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "in_progress":
        return <Clock className="w-5 h-5 text-blue-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-gray-600" />;
      case "failed":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const completionPercentage = Math.round(
    (verificationSteps.filter((s) => s.status === "completed").length /
      verificationSteps.length) *
      100
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Vérification d'Identité</h1>
          <p className="text-muted-foreground">
            Complétez votre vérification pour accéder à toutes les fonctionnalités
          </p>
        </div>

        {/* Barre de progression */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Progression de la Vérification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Complétude</span>
                <span className="text-sm font-bold">{completionPercentage}%</span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {verificationSteps.filter((s) => s.status === "completed").length} sur{" "}
              {verificationSteps.length} étapes complétées
            </p>
          </CardContent>
        </Card>

        {/* Étapes de vérification */}
        <div className="space-y-4">
          {verificationSteps.map((step, index) => (
            <Card key={step.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  {/* Icône */}
                  <div className="flex-shrink-0 w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    {step.icon}
                  </div>

                  {/* Contenu */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(step.status)}
                        <Badge className={getStatusColor(step.status)}>
                          {getStatusLabel(step.status)}
                        </Badge>
                      </div>
                    </div>

                    {/* Documents téléchargés */}
                    {step.documents && step.documents.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {step.documents.map((doc, idx) => (
                          <Badge key={idx} variant="secondary">
                            ✓ {doc}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    {step.status !== "completed" && (
                      <div className="mt-4">
                        {step.status === "in_progress" ? (
                          <div className="space-y-3">
                            <p className="text-sm text-blue-700 bg-blue-50 p-3 rounded-lg">
                              Veuillez compléter cette étape. Cliquez sur le bouton ci-dessous pour continuer.
                            </p>
                            <Button className="w-full">
                              <Camera className="w-4 h-4 mr-2" />
                              Continuer la Vérification Faciale
                            </Button>
                          </div>
                        ) : (
                          <Button variant="outline" className="w-full">
                            <Upload className="w-4 h-4 mr-2" />
                            Télécharger les Documents
                          </Button>
                        )}
                      </div>
                    )}

                    {step.status === "completed" && (
                      <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg mt-4">
                        ✓ Cette étape a été complétée avec succès
                      </p>
                    )}

                    {step.status === "failed" && (
                      <p className="text-sm text-red-700 bg-red-50 p-3 rounded-lg mt-4">
                        ✗ Cette vérification a échoué. Veuillez réessayer.
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Informations supplémentaires */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Informations Importantes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Pourquoi vérifier mon identité ?</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Assurer la sécurité de tous les utilisateurs</li>
                <li>Respecter les réglementations légales</li>
                <li>Prévenir la fraude et les abus</li>
                <li>Accéder à toutes les fonctionnalités de la plateforme</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Quels documents sont acceptés ?</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Carte d'Identité Nationale</li>
                <li>Passeport</li>
                <li>Permis de Conduire</li>
                <li>Extrait de Casier Judiciaire B2</li>
                <li>Justificatif de Domicile (facture, avis d'imposition)</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                <strong>Confidentialité</strong> : Vos données personnelles sont chiffrées et stockées de manière sécurisée. Nous ne partagerons jamais vos informations sans votre consentement.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-700">
                <strong>Délai de traitement</strong> : La vérification est généralement complétée en 24-48 heures. Vous recevrez une notification dès que ce sera fait.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Besoin d'aide */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Besoin d'Aide ?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Si vous avez des questions ou des problèmes lors de la vérification, notre équipe de support est là pour vous aider.
            </p>
            <Button variant="outline" className="w-full">
              Contacter le Support
            </Button>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default IdentityVerification;

