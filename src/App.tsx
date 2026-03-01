import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Login from "./pages/Login";
import MarketerLayout from "./pages/MarketerLayout";
import MarketerChat from "./components/MarketerChat";
import MarketerDashboard from "./pages/MarketerDashboard";
import MarketerDeals from "./pages/MarketerDeals";
import MarketerCreative from "./pages/MarketerCreative";
import MarketerInfluencers from "./pages/MarketerInfluencers";
import InfluencerDashboard from "./pages/InfluencerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/marketer" element={<MarketerLayout />}>
            <Route index element={<Navigate to="chat" replace />} />
            <Route path="chat" element={<MarketerChat />} />
            <Route path="dashboard" element={<MarketerDashboard embedded />} />
            <Route path="deals" element={<MarketerDeals />} />
            <Route path="creative" element={<MarketerCreative />} />
            <Route path="influencers" element={<MarketerInfluencers />} />
          </Route>
          <Route path="/influencer" element={<InfluencerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
