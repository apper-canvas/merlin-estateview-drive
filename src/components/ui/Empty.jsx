import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No properties found", 
  message = "We couldn't find any properties matching your criteria. Try adjusting your filters or search terms.",
  action,
  actionText = "Clear Filters"
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center mb-6">
        <ApperIcon name="Home" className="h-10 w-10 text-primary-500" />
      </div>
      <h3 className="text-2xl font-display font-semibold text-neutral-900 mb-3">{title}</h3>
      <p className="text-neutral-600 mb-8 text-center max-w-md leading-relaxed">{message}</p>
      {action && (
        <Button onClick={action} variant="primary" size="lg" className="gap-2">
          <ApperIcon name="Filter" className="h-5 w-5" />
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default Empty;