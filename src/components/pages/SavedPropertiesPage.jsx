import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PropertyGrid from "@/components/organisms/PropertyGrid";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useSavedProperties } from "@/hooks/useSavedProperties";
import { propertyService } from "@/services/api/propertyService";
import { useNavigate } from "react-router-dom";

const SavedPropertiesPage = () => {
  const navigate = useNavigate();
  const { savedProperties } = useSavedProperties();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSavedProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (savedProperties.length === 0) {
        setProperties([]);
        return;
      }

      const allProperties = await propertyService.getAll();
      const savedPropertiesData = allProperties.filter(property => 
        savedProperties.includes(property.Id)
      );
      setProperties(savedPropertiesData);
    } catch (err) {
      setError("Failed to load saved properties. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSavedProperties();
  }, [savedProperties]);

  const handleBrowseProperties = () => {
    navigate("/properties");
  };

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
        <Error message={error} onRetry={loadSavedProperties} />
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
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">
            Saved Properties
          </h1>
          <p className="text-neutral-600">
            {properties.length > 0 
              ? `You have ${properties.length} saved ${properties.length === 1 ? "property" : "properties"}`
              : "Your saved properties will appear here"
            }
          </p>
        </div>

        {properties.length === 0 ? (
          <Empty
            title="No saved properties yet"
            message="Start saving properties you're interested in to keep track of them and compare them later. Click the heart icon on any property to save it."
            action={handleBrowseProperties}
            actionText="Browse Properties"
          />
        ) : (
          <PropertyGrid
            properties={properties}
            loading={loading}
            error={error}
            onRetry={loadSavedProperties}
          />
        )}
      </motion.div>
    </div>
  );
};

export default SavedPropertiesPage;