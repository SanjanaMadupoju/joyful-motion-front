import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { MarketerSidebar } from "@/components/MarketerSidebar";

const MarketerLayout = () => {
  return (
    <div className="pt-16">
      <SidebarProvider>
        <div className="min-h-[calc(100vh-4rem)] flex w-full">
          <MarketerSidebar />
          <div className="flex-1 flex flex-col">
            <header className="h-12 flex items-center border-b border-border/50">
              <SidebarTrigger className="ml-2" />
            </header>
            <main className="flex-1 p-6 overflow-y-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default MarketerLayout;
