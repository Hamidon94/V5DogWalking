import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import { Calendar, Clock, CreditCard, MapPin, PawPrint, Star, Shield, ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { bookingFormSchema, type BookingFormData } from "@/lib/validation";
import { toast } from "sonner";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sitterId = searchParams.get("sitter");
  const service = searchParams.get("service");

  const [formData, setFormData] = useState<BookingFormData>({
    petName: "",
    petType: "",
    petAge: "",
    specialInstructions: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    emergencyContact: "",
    emergencyPhone: "",
    additionalServices: []
  });

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock sitter data
  const sitter = {
    id: sitterId || "1",
    name: "Marie Dubois",
    photo: "/placeholder.svg",
    rating: 4.9,
    reviewCount: 127,
    location: "Paris 11ème",
    responseTime: "< 1 heure"
  };

  const serviceDetails = {
    "dog-walking": {
      name: "Promenade de chien",
      price: 25,
      duration: "30 minutes",
      description: "Promenade personnalisée pour votre chien"
    },
    "boarding": {
      name: "Garde à domicile",
      price: 45,
      duration: "par nuit",
      description: "Votre animal reste chez le promeneur certifié"
    },
    "house-sitting": {
      name: "Garde chez vous",
      price: 40,
      duration: "par nuit", 
      description: "Le promeneur certifié vient chez vous"
    },
    "drop-in": {
      name: "Visite à domicile",
      price: 20,
      duration: "par visite",
      description: "Visite courte pour nourrir et jouer"
    }
  };

  const currentService = serviceDetails[service as keyof typeof serviceDetails] || serviceDetails["dog-walking"];

  const additionalServices = [
    { id: "medication", name: "Administration de médicaments", price: 5 },
    { id: "grooming", name: "Toilettage de base", price: 15 },
    { id: "training", name: "Exercices d'éducation", price: 10 },
    { id: "photos", name: "Photos quotidiennes", price: 3 }
  ];

  const handleAdditionalServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(serviceId)
        ? prev.additionalServices.filter(id => id !== serviceId)
        : [...prev.additionalServices, serviceId]
    }));
  };

  const calculateTotal = () => {
    let total = currentService.price;
    formData.additionalServices.forEach(serviceId => {
      const service = additionalServices.find(s => s.id === serviceId);
      if (service) total += service.price;
    });
    return total;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare form data for validation
    const dataToValidate = {
      ...formData,
      startDate: startDate?.toISOString().split('T')[0] || "",
      endDate: endDate?.toISOString().split('T')[0] || ""
    };
    
    // Validate form data
    const result = bookingFormSchema.safeParse(dataToValidate);
    
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path.length > 0) {
          newErrors[issue.path[0] as string] = issue.message;
        }
      });
      setErrors(newErrors);
      toast.error("Veuillez corriger les erreurs dans le formulaire");
      return;
    }
    
    setErrors({});
    console.log("Booking submitted:", result.data);
    toast.success("Réservation confirmée avec succès !");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Réserver {currentService.name}</CardTitle>
                <CardDescription>
                  Complétez les informations pour finaliser votre réservation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Pet Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Informations sur votre animal</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="petName">Nom de l'animal *</Label>
                        <Input
                          id="petName"
                          value={formData.petName}
                          onChange={(e) => setFormData(prev => ({ ...prev, petName: e.target.value }))}
                          placeholder="Max"
                          required
                          className={errors.petName ? "border-red-500" : ""}
                        />
                        {errors.petName && (
                          <p className="text-sm text-red-500 mt-1">{errors.petName}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="petType">Type d'animal *</Label>
                        <Select onValueChange={(value) => setFormData(prev => ({ ...prev, petType: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dog">Chien</SelectItem>
                            <SelectItem value="cat">Chat</SelectItem>
                            <SelectItem value="rabbit">Lapin</SelectItem>
                            <SelectItem value="bird">Oiseau</SelectItem>
                            <SelectItem value="other">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="petAge">Âge de l'animal</Label>
                      <Input
                        id="petAge"
                        value={formData.petAge}
                        onChange={(e) => setFormData(prev => ({ ...prev, petAge: e.target.value }))}
                        placeholder="2 ans"
                      />
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Dates et horaires</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">Date de début *</Label>
                        <DatePicker
                          date={startDate}
                          onDateChange={setStartDate}
                          placeholder="Sélectionner la date de début"
                          className={errors.startDate ? "border-red-500" : ""}
                        />
                        {errors.startDate && (
                          <p className="text-sm text-red-500 mt-1">{errors.startDate}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="endDate">Date de fin</Label>
                        <DatePicker
                          date={endDate}
                          onDateChange={setEndDate}
                          placeholder="Sélectionner la date de fin"
                          disabled={!startDate}
                          className={errors.endDate ? "border-red-500" : ""}
                        />
                        {errors.endDate && (
                          <p className="text-sm text-red-500 mt-1">{errors.endDate}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startTime">Heure de début</Label>
                        <TimePicker
                          value={formData.startTime}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, startTime: value }))}
                          placeholder="Sélectionner l'heure de début"
                          className={errors.startTime ? "border-red-500" : ""}
                        />
                        {errors.startTime && (
                          <p className="text-sm text-red-500 mt-1">{errors.startTime}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="endTime">Heure de fin</Label>
                        <TimePicker
                          value={formData.endTime}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, endTime: value }))}
                          placeholder="Sélectionner l'heure de fin"
                          disabled={!formData.startTime}
                          className={errors.endTime ? "border-red-500" : ""}
                        />
                        {errors.endTime && (
                          <p className="text-sm text-red-500 mt-1">{errors.endTime}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Additional Services */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Services supplémentaires</h3>
                    <div className="space-y-3">
                      {additionalServices.map((service) => (
                        <label key={service.id} className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                          <Checkbox 
                            checked={formData.additionalServices.includes(service.id)}
                            onCheckedChange={() => handleAdditionalServiceToggle(service.id)}
                          />
                          <div className="flex-1">
                            <span className="font-medium">{service.name}</span>
                          </div>
                          <span className="text-dogwalking-green font-medium">+{service.price}€</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Special Instructions */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Instructions spéciales</h3>
                    <Textarea
                      value={formData.specialInstructions}
                      onChange={(e) => setFormData(prev => ({ ...prev, specialInstructions: e.target.value }))}
                      placeholder="Routine particulière, médicaments, habitudes alimentaires, jouets préférés..."
                      rows={4}
                      className={errors.specialInstructions ? "border-red-500" : ""}
                    />
                    {errors.specialInstructions && (
                      <p className="text-sm text-red-500 mt-1">{errors.specialInstructions}</p>
                    )}
                  </div>

                  {/* Emergency Contact */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Contact d'urgence</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="emergencyContact">Nom du contact</Label>
                        <Input
                          id="emergencyContact"
                          value={formData.emergencyContact}
                          onChange={(e) => setFormData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                          placeholder="Nom Prénom"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="emergencyPhone">Téléphone</Label>
                        <Input
                          id="emergencyPhone"
                          type="tel"
                          value={formData.emergencyPhone}
                          onChange={(e) => setFormData(prev => ({ ...prev, emergencyPhone: e.target.value }))}
                          placeholder="06 12 34 56 78"
                          className={errors.emergencyPhone ? "border-red-500" : ""}
                        />
                        {errors.emergencyPhone && (
                          <p className="text-sm text-red-500 mt-1">{errors.emergencyPhone}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            {/* Sitter Info */}
            <Card>
              <CardHeader>
                <CardTitle>Votre promeneur certifié</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={sitter.photo} alt={sitter.name} />
                    <AvatarFallback>{sitter.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{sitter.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{sitter.rating} ({sitter.reviewCount} avis)</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{sitter.location}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Résumé de la réservation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>{currentService.name}</span>
                  <span>{currentService.price}€</span>
                </div>
                
                {formData.additionalServices.map(serviceId => {
                  const service = additionalServices.find(s => s.id === serviceId);
                  return service ? (
                    <div key={serviceId} className="flex justify-between text-sm text-muted-foreground">
                      <span>{service.name}</span>
                      <span>+{service.price}€</span>
                    </div>
                  ) : null;
                })}

                <div className="border-t pt-4">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span className="text-dogwalking-green">{calculateTotal()}€</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4 text-dogwalking-green" />
                    <span>Protection DogWalking incluse</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CreditCard className="w-4 h-4" />
                    <span>Paiement sécurisé</span>
                  </div>
                </div>

                <Button 
                  onClick={handleSubmit}
                  className="w-full" 
                  size="lg"
                  disabled={!formData.petName || !formData.petType || !startDate}
                >
                  Confirmer la réservation
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  En confirmant, vous acceptez nos conditions d'utilisation
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Booking;