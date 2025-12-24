import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Zap, AlertTriangle, TrendingUp, Users, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LiveMonitoring } from "@/components/LiveMonitoring";
import { HospitalManager } from "@/components/HospitalManager";
import { deviceSimulator } from "@/services/deviceSimulator";
import { DataExporter } from "@/utils/dataExport";
import { formatHospitalName } from "@/lib/utils";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface SimulatedData {
  voltage: number;
  current: number;
  temperature: number;
  power: number;
  pricePerUnitTZS: number;
  timestamp: Date;
  riskLevel: 'high' | 'medium' | 'low';
}

interface Device {
  id: number;
  name: string;
  count: number;
  category: 'lifesaving' | 'lab' | 'general';
  powerUsage: number;
  sourceType: string;
  load: number;
  status: 'normal' | 'alert';
  previousPower: number;
  ppm: number;
  simulatedData?: SimulatedData;
}

interface Ward {
  id: number;
  name: string;
  devices: Device[];
}

interface HospitalData {
  id: number;
  name: string;
  wards: Ward[];
}

const Dashboard = () => {
  const [hospitals, setHospitals] = useState<HospitalData[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isLoggedIn, loading, logout, session } = useAuth();
  const runningSimulationsRef = useRef<Set<number>>(new Set());

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    if (!isLoggedIn) {
      navigate('/pawakit-auth', { replace: true });
      return;
    }

    // Load hospital data from Supabase user metadata (fallback to localStorage)
    const loadHospitals = async () => {
      try {
        // If user is logged in, prefer metadata on auth.user
        if (session?.user) {
          const meta = session.user.user_metadata?.hospitalData;
          if (meta) {
            const parsed = typeof meta === 'string' ? JSON.parse(meta) : meta;
            if (Array.isArray(parsed)) {
              const validatedHospitals = parsed.map(h => ({
                ...h,
                address: h.address || '',
                contact: h.contact || '',
                name: formatHospitalName(h.name),
                wards: Array.isArray(h.wards) ? h.wards.map(w => ({ ...w, devices: Array.isArray(w.devices) ? w.devices : [] })) : []
              }));
              setHospitals(validatedHospitals);
              setIsLoading(false);
              return;
            }
          }
          // If metadata not present, try fetching fresh user data
          const { data: userResult } = await supabase.auth.getUser();
          const userMeta = userResult?.user?.user_metadata?.hospitalData;
          if (userMeta) {
            const parsed = typeof userMeta === 'string' ? JSON.parse(userMeta) : userMeta;
            if (Array.isArray(parsed)) {
              const validatedHospitals = parsed.map(h => ({
                ...h,
                address: h.address || '',
                contact: h.contact || '',
                name: formatHospitalName(h.name),
                wards: Array.isArray(h.wards) ? h.wards.map(w => ({ ...w, devices: Array.isArray(w.devices) ? w.devices : [] })) : []
              }));
              setHospitals(validatedHospitals);
              setIsLoading(false);
              return;
            }
          }
        }

        // Fallback to localStorage
        const savedHospitals = localStorage.getItem('hospitalData');
        if (savedHospitals) {
          const parsedHospitals = JSON.parse(savedHospitals);
          const validatedHospitals = Array.isArray(parsedHospitals)
            ? parsedHospitals.map(h => ({
                ...h,
                address: h.address || '',
                contact: h.contact || '',
                name: formatHospitalName(h.name),
                wards: Array.isArray(h.wards) ? h.wards.map(w => ({ ...w, devices: Array.isArray(w.devices) ? w.devices : [] })) : []
              }))
            : [];
          setHospitals(validatedHospitals);
        }
      } catch (error) {
        console.error('Failed to load hospital data:', error);
        toast({ title: 'Error', description: 'Failed to load hospital data', variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
    };

    loadHospitals();
  }, [isLoggedIn, loading, navigate]);

  // Save hospital data to localStorage whenever it changes
  useEffect(() => {
    if (hospitals.length > 0) {
      localStorage.setItem('hospitalData', JSON.stringify(hospitals));
    }

    // If user is logged in, also persist to Supabase user metadata
    const saveToUserMeta = async () => {
      try {
        if (isLoggedIn && session?.user) {
          await supabase.auth.updateUser({ data: { hospitalData: hospitals } });
        }
      } catch (e) {
        console.error('Failed to save hospital data to user metadata', e);
      }
    };

    saveToUserMeta();
  }, [hospitals]);

  useEffect(() => {
    const allDevices = hospitals.flatMap((hospital) =>
      hospital.wards.flatMap((ward) => ward.devices)
    );

    const nextIds = new Set(allDevices.map((d) => d.id));

    // Stop simulations that no longer exist
    runningSimulationsRef.current.forEach((id) => {
      if (!nextIds.has(id)) {
        deviceSimulator.stopSimulation(id);
        runningSimulationsRef.current.delete(id);
      }
    });

    // Start simulations for new devices
    allDevices.forEach((device) => {
      if (runningSimulationsRef.current.has(device.id)) return;

      runningSimulationsRef.current.add(device.id);
      deviceSimulator.startSimulation(device.id, device.category, (data: SimulatedData) => {
        setHospitals((prev) =>
          prev.map((h) => ({
            ...h,
            wards: h.wards.map((w) => ({
              ...w,
              devices: w.devices.map((d) =>
                d.id === device.id
                  ? { ...d, simulatedData: data, status: data.riskLevel === 'high' ? 'alert' : 'normal' }
                  : d
              ),
            })),
          }))
        );
      });
    });
  }, [hospitals]);

  useEffect(() => {
    return () => {
      deviceSimulator.stopAllSimulations();
      runningSimulationsRef.current.clear();
    };
  }, []);

  const totalDevices = hospitals.reduce((acc, hospital) =>
    acc + hospital.wards.reduce((wardAcc, ward) =>
      wardAcc + ward.devices.reduce((deviceAcc, device) => deviceAcc + device.count, 0), 0), 0);

  const alertDevices = hospitals.reduce((acc, hospital) =>
    acc + hospital.wards.reduce((wardAcc, ward) =>
      wardAcc + ward.devices.filter(device => device.status === 'alert').length, 0), 0);

  const avgPowerUsage = hospitals.length > 0 ?
    hospitals.reduce((acc, hospital) =>
      acc + hospital.wards.reduce((wardAcc, ward) =>
        wardAcc + ward.devices.reduce((deviceAcc, device) => deviceAcc + device.powerUsage, 0), 0), 0) /
    hospitals.reduce((acc, hospital) =>
      acc + hospital.wards.reduce((wardAcc, ward) => wardAcc + ward.devices.length, 0), 1) : 0;

  const handleExportData = (format: 'csv' | 'excel') => {
    try {
      const data = hospitals.flatMap(hospital =>
        hospital.wards.flatMap(ward =>
          ward.devices.map(device => ({
            id: device.id,
            name: device.name,
            category: device.category,
            ward: ward.name,
            hospital: hospital.name,
            voltage: device.simulatedData?.voltage,
            current: device.simulatedData?.current,
            temperature: device.simulatedData?.temperature,
            power: device.simulatedData?.power,
            pricePerUnitTZS: device.simulatedData?.pricePerUnitTZS,
            riskLevel: device.simulatedData?.riskLevel,
            status: device.status,
            timestamp: new Date().toISOString()
          }))
        )
      );

      if (format === 'csv') {
        DataExporter.exportToCSV(data, 'hospital-devices');
      } else {
        DataExporter.exportToExcel(data, 'hospital-devices');
      }

      toast({
        title: "Export Successful",
        description: `Data exported as ${format.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export data",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (loading) {
    return null;
  }

  if (!isLoggedIn) {
    return null;
  }

  const registeredHospitalName = hospitals?.[0]?.name
    ? formatHospitalName(hospitals[0].name)
    : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Live Dashboard
              </h1>
              {registeredHospitalName && (
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  {registeredHospitalName}
                </h2>
              )}
              <p className="text-xl text-muted-foreground max-w-2xl">
                Monitor and manage your hospital's energy infrastructure in real-time
              </p>
              <div className="mt-4">
                <Link to="/docs/overview" className="text-sm text-primary font-medium">Learn more about PAWAKIT</Link>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Select onValueChange={(value: 'csv' | 'excel') => handleExportData(value)}>
                <SelectTrigger className="w-[140px] bg-muted/50 border-border/50 backdrop-blur-sm">
                  <SelectValue placeholder="Export" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="csv">Export CSV</SelectItem>
                  <SelectItem value="excel">Export Excel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="group glass hover-lift border-primary/20 transition-all duration-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Devices</CardTitle>
                <div className="p-2 rounded-lg bg-gradient-primary/10 border border-primary/20">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-2">{totalDevices}</div>
                <p className="text-sm text-muted-foreground flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-success" />
                  across all wards
                </p>
              </CardContent>
            </Card>
            
            <Card className="group glass hover-lift border-destructive/20 transition-all duration-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Alerts</CardTitle>
                <div className="p-2 rounded-lg bg-gradient-danger/10 border border-destructive/20">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-destructive mb-2">{alertDevices}</div>
                <p className="text-sm text-muted-foreground flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-destructive" />
                  requiring attention
                </p>
              </CardContent>
            </Card>
            
            <Card className="group glass hover-lift border-success/20 transition-all duration-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Power Usage</CardTitle>
                <div className="p-2 rounded-lg bg-gradient-success/10 border border-success/20">
                  <Zap className="h-5 w-5 text-success" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-2">{avgPowerUsage.toFixed(1)}W</div>
                <p className="text-sm text-muted-foreground flex items-center">
                  <Users className="w-4 h-4 mr-2 text-success" />
                  per device
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="monitoring" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50 backdrop-blur-sm border border-border/50 p-1 rounded-xl">
            <TabsTrigger 
              value="monitoring" 
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow font-semibold transition-all duration-300"
            >
              Live Monitoring
            </TabsTrigger>
            <TabsTrigger 
              value="management" 
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow font-semibold transition-all duration-300"
            >
              Hospital Management
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="monitoring" className="space-y-6 mt-8">
            <LiveMonitoring hospitals={hospitals} />
          </TabsContent>
          
          <TabsContent value="management" className="space-y-6 mt-8">
            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2">Loading hospital data...</span>
              </div>
            ) : (
              <HospitalManager 
                hospitals={hospitals} 
                setHospitals={setHospitals} 
              />
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;