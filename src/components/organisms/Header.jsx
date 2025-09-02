import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";
import { useSavedProperties } from "@/hooks/useSavedProperties";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { savedProperties } = useSavedProperties();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/properties?search=${encodeURIComponent(query)}`);
    }
  };

  const navItems = [
    { to: "/properties", label: "Properties", icon: "Home" },
    { to: "/map", label: "Map View", icon: "MapPin" },
    { to: "/saved", label: "Saved", icon: "Heart", badge: savedProperties.length },
  ];

  const isActive = (path) => {
    if (path === "/properties") return location.pathname === "/" || location.pathname === "/properties";
    return location.pathname === path;
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <ApperIcon name="Home" className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  EstateView
                </h1>
              </div>
            </Link>

            {/* Desktop Search */}
            <div className="hidden lg:block flex-1 max-w-xl mx-8">
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.to} to={item.to}>
                  <Button
                    variant={isActive(item.to) ? "primary" : "ghost"}
                    size="md"
                    className="relative gap-2"
                  >
                    <ApperIcon name={item.icon} className="h-5 w-5" />
                    {item.label}
                    {item.badge > 0 && (
                      <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full min-w-[1.25rem] h-5 flex items-center justify-center px-1 font-medium">
                        {item.badge}
                      </span>
                    )}
                  </Button>
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} className="h-6 w-6" />
            </Button>
          </div>

          {/* Mobile Search */}
          <div className="lg:hidden pb-4">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-neutral-200">
              <h2 className="text-lg font-semibold text-neutral-900">Menu</h2>
              <Button
                variant="ghost"
                size="sm"
                className="p-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ApperIcon name="X" className="h-5 w-5" />
              </Button>
            </div>
            
            <nav className="p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive(item.to) 
                      ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white" 
                      : "text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  <ApperIcon name={item.icon} className="h-5 w-5" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge > 0 && (
                    <span className="bg-accent-500 text-white text-xs rounded-full min-w-[1.25rem] h-5 flex items-center justify-center px-1 font-medium">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Header;