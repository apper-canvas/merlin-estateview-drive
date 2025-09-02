import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { propertyService } from "@/services/api/propertyService";
import { formatPrice } from "@/utils/formatters";
import { useNavigate } from "react-router-dom";

const MapViewPage = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await propertyService.getAll();
      setProperties(data);
    } catch (err) {
      setError("Failed to load properties. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Loading count={6} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error message={error} onRetry={loadProperties} />
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Empty title="No properties available" message="There are currently no properties to display on the map." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-display font-bold text-neutral-900 mb-8">
          Map View
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="h-full p-8 flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                  <ApperIcon name="MapPin" className="h-12 w-12 text-primary-600" />
                </div>
                <h3 className="text-2xl font-display font-semibold text-neutral-900 mb-3">
                  Interactive Map
                </h3>
                <p className="text-neutral-600 mb-6 max-w-md">
                  In a full implementation, this would show an interactive map with property markers, 
                  clustering, and detailed location information.
                </p>
                <div className="space-y-3 text-sm text-neutral-500">
                  <div className="flex items-center justify-center gap-2">
                    <ApperIcon name="Layers" className="h-4 w-4" />
                    <span>Property markers and clustering</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <ApperIcon name="Search" className="h-4 w-4" />
                    <span>Search and filter by location</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <ApperIcon name="Navigation" className="h-4 w-4" />
                    <span>Directions and nearby amenities</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Property List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-900">
              All Properties ({properties.length})
            </h3>
            <div className="space-y-3 overflow-y-auto max-h-[520px] pr-2">
              {properties.map((property) => (
                <motion.div
                  key={property.Id}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className={`p-4 cursor-pointer transition-all duration-200 ${
                      selectedProperty?.Id === property.Id
                        ? "ring-2 ring-primary-500 bg-primary-50"
                        : "hover:shadow-elevation"
                    }`}
                    onClick={() => setSelectedProperty(property)}
                  >
                    <div className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-semibold text-neutral-900 text-sm line-clamp-1">
                            {property.title}
                          </h4>
                          <Badge
                            variant="accent"
                            className="text-xs px-2 py-1 whitespace-nowrap"
                          >
                            {formatPrice(property.price)}
                          </Badge>
                        </div>
                        <p className="text-xs text-neutral-600 mb-2 line-clamp-1">
                          {property.address}, {property.city}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-neutral-500">
                          <span className="flex items-center gap-1">
                            <ApperIcon name="Bed" className="h-3 w-3" />
                            {property.bedrooms}
                          </span>
                          <span className="flex items-center gap-1">
                            <ApperIcon name="Bath" className="h-3 w-3" />
                            {property.bathrooms}
                          </span>
                          <span className="flex items-center gap-1">
                            <ApperIcon name="Square" className="h-3 w-3" />
                            {property.sqft}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Selected Property Actions */}
            {selectedProperty && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 border-t border-neutral-200"
              >
                <div className="space-y-2">
                  <Button
                    onClick={() => navigate(`/property/${selectedProperty.Id}`)}
                    className="w-full gap-2"
                    size="sm"
                  >
                    <ApperIcon name="Eye" className="h-4 w-4" />
                    View Details
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-full gap-2"
                    size="sm"
                    onClick={() => {
                      // In a real app, this would center the map on the property
                      console.log("Focus on property:", selectedProperty.title);
                    }}
                  >
                    <ApperIcon name="MapPin" className="h-4 w-4" />
                    Show on Map
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MapViewPage;