import Label from "@/components/atoms/Label";
import Button from "@/components/atoms/Button";

const BedroomFilter = ({ value, onChange, max = 5 }) => {
  const options = [
    { value: 0, label: "Any" },
    ...Array.from({ length: max }, (_, i) => ({
      value: i + 1,
      label: i + 1 === max ? `${max}+` : `${i + 1}`
    }))
  ];

  return (
    <div className="space-y-3">
      <Label>Bedrooms</Label>
      <div className="grid grid-cols-3 gap-2">
        {options.map((option) => (
          <Button
            key={option.value}
            variant={value === option.value ? "primary" : "secondary"}
            size="sm"
            onClick={() => onChange(option.value)}
            className="text-xs"
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BedroomFilter;