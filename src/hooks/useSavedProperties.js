import { useState, useEffect } from "react";

export const useSavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("savedProperties");
    if (saved) {
      setSavedProperties(JSON.parse(saved));
    }
  }, []);

  const saveProperty = (propertyId) => {
    const updated = [...savedProperties, propertyId];
    setSavedProperties(updated);
    localStorage.setItem("savedProperties", JSON.stringify(updated));
  };

  const unsaveProperty = (propertyId) => {
    const updated = savedProperties.filter(id => id !== propertyId);
    setSavedProperties(updated);
    localStorage.setItem("savedProperties", JSON.stringify(updated));
  };

  const isSaved = (propertyId) => {
    return savedProperties.includes(propertyId);
  };

  return {
    savedProperties,
    saveProperty,
    unsaveProperty,
    isSaved,
  };
};