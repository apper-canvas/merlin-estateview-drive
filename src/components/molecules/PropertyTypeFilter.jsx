import { useState } from "react";
import Label from "@/components/atoms/Label";

const PropertyTypeFilter = ({ options, value = [], onChange }) => {
  const handleToggle = (type) => {
    const updated = value.includes(type) 
      ? value.filter(t => t !== type)
      : [...value, type];
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <Label>Property Type</Label>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={value.includes(option.value)}
                onChange={() => handleToggle(option.value)}
                className="w-5 h-5 rounded border-2 border-neutral-300 text-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
              />
            </div>
            <span className="text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PropertyTypeFilter;