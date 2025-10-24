import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle, AlertCircle, Clock, Shield } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const ProfileValidation = () => {
  const [uploadedDocuments, setUploadedDocuments] = useState({
    identity: false,
    criminalRecord: false,
    insurance: false
  });

  const validationSteps = [
    {
      id: "identity",
      title: "Pièce d'identité",
      description: "Carte d'identité, passeport ou permis de conduire",
      required: true,
      status: uploadedDocuments.identity ? "completed" : "pending",
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: "criminalRecord",
      title: "Casier judiciaire B2",
      description: "Extrait de casier judiciaire vierge obligatoire",
      required: true,
      status: uploadedDocuments.criminalRecord ? "completed" : "pending",
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: "insurance",
      title: "Assurance responsabilité civile",
      description: "Attestation d'assurance couvrant la garde d'animaux",
      required: false,
      status: uploadedDocuments.insurance ? "completed" : "optional",
      icon: <FileText className="w-5 h-5" />
    }
  ];

  const handleFileUpload = (documentType: string) => {
    // Simulation d'upload de fichier
    setUploadedDocuments(prev => ({
      ...prev,
      [documentType]: true
    }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Validé</Badge>;
      case "pending":
        return <Badge variant="destructive">En attente</Badge>;
      case "optional":
        return <Badge variant="secondary">Optionnel</Badge>;
      default:
        return <Badge variant="secondary">Non requis</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "pending":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const allRequiredCompleted = uploadedDocuments.identity && uploadedDocuments.criminalRecord;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Validation de votre profil</h1>
            <p className="text-muted-foreground text-lg">
              Pour garantir la sécurité de nos utilisateurs, nous devons vérifier votre identité et vos antécédents
            </p>
          </div>

          {/* Progress Overview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-dogwalking-green" />
                État de la validation
              </CardTitle>
              <CardDescription>
                Complétez tous les documents requis pour activer votre profil de promeneur certifié
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">
                    {allRequiredCompleted ? "Profil validé !" : "Validation en cours"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {allRequiredCompleted 
                      ? "Votre profil est maintenant actif et visible par les propriétaires"
                      : `${Object.values(uploadedDocuments).filter(Boolean).length}/2 documents requis téléchargés`
                    }
                  </p>
                </div>
                <div className="text-right">
                  {allRequiredCompleted ? (
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  ) : (
                    <Clock className="w-8 h-8 text-orange-500" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Validation Steps */}
          <div className="space-y-6">
            {validationSteps.map((step) => (
              <Card key={step.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {step.icon}
                      <div>
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                        <CardDescription>{step.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(step.status)}
                      {getStatusIcon(step.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {step.status === "completed" ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Document validé avec succès</span>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-4">
                          Glissez-déposez votre fichier ici ou cliquez pour sélectionner
                        </p>
                        <Button 
                          onClick={() => handleFileUpload(step.id)}
                          variant="outline"
                        >
                          Télécharger le document
                        </Button>
                      </div>
                      
                      {step.id === "identity" && (
                        <div className="text-xs text-muted-foreground">
                          <p><strong>Formats acceptés :</strong> PDF, JPG, PNG (max 5MB)</p>
                          <p><strong>Documents acceptés :</strong> Carte d'identité française, passeport, permis de conduire</p>
                        </div>
                      )}
                      
                      {step.id === "criminalRecord" && (
                        <div className="text-xs text-muted-foreground">
                          <p><strong>Important :</strong> Le casier judiciaire doit être vierge (bulletin n°2)</p>
                          <p><strong>Obtention :</strong> Demande en ligne sur service-public.fr ou en mairie</p>
                          <p><strong>Validité :</strong> Document de moins de 3 mois</p>
                        </div>
                      )}
                      
                      {step.id === "insurance" && (
                        <div className="text-xs text-muted-foreground">
                          <p><strong>Recommandé :</strong> Assurance responsabilité civile professionnelle</p>
                          <p><strong>Couverture :</strong> Dommages causés aux animaux gardés et aux tiers</p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 text-center space-y-4">
            {allRequiredCompleted ? (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-center gap-2 text-green-800">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Félicitations ! Votre profil est maintenant validé</span>
                  </div>
                  <p className="text-sm text-green-700 mt-2">
                    Vous pouvez maintenant recevoir des demandes de garde et commencer à gagner de l'argent
                  </p>
                </div>
                <Button className="dogwalking-button-primary" size="lg">
                  Accéder à mon tableau de bord
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center justify-center gap-2 text-orange-800">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">Validation en cours</span>
                  </div>
                  <p className="text-sm text-orange-700 mt-2">
                    Téléchargez tous les documents requis pour activer votre profil
                  </p>
                </div>
                <Button variant="outline" size="lg">
                  Continuer plus tard
                </Button>
              </div>
            )}
          </div>

          {/* Help Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Besoin d'aide ?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">Problème avec vos documents ?</h4>
                  <p className="text-muted-foreground">
                    Contactez notre équipe support qui vous aidera dans le processus de validation.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Délai de validation</h4>
                  <p className="text-muted-foreground">
                    La validation prend généralement 24-48h ouvrées après réception de tous les documents.
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm">
                  Contacter le support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfileValidation;
