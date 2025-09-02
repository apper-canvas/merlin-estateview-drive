import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { formatPrice, formatNumber } from "@/utils/formatters";
import { useSavedProperties } from "@/hooks/useSavedProperties";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const { isSaved, saveProperty, unsaveProperty } = useSavedProperties();
  const saved = isSaved(property.Id);

  const handleSaveToggle = (e) => {
    e.stopPropagation();
    if (saved) {
      unsaveProperty(property.Id);
      toast.success("Property removed from saved");
    } else {
      saveProperty(property.Id);
      toast.success("Property saved successfully");
    }
  };

  const handleCardClick = () => {
    navigate(`/property/${property.Id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden cursor-pointer group" onClick={handleCardClick}>
        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden">
            <img 
              src={property.images[0]} 
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Price badge */}
          <div className="absolute top-3 left-3">
            <Badge variant="accent" className="text-base font-bold px-3 py-1.5 shadow-lg">
              {formatPrice(property.price)}
            </Badge>
          </div>
          
          {/* Save button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 bg-white/90 hover:bg-white text-neutral-600 hover:text-error p-2 rounded-full shadow-lg"
            onClick={handleSaveToggle}
          >
            <ApperIcon 
              name="Heart" 
              className={`h-5 w-5 transition-all duration-200 ${saved ? "fill-error text-error" : ""}`} 
            />
          </Button>
          
          {/* Status badge */}
          {property.status && (
            <div className="absolute bottom-3 left-3">
              <Badge 
                variant={property.status === "for-sale" ? "success" : "primary"}
                className="shadow-lg"
              >
                {property.status === "for-sale" ? "For Sale" : "For Rent"}
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-display font-semibold text-lg text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {property.title}
          </h3>
          
          <p className="text-sm text-neutral-600 mb-3 flex items-center gap-1">
            <ApperIcon name="MapPin" className="h-4 w-4" />
            {property.address}, {property.city}, {property.state}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-neutral-600">
              <div className="flex items-center gap-1">
                <ApperIcon name="Bed" className="h-4 w-4" />
                <span>{property.bedrooms} bed</span>
              </div>
              <div className="flex items-center gap-1">
                <ApperIcon name="Bath" className="h-4 w-4" />
                <span>{property.bathrooms} bath</span>
              </div>
              <div className="flex items-center gap-1">
                <ApperIcon name="Square" className="h-4 w-4" />
                <span>{formatNumber(property.sqft)} sqft</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default PropertyCard;