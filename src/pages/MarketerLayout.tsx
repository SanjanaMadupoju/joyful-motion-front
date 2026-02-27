import MarketerChat from "@/components/MarketerChat";
import MarketerDashboard from "@/pages/MarketerDashboard";

const MarketerLayout = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 space-y-8 pb-12">
        <MarketerChat />
        <MarketerDashboard embedded />
      </div>
    </div>
  );
};

export default MarketerLayout;
