import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Gift } from "lucide-react";

export const NotificationBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-primary text-white py-2 md:py-3 px-4 relative z-40">
      <div className="container mx-auto flex items-center justify-center gap-2 md:gap-3 text-xs md:text-sm">
        <Gift className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
        <span className="font-medium text-center">
          🎉 Offre de lancement : -20% sur votre première promenade avec le code WELCOME20
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 md:right-4 h-5 w-5 md:h-6 md:w-6 text-white hover:bg-white/20 flex-shrink-0"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-3 w-3 md:h-4 md:w-4" />
        </Button>
      </div>
    </div>
  );
};
