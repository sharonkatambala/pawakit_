
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import PawakitAuth from "./pages/PawakitAuth";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Overview from "./pages/docs/Overview";
import HospitalsDocs from "./pages/docs/Hospitals";
import WardsDocs from "./pages/docs/Wards";
import DevicesDocs from "./pages/docs/Devices";
import LiveMonitoring from "./pages/docs/LiveMonitoring";
import SmartAlerts from "./pages/docs/SmartAlerts";
import PatientSafety from "./pages/docs/PatientSafety";
import PowerAnalytics from "./pages/docs/PowerAnalytics";
import PredictiveMaintenance from "./pages/docs/PredictiveMaintenance";
import { WelcomePopup } from "@/components/WelcomePopup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/pawakit-auth" element={<PawakitAuth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/docs" element={<Overview />} />
              <Route path="/docs/overview" element={<Overview />} />
              <Route path="/docs/hospitals" element={<HospitalsDocs />} />
              <Route path="/docs/wards" element={<WardsDocs />} />
              <Route path="/docs/devices" element={<DevicesDocs />} />
              <Route path="/docs/live-monitoring" element={<LiveMonitoring />} />
              <Route path="/docs/smart-alerts" element={<SmartAlerts />} />
              <Route path="/docs/patient-safety" element={<PatientSafety />} />
              <Route path="/docs/power-analytics" element={<PowerAnalytics />} />
              <Route path="/docs/predictive-maintenance" element={<PredictiveMaintenance />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <WelcomePopup />
          </AuthProvider>
        </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
