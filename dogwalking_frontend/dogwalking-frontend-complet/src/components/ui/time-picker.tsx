import * as React from "react";
import { Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimePickerProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function TimePicker({
  value,
  onValueChange,
  placeholder = "Sélectionner l'heure",
  disabled = false,
  className
}: TimePickerProps) {
  // Generate time slots from 6:00 to 22:00 with 30-minute intervals
  const timeSlots = React.useMemo(() => {
    const slots = [];
    for (let hour = 6; hour <= 22; hour++) {
      for (let minute of [0, 30]) {
        if (hour === 22 && minute === 30) break; // Stop at 22:00
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push({
          value: timeString,
          label: timeString
        });
      }
    }
    return slots;
  }, []);

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={className}>
        <div className="flex items-center">
          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent>
        {timeSlots.map((slot) => (
          <SelectItem key={slot.value} value={slot.value}>
            {slot.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}