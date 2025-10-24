import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, MapPin, Users, Heart } from "lucide-react";

interface SearchFormProps {
  className?: string;
  compact?: boolean;
}

const SearchForm = ({ className = "", compact = false }: SearchFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    petType: "dog",
    serviceType: "boarding",
    address: "",
    startDate: "",
    endDate: "",
    dogSize: "",
    isDog: true,
    isCat: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to search results with query params
    const params = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) params.append(key, value.toString());
    });
    navigate(`/search?${params.toString()}`);
  };

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className={`dogwalking-card p-6 ${className}`}>
        <div className="space-y-4">
          {/* Pet Selection */}
          <div>
            <Label className="text-sm font-medium mb-2 block">
              Je cherche un service pour mon :
            </Label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <Checkbox 
                  checked={formData.isDog}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, isDog: checked as boolean }))
                  }
                />
                <span>Chien</span>
              </label>
              <label className="flex items-center space-x-2">
                <Checkbox 
                  checked={formData.isCat}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, isCat: checked as boolean }))
                  }
                />
                <span>Chat</span>
              </label>
            </div>
          </div>

          {/* Service Type */}
          <div>
            <Label className="text-sm font-medium mb-2 block">
              Quel service avez-vous besoin ?
            </Label>
            <select
              value={formData.serviceType}
              onChange={(e) => setFormData(prev => ({ ...prev, serviceType: e.target.value }))}
              className="dogwalking-input w-full"
            >
              <option value="boarding">Hébergement • chez le promeneur certifié</option>
              <option value="house-sitting">Garde à domicile • chez vous</option>
              <option value="drop-in">Visites à domicile • visites chez vous</option>
              <option value="doggy-daycare">Garderie • chez le promeneur certifié</option>
              <option value="dog-walking">Promenade • dans votre quartier</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <Label className="text-sm font-medium mb-2 block">
              Quelle est votre adresse ?
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Entrez votre adresse"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className="dogwalking-input pl-10"
              />
            </div>
          </div>

          <Button type="submit" className="dogwalking-button-secondary w-full">
            Rechercher
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`dogwalking-card p-8 ${className}`}>
      <div className="space-y-6">
        {/* Pet Type Selection */}
        <div>
          <Label className="text-lg font-semibold mb-4 block">
            Je cherche un service pour mon :
          </Label>
          <div className="flex space-x-6">
            <label className="flex items-center space-x-3 cursor-pointer">
              <Checkbox 
                checked={formData.isDog}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, isDog: checked as boolean }))
                }
                className="w-5 h-5"
              />
              <span className="text-lg">Chien</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <Checkbox 
                checked={formData.isCat}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, isCat: checked as boolean }))
                }
                className="w-5 h-5"
              />
              <span className="text-lg">Chat</span>
            </label>
          </div>
        </div>

        {/* Service Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-base font-medium mb-3 block">
              Quand vous êtes absent
            </Label>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="serviceType"
                  value="boarding"
                  checked={formData.serviceType === "boarding"}
                  onChange={(e) => setFormData(prev => ({ ...prev, serviceType: e.target.value }))}
                  className="w-4 h-4"
                />
                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-dogwalking-green" />
                  <span>Hébergement</span>
                </div>
              </label>
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="serviceType"
                  value="house-sitting"
                  checked={formData.serviceType === "house-sitting"}
                  onChange={(e) => setFormData(prev => ({ ...prev, serviceType: e.target.value }))}
                  className="w-4 h-4"
                />
                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-dogwalking-green" />
                  <span>Garde à domicile</span>
                </div>
              </label>
            </div>
          </div>

          <div>
            <Label className="text-base font-medium mb-3 block">
              Quand vous êtes au travail
            </Label>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="serviceType"
                  value="drop-in"
                  checked={formData.serviceType === "drop-in"}
                  onChange={(e) => setFormData(prev => ({ ...prev, serviceType: e.target.value }))}
                  className="w-4 h-4"
                />
                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-dogwalking-green" />
                  <span>Visites à domicile</span>
                </div>
              </label>
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="serviceType"
                  value="doggy-daycare"
                  checked={formData.serviceType === "doggy-daycare"}
                  onChange={(e) => setFormData(prev => ({ ...prev, serviceType: e.target.value }))}
                  className="w-4 h-4"
                />
                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-dogwalking-green" />
                  <span>Garderie pour chien</span>
                </div>
              </label>
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="serviceType"
                  value="dog-walking"
                  checked={formData.serviceType === "dog-walking"}
                  onChange={(e) => setFormData(prev => ({ ...prev, serviceType: e.target.value }))}
                  className="w-4 h-4"
                />
                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-dogwalking-green" />
                  <span>Promenade de chien</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Address and Dates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="text-base font-medium mb-2 block">Adresse</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Ajoutez votre adresse"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className="dogwalking-input pl-10"
              />
            </div>
          </div>

          <div>
            <Label className="text-base font-medium mb-2 block">Début</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="dogwalking-input pl-10"
              />
            </div>
          </div>

          <div>
            <Label className="text-base font-medium mb-2 block">Fin</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="dogwalking-input pl-10"
              />
            </div>
          </div>
        </div>

        {/* Dog Size Selection */}
        {formData.isDog && (
          <div>
            <Label className="text-base font-medium mb-4 block">Taille de mon chien</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: "small", label: "Petit", weight: "0 - 7 kg" },
                { value: "medium", label: "Moyen", weight: "7 - 18 kg" },
                { value: "large", label: "Grand", weight: "18 - 45 kg" },
                { value: "giant", label: "Géant", weight: "45+ kg" },
              ].map((size) => (
                <label
                  key={size.value}
                  className="flex flex-col items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="dogSize"
                    value={size.value}
                    checked={formData.dogSize === size.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, dogSize: e.target.value }))}
                    className="mb-2"
                  />
                  <span className="font-medium">{size.label}</span>
                  <span className="text-sm text-gray-500">{size.weight}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button type="submit" className="dogwalking-button-secondary w-full md:w-auto px-12 py-4 text-lg">
          Rechercher
        </Button>

        {/* Trustpilot */}
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-green-500">★</span>
            ))}
          </div>
          <span>24,000+ avis sur</span>
          <span className="font-semibold">Trustpilot</span>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;