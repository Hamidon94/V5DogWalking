import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit2, Trash2, Upload, Heart, AlertCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface Pet {
  id: string;
  name: string;
  type: "chien" | "chat";
  breed: string;
  age: number;
  weight: number;
  photo?: string;
  medicalInfo: {
    vaccinations: string[];
    treatments: string[];
    allergies: string[];
    lastVetVisit: string;
  };
  behavior: {
    sociability: "très sociable" | "sociable" | "réservé" | "agressif";
    habits: string[];
    specialNeeds: string[];
  };
  specificNeeds: {
    diet: string;
    medications: string[];
    exercises: string;
    notes: string;
  };
}

const PetProfile = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [pets, setPets] = useState<Pet[]>([
    {
      id: "1",
      name: "Max",
      type: "chien",
      breed: "Golden Retriever",
      age: 3,
      weight: 30,
      photo: "/placeholder.svg",
      medicalInfo: {
        vaccinations: ["Rage", "DHPP"],
        treatments: [],
        allergies: [],
        lastVetVisit: "2024-09-15",
      },
      behavior: {
        sociability: "très sociable",
        habits: ["Aime les jeux", "Sociable avec les autres chiens"],
        specialNeeds: [],
      },
      specificNeeds: {
        diet: "Croquettes premium",
        medications: [],
        exercises: "2 promenades par jour",
        notes: "Adore l'eau",
      },
    },
  ]);

  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<Pet>({
    id: "",
    name: "",
    type: "chien",
    breed: "",
    age: 0,
    weight: 0,
    medicalInfo: {
      vaccinations: [],
      treatments: [],
      allergies: [],
      lastVetVisit: "",
    },
    behavior: {
      sociability: "sociable",
      habits: [],
      specialNeeds: [],
    },
    specificNeeds: {
      diet: "",
      medications: [],
      exercises: "",
      notes: "",
    },
  });

  const handleAddPet = () => {
    setEditingPet(null);
    setFormData({
      id: "",
      name: "",
      type: "chien",
      breed: "",
      age: 0,
      weight: 0,
      medicalInfo: {
        vaccinations: [],
        treatments: [],
        allergies: [],
        lastVetVisit: "",
      },
      behavior: {
        sociability: "sociable",
        habits: [],
        specialNeeds: [],
      },
      specificNeeds: {
        diet: "",
        medications: [],
        exercises: "",
        notes: "",
      },
    });
    setShowForm(true);
  };

  const handleEditPet = (pet: Pet) => {
    setEditingPet(pet);
    setFormData(pet);
    setShowForm(true);
  };

  const handleSavePet = () => {
    if (editingPet) {
      setPets(pets.map((p) => (p.id === editingPet.id ? formData : p)));
    } else {
      setPets([...pets, { ...formData, id: Date.now().toString() }]);
    }
    setShowForm(false);
  };

  const handleDeletePet = (id: string) => {
    setPets(pets.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Profils de Mes Animaux</h1>
            <p className="text-muted-foreground">Gérez les informations de vos animaux de compagnie</p>
          </div>
          <Button onClick={handleAddPet} className="mt-4 md:mt-0">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un Animal
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">Mes Animaux</TabsTrigger>
            <TabsTrigger value="form">{editingPet ? "Modifier" : "Ajouter"}</TabsTrigger>
          </TabsList>

          {/* Liste des animaux */}
          <TabsContent value="list" className="space-y-6">
            {pets.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground mb-4">Vous n'avez pas encore ajouté d'animal.</p>
                  <Button onClick={handleAddPet}>
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter votre premier animal
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pets.map((pet) => (
                  <Card key={pet.id} className="overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover" />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-2xl">{pet.name}</CardTitle>
                          <CardDescription>
                            {pet.breed} • {pet.age} ans • {pet.weight} kg
                          </CardDescription>
                        </div>
                        <Badge variant="outline">{pet.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Informations médicales */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Vaccinations</h4>
                        <div className="flex flex-wrap gap-2">
                          {pet.medicalInfo.vaccinations.map((v) => (
                            <Badge key={v} variant="secondary">
                              {v}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Comportement */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Sociabilité</h4>
                        <Badge className="capitalize">{pet.behavior.sociability}</Badge>
                      </div>

                      {/* Besoins spécifiques */}
                      {pet.specificNeeds.diet && (
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Régime</h4>
                          <p className="text-sm text-muted-foreground">{pet.specificNeeds.diet}</p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2 pt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditPet(pet)}
                          className="flex-1"
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Modifier
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeletePet(pet.id)}
                          className="flex-1 text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Supprimer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Formulaire d'ajout/modification */}
          <TabsContent value="form" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{editingPet ? "Modifier l'animal" : "Ajouter un nouvel animal"}</CardTitle>
                <CardDescription>Complétez toutes les informations de votre animal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Informations de base */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Informations de base</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nom de l'animal *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Max"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Type d'animal *</label>
                      <select
                        value={formData.type}
                        onChange={(e) =>
                          setFormData({ ...formData, type: e.target.value as "chien" | "chat" })
                        }
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="chien">Chien</option>
                        <option value="chat">Chat</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Race *</label>
                      <input
                        type="text"
                        value={formData.breed}
                        onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                        placeholder="Ex: Golden Retriever"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Âge (années) *</label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                        placeholder="Ex: 3"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Poids (kg) *</label>
                      <input
                        type="number"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })}
                        placeholder="Ex: 30"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                  </div>

                  {/* Photo */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Photo de l'animal</label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Cliquez pour ajouter une photo</p>
                    </div>
                  </div>
                </div>

                {/* Informations médicales */}
                <div className="space-y-4 border-t pt-6">
                  <h3 className="font-semibold">Informations médicales</h3>

                  <div>
                    <label className="block text-sm font-medium mb-2">Vaccinations</label>
                    <input
                      type="text"
                      placeholder="Ex: Rage, DHPP (séparés par des virgules)"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Allergies</label>
                    <input
                      type="text"
                      placeholder="Ex: Poulet, Lait (séparés par des virgules)"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Carnet de vaccination</label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Téléchargez le carnet de vaccination</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Dernière visite vétérinaire</label>
                    <input
                      type="date"
                      value={formData.medicalInfo.lastVetVisit}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          medicalInfo: { ...formData.medicalInfo, lastVetVisit: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>

                {/* Comportement */}
                <div className="space-y-4 border-t pt-6">
                  <h3 className="font-semibold">Comportement et habitudes</h3>

                  <div>
                    <label className="block text-sm font-medium mb-2">Sociabilité</label>
                    <select
                      value={formData.behavior.sociability}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          behavior: {
                            ...formData.behavior,
                            sociability: e.target.value as any,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="très sociable">Très sociable</option>
                      <option value="sociable">Sociable</option>
                      <option value="réservé">Réservé</option>
                      <option value="agressif">Agressif</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Habitudes et caractéristiques</label>
                    <textarea
                      placeholder="Ex: Aime les jeux, sociable avec les autres chiens, peur des feux d'artifice..."
                      className="w-full px-3 py-2 border rounded-md"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Besoins spécifiques */}
                <div className="space-y-4 border-t pt-6">
                  <h3 className="font-semibold">Besoins spécifiques</h3>

                  <div>
                    <label className="block text-sm font-medium mb-2">Régime alimentaire</label>
                    <input
                      type="text"
                      value={formData.specificNeeds.diet}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specificNeeds: { ...formData.specificNeeds, diet: e.target.value },
                        })
                      }
                      placeholder="Ex: Croquettes premium sans céréales"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Exercice recommandé</label>
                    <input
                      type="text"
                      value={formData.specificNeeds.exercises}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specificNeeds: { ...formData.specificNeeds, exercises: e.target.value },
                        })
                      }
                      placeholder="Ex: 2 promenades par jour de 30 minutes"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Notes supplémentaires</label>
                    <textarea
                      value={formData.specificNeeds.notes}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specificNeeds: { ...formData.specificNeeds, notes: e.target.value },
                        })
                      }
                      placeholder="Ex: Adore l'eau, a besoin de beaucoup d'attention..."
                      className="w-full px-3 py-2 border rounded-md"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-6 border-t">
                  <Button onClick={handleSavePet} className="flex-1">
                    <Heart className="w-4 h-4 mr-2" />
                    {editingPet ? "Mettre à jour" : "Ajouter l'animal"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default PetProfile;

