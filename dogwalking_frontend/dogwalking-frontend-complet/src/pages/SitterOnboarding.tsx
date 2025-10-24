import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  MapPin, 
  Camera, 
  PawPrint, 
  Star, 
  Shield, 
  CreditCard,
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const SitterOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  
  const [formData, setFormData] = useState({
    // Étape 1: Informations personnelles
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    
    // Étape 2: Profil promeneur certifié
    bio: "",
    experience: "",
    ownsPets: false,
    petTypes: [] as string[],
    languages: [] as string[],
    
    // Étape 3: Services et prix
    services: [] as string[],
    pricing: {
      dogWalking: 25,
      boarding: 45,
      houseSitting: 40,
      dropIn: 20,
      daycare: 35
    },
    
    // Étape 4: Disponibilités
    availability: [] as string[],
    emergencyAvailable: false,
    
    // Étape 5: Vérifications
    backgroundCheck: false,
    insurance: false,
    identityVerified: false
  });

  const steps = [
    { title: "Informations personnelles", icon: User },
    { title: "Votre profil", icon: PawPrint },
    { title: "Services & Prix", icon: CreditCard },
    { title: "Disponibilités", icon: Star },
    { title: "Vérifications", icon: Shield }
  ];

  const serviceOptions = [
    { id: "dogWalking", name: "Promenade de chien", description: "Sorties quotidiennes" },
    { id: "boarding", name: "Garde à domicile", description: "Chez vous" },
    { id: "houseSitting", name: "Garde chez le propriétaire", description: "Au domicile du client" },
    { id: "dropIn", name: "Visite à domicile", description: "Visites courtes" },
    { id: "daycare", name: "Garderie de jour", description: "Garde pendant la journée" }
  ];

  const petTypeOptions = ["Chien", "Chat", "Lapin", "Oiseau", "Poisson", "Reptile"];
  const languageOptions = ["Français", "Anglais", "Espagnol", "Italien", "Allemand"];
  const availabilityOptions = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Onboarding completed:", formData);
    navigate("/sitter-dashboard");
  };

  const handleArrayToggle = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(value)
        ? (prev[field] as string[]).filter(item => item !== value)
        : [...(prev[field] as string[]), value]
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Parlons de vous</h2>
              <p className="text-muted-foreground">Ces informations nous aident à vérifier votre identité</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Prénom *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Marie"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Nom *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Dubois"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Téléphone *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="06 12 34 56 78"
              />
            </div>

            <div>
              <Label htmlFor="address">Adresse *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="123 rue de la Paix"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">Ville *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="Paris"
                />
              </div>
              <div>
                <Label htmlFor="postalCode">Code postal *</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                  placeholder="75001"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Créez votre profil</h2>
              <p className="text-muted-foreground">Montrez aux propriétaires qui vous êtes</p>
            </div>

            <div>
              <Label htmlFor="bio">Présentez-vous *</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Parlez de votre passion pour les animaux, votre expérience..."
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="experience">Expérience avec les animaux</Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                placeholder="Décrivez votre expérience, formations, certifications..."
                rows={3}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ownsPets"
                  checked={formData.ownsPets}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, ownsPets: checked as boolean }))}
                />
                <Label htmlFor="ownsPets">J'ai mes propres animaux</Label>
              </div>
            </div>

            <div>
              <Label>Types d'animaux que vous gardez</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {petTypeOptions.map((pet) => (
                  <label key={pet} className="flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-muted/50">
                    <Checkbox
                      checked={formData.petTypes.includes(pet)}
                      onCheckedChange={() => handleArrayToggle('petTypes', pet)}
                    />
                    <span className="text-sm">{pet}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label>Langues parlées</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {languageOptions.map((lang) => (
                  <label key={lang} className="flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-muted/50">
                    <Checkbox
                      checked={formData.languages.includes(lang)}
                      onCheckedChange={() => handleArrayToggle('languages', lang)}
                    />
                    <span className="text-sm">{lang}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Services et tarification</h2>
              <p className="text-muted-foreground">Choisissez vos services et fixez vos prix</p>
            </div>

            <div className="space-y-4">
              {serviceOptions.map((service) => (
                <div key={service.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={formData.services.includes(service.id)}
                        onCheckedChange={() => handleArrayToggle('services', service.id)}
                      />
                      <div>
                        <h3 className="font-medium">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  {formData.services.includes(service.id) && (
                    <div className="mt-3">
                      <Label>Prix (€)</Label>
                      <Input
                        type="number"
                        value={formData.pricing[service.id as keyof typeof formData.pricing]}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          pricing: {
                            ...prev.pricing,
                            [service.id]: parseInt(e.target.value) || 0
                          }
                        }))}
                        className="w-32 mt-1"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Vos disponibilités</h2>
              <p className="text-muted-foreground">Quand êtes-vous disponible pour garder des animaux ?</p>
            </div>

            <div>
              <Label>Jours de la semaine</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {availabilityOptions.map((day) => (
                  <label key={day} className="flex items-center space-x-2 p-3 border rounded cursor-pointer hover:bg-muted/50">
                    <Checkbox
                      checked={formData.availability.includes(day)}
                      onCheckedChange={() => handleArrayToggle('availability', day)}
                    />
                    <span className="text-sm">{day}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="emergencyAvailable"
                  checked={formData.emergencyAvailable}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, emergencyAvailable: checked as boolean }))}
                />
                <Label htmlFor="emergencyAvailable">Disponible pour les urgences</Label>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Vérifications</h2>
              <p className="text-muted-foreground">Ces vérifications augmentent la confiance des propriétaires</p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-8 h-8 text-dogwalking-green" />
                      <div>
                        <h3 className="font-medium">Vérification des antécédents</h3>
                        <p className="text-sm text-muted-foreground">Vérification judiciaire complète</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Commencer
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <User className="w-8 h-8 text-dogwalking-green" />
                      <div>
                        <h3 className="font-medium">Vérification d'identité</h3>
                        <p className="text-sm text-muted-foreground">Confirmation de votre identité</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Vérifier
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Camera className="w-8 h-8 text-dogwalking-green" />
                      <div>
                        <h3 className="font-medium">Photo de profil</h3>
                        <p className="text-sm text-muted-foreground">Ajoutez une photo souriante</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Ajouter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-dogwalking-green/10 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-dogwalking-green mt-0.5" />
                <div>
                  <h3 className="font-medium text-dogwalking-green">Félicitations !</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Votre profil est prêt ! Vous pouvez commencer à recevoir des demandes de garde.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Devenir Promeneur Certifié</h1>
              <span className="text-sm text-muted-foreground">
                Étape {currentStep} sur {totalSteps}
              </span>
            </div>
            <Progress value={(currentStep / totalSteps) * 100} className="mb-4" />
            
            {/* Steps Indicator */}
            <div className="flex justify-between text-xs">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const stepNumber = index + 1;
                const isCompleted = currentStep > stepNumber;
                const isCurrent = currentStep === stepNumber;
                
                return (
                  <div key={stepNumber} className="flex flex-col items-center space-y-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted 
                        ? 'bg-dogwalking-green text-white' 
                        : isCurrent 
                        ? 'bg-dogwalking-green/20 text-dogwalking-green border-2 border-dogwalking-green'
                        : 'bg-gray-200 text-gray-400'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <StepIcon className="w-4 h-4" />
                      )}
                    </div>
                    <span className={`text-center max-w-[80px] ${
                      isCurrent ? 'text-dogwalking-green font-medium' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Content */}
          <Card>
            <CardContent className="p-8">
              {renderStep()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Précédent
            </Button>

            {currentStep === totalSteps ? (
              <Button onClick={handleSubmit} className="bg-dogwalking-green hover:bg-dogwalking-green/90">
                Terminer l'inscription
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleNext} className="bg-dogwalking-green hover:bg-dogwalking-green/90">
                Continuer
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SitterOnboarding;