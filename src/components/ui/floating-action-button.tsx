import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Calendar } from "lucide-react";

export const FloatingActionButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const actions = [
    {
      icon: Calendar,
      label: "Réserver",
      action: () => window.location.href = '/auth',
      color: "bg-sage hover:bg-sage/90"
    },
    {
      icon: MessageCircle,
      label: "Chat",
      action: () => window.location.href = '#contact',
      color: "bg-ocean hover:bg-ocean/90"
    },
    {
      icon: Phone,
      label: "Appeler",
      action: () => window.location.href = 'tel:0123456789',
      color: "bg-earthy hover:bg-earthy/90"
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Actions secondaires */}
      {isExpanded && (
        <div className="flex flex-col gap-3 mb-3">
          {actions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 animate-fade-in-right"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="bg-white text-sm font-medium px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
                  {action.label}
                </span>
                <Button
                  size="icon"
                  className={`w-12 h-12 rounded-full shadow-lg ${action.color} text-white hover-lift`}
                  onClick={action.action}
                >
                  <IconComponent className="w-5 h-5" />
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {/* Bouton principal */}
      <Button
        size="icon"
        className={`w-14 h-14 rounded-full shadow-lg bg-gradient-primary text-white hover:shadow-xl transition-all duration-300 ${
          isExpanded ? 'rotate-45' : ''
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-2xl">🐕</span>
      </Button>
    </div>
  );
};
