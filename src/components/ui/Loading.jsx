import Card from "@/components/atoms/Card";

const LoadingSkeleton = () => (
  <Card className="overflow-hidden">
    <div className="animate-pulse">
      <div className="aspect-[4/3] bg-neutral-200" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-neutral-200 rounded-lg w-3/4" />
        <div className="h-4 bg-neutral-200 rounded-lg w-1/2" />
        <div className="flex gap-4">
          <div className="h-4 bg-neutral-200 rounded-lg w-16" />
          <div className="h-4 bg-neutral-200 rounded-lg w-16" />
          <div className="h-4 bg-neutral-200 rounded-lg w-16" />
        </div>
      </div>
    </div>
  </Card>
);

const Loading = ({ count = 6, type = "grid" }) => {
  if (type === "detail") {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="aspect-[16/10] bg-neutral-200 rounded-xl mb-6" />
          <div className="space-y-4">
            <div className="h-8 bg-neutral-200 rounded-lg w-2/3" />
            <div className="h-6 bg-neutral-200 rounded-lg w-1/2" />
            <div className="flex gap-6">
              <div className="h-6 bg-neutral-200 rounded-lg w-20" />
              <div className="h-6 bg-neutral-200 rounded-lg w-20" />
              <div className="h-6 bg-neutral-200 rounded-lg w-24" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-neutral-200 rounded-lg" />
              <div className="h-4 bg-neutral-200 rounded-lg" />
              <div className="h-4 bg-neutral-200 rounded-lg w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <LoadingSkeleton key={i} />
      ))}
    </div>
  );
};

export default Loading;