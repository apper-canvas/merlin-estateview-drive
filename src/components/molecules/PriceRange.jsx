import { useState, useEffect } from "react";
import Label from "@/components/atoms/Label";
import { formatPrice } from "@/utils/formatters";

const PriceRange = ({ min = 0, max = 2000000, value, onChange, step = 50000 }) => {
  const [localMin, setLocalMin] = useState(value?.min || min);
  const [localMax, setLocalMax] = useState(value?.max || max);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange({ min: localMin, max: localMax });
    }, 300);
    return () => clearTimeout(timer);
  }, [localMin, localMax, onChange]);

  return (
    <div className="space-y-4">
      <Label>Price Range</Label>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm text-neutral-600">
          <span>{formatPrice(localMin)}</span>
          <span>{formatPrice(localMax)}</span>
        </div>
        <div className="relative">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={localMin}
            onChange={(e) => setLocalMin(parseInt(e.target.value))}
            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer z-10"
            style={{ background: "transparent" }}
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={localMax}
            onChange={(e) => setLocalMax(parseInt(e.target.value))}
            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer z-20"
            style={{ background: "transparent" }}
          />
          <div className="relative h-2 bg-neutral-200 rounded-lg">
            <div 
              className="absolute h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg"
              style={{
                left: `${(localMin - min) / (max - min) * 100}%`,
                width: `${(localMax - localMin) / (max - min) * 100}%`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRange;