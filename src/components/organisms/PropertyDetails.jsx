import { motion } from "framer-motion";
import { useSavedProperties } from "@/hooks/useSavedProperties";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { formatDate, formatNumber, formatPrice } from "@/utils/formatters";
import ApperIcon from "@/components/ApperIcon";
import ImageGallery from "@/components/molecules/ImageGallery";
import Select from "@/components/atoms/Select";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const PropertyDetails = ({ property }) => {
  const { isSaved, saveProperty, unsaveProperty } = useSavedProperties();
  const saved = isSaved(property.Id);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleSaveToggle = () => {
    if (saved) {
      unsaveProperty(property.Id);
      toast.success("Property removed from saved");
    } else {
      saveProperty(property.Id);
      toast.success("Property saved successfully");
    }
  };

const handleContact = () => {
    // Simulate phone call initiation
    const agentPhone = property?.agent?.phone || "555-0123";
    window.location.href = `tel:${agentPhone}`;
    toast.success("Initiating call to agent...");
  };

  const handleMessage = () => {
    // Open email client for messaging
    const agentEmail = property?.agent?.email || "agent@example.com";
    const subject = `Inquiry about ${property?.title || 'Property'}`;
    const body = `Hi, I'm interested in learning more about this property: ${property?.title || 'Property'}. Please contact me at your earliest convenience.`;
    window.location.href = `mailto:${agentEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast.success("Opening email client...");
  };

const handleScheduleTour = () => {
    setShowScheduleModal(true);
  };

  const handleCloseModal = () => {
    setShowScheduleModal(false);
    setSelectedDate("");
    setSelectedTime("");
  };

  const handleSubmitTour = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time");
      return;
    }

    // Validate date is not in the past
    const selectedDateTime = new Date(selectedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDateTime < today) {
      toast.error("Please select a future date");
      return;
    }

    // Simulate scheduling (in real app, this would call an API)
    const tourData = {
      propertyId: property.Id,
      propertyTitle: property.title,
      date: selectedDate,
      time: selectedTime,
      scheduledAt: new Date().toISOString()
    };
    
    // Store in localStorage for demo purposes
    const existingTours = JSON.parse(localStorage.getItem('scheduledTours') || '[]');
    existingTours.push(tourData);
    localStorage.setItem('scheduledTours', JSON.stringify(existingTours));

    toast.success(`Tour scheduled for ${new Date(selectedDate).toLocaleDateString()} at ${selectedTime}`);
    handleCloseModal();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const details = [
    { icon: "Bed", label: "Bedrooms", value: property.bedrooms },
    { icon: "Bath", label: "Bathrooms", value: property.bathrooms },
    { icon: "Square", label: "Square Feet", value: formatNumber(property.sqft) },
    { icon: "Calendar", label: "Year Built", value: property.yearBuilt },
    { icon: "Car", label: "Parking", value: property.parking },
    { icon: "MapPin", label: "ZIP Code", value: property.zipCode },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Image Gallery */}
      <ImageGallery images={property.images} alt={property.title} />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <Badge 
              variant={property.status === "for-sale" ? "success" : "primary"}
              className="text-sm px-3 py-1"
            >
              {property.status === "for-sale" ? "For Sale" : "For Rent"}
            </Badge>
            <span className="text-sm text-neutral-500">
              Listed {formatDate(property.listedDate)}
            </span>
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
            {property.title}
          </h1>
          
          <div className="flex items-center gap-2 text-neutral-600 mb-4">
            <ApperIcon name="MapPin" className="h-5 w-5" />
            <span className="text-lg">{property.address}, {property.city}, {property.state}</span>
          </div>
          
          <div className="text-4xl font-bold bg-gradient-to-r from-accent-500 to-accent-600 bg-clip-text text-transparent">
            {formatPrice(property.price)}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
          <Button onClick={handleSaveToggle} variant={saved ? "secondary" : "outline"} size="lg" className="gap-2">
            <ApperIcon 
              name="Heart" 
              className={`h-5 w-5 ${saved ? "fill-error text-error" : ""}`} 
            />
            {saved ? "Saved" : "Save Property"}
          </Button>
          <Button onClick={handleScheduleTour} variant="accent" size="lg" className="gap-2">
            <ApperIcon name="Calendar" className="h-5 w-5" />
            Schedule Tour
          </Button>
          <Button onClick={handleContact} size="lg" className="gap-2">
            <ApperIcon name="Phone" className="h-5 w-5" />
            Contact Agent
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Property Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Key Details Grid */}
          <Card className="p-6">
            <h2 className="text-xl font-display font-semibold text-neutral-900 mb-6">Property Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {details.map((detail, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
                    <ApperIcon name={detail.icon} className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-sm text-neutral-500">{detail.label}</div>
                    <div className="font-semibold text-neutral-900">{detail.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Description */}
          <Card className="p-6">
            <h2 className="text-xl font-display font-semibold text-neutral-900 mb-4">Description</h2>
            <p className="text-neutral-700 leading-relaxed">{property.description}</p>
          </Card>

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <Card className="p-6">
              <h2 className="text-xl font-display font-semibold text-neutral-900 mb-6">Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <ApperIcon name="Check" className="h-5 w-5 text-success" />
                    <span className="text-neutral-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Map placeholder */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Location</h3>
            <div className="aspect-square bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <ApperIcon name="MapPin" className="h-12 w-12 text-primary-500 mx-auto mb-2" />
                <p className="text-sm text-neutral-600">Interactive Map</p>
                <p className="text-xs text-neutral-500">Would show property location</p>
              </div>
            </div>
            <p className="text-sm text-neutral-600">
              {property.address}<br />
              {property.city}, {property.state} {property.zipCode}
            </p>
          </Card>

          {/* Contact Form */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Contact Agent</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                  <ApperIcon name="User" className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">Sarah Johnson</div>
                  <div className="text-sm text-neutral-600">Real Estate Agent</div>
                </div>
              </div>
              <Button onClick={handleContact} className="w-full gap-2">
                <ApperIcon name="Phone" className="h-4 w-4" />
                Call Now
              </Button>
<Button onClick={handleMessage} variant="secondary" className="w-full gap-2">
                <ApperIcon name="Mail" className="h-4 w-4" />
                Send Message
              </Button>
            </div>
</Card>
        </div>
      </div>

      {/* Schedule Tour Modal */}
      {showScheduleModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl shadow-elevation max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-display font-semibold text-neutral-900">
                  Schedule Tour
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleCloseModal}
                  className="p-2 h-8 w-8"
                >
                  <ApperIcon name="X" className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <p className="text-neutral-600 text-sm mb-4">
                  Schedule a tour for <strong>{property.title}</strong>
                </p>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} // Tomorrow
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Preferred Time
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select a time</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                    <option value="6:00 PM">6:00 PM</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleCloseModal}
                    variant="secondary"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmitTour}
                    variant="primary"
                    className="flex-1 gap-2"
                  >
                    <ApperIcon name="Calendar" className="h-4 w-4" />
                    Schedule Tour
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default PropertyDetails;