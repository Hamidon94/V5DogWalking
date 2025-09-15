import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Gift } from "lucide-react";

export const NotificationBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-primary text-white py-3 px-4 relative">
      <div className="container mx-auto flex items-center justify-center gap-3 text-sm">
        <Gift className="w-4 h-4" />
        <span className="font-medium">
          🎉 Offre de lancement : -20% sur votre première promenade avec le code WELCOME20
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 h-6 w-6 text-white hover:bg-white/20"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
