import { motion, AnimatePresence } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import PriceRange from "@/components/molecules/PriceRange";
import PropertyTypeFilter from "@/components/molecules/PropertyTypeFilter";
import BedroomFilter from "@/components/molecules/BedroomFilter";
import ApperIcon from "@/components/ApperIcon";

const FilterSidebar = ({ isOpen, onClose, filters, onFiltersChange, onClearFilters }) => {
  const propertyTypes = [
    { value: "house", label: "House" },
    { value: "apartment", label: "Apartment" },
    { value: "condo", label: "Condo" },
    { value: "townhouse", label: "Townhouse" },
    { value: "loft", label: "Loft" },
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const sidebarContent = (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-6 border-b border-neutral-200">
        <h2 className="text-xl font-display font-semibold text-neutral-900">Filters</h2>
        <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden p-2">
          <ApperIcon name="X" className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <PriceRange
          value={filters.priceRange}
          onChange={(value) => handleFilterChange("priceRange", value)}
        />
        
        <PropertyTypeFilter
          options={propertyTypes}
          value={filters.propertyTypes}
          onChange={(value) => handleFilterChange("propertyTypes", value)}
        />
        
        <BedroomFilter
          value={filters.bedroomsMin}
          onChange={(value) => handleFilterChange("bedroomsMin", value)}
        />
        
        <BedroomFilter
          value={filters.bathroomsMin}
          onChange={(value) => handleFilterChange("bathroomsMin", value)}
          max={4}
        />
      </div>
      
      <div className="p-6 border-t border-neutral-200 space-y-3">
        <Button onClick={onClearFilters} variant="secondary" className="w-full">
          <ApperIcon name="RotateCcw" className="h-4 w-4" />
          Clear All Filters
        </Button>
        <Button onClick={onClose} className="w-full lg:hidden">
          Apply Filters
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Card className="h-full sticky top-24">
          {sidebarContent}
        </Card>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
            onClick={onClose}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {sidebarContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterSidebar;