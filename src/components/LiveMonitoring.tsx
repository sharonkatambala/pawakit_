import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Activity, Zap, Battery, Gauge, Thermometer, TrendingUp, TrendingDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SimulatedData {
  voltage: number;
  current: number;
  temperature: number;
  power: number;
  pricePerUnitTZS: number;
  riskLevel: 'high' | 'medium' | 'low';
}

interface Device {
  id: number;
  name: string;
  count: number;
  category: "lifesaving" | "lab" | "general";
  powerUsage: number;
  sourceType: string;
  load: number;
  status: "normal" | "alert";
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

interface LiveMonitoringProps {
  hospitals: HospitalData[];
}

export const LiveMonitoring = ({ hospitals }: LiveMonitoringProps) => {
  const { t } = useLanguage();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "lifesaving": return "bg-gradient-danger";
      case "lab": return "bg-gradient-info";
      case "general": return "bg-gradient-success";
      default: return "bg-gradient-primary";
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "high": return "bg-gradient-danger text-white";
      case "medium": return "bg-gradient-warning text-white";
      case "low": return "bg-gradient-success text-white";
      default: return "bg-gradient-primary text-white";
    }
  };

  const getSourceIcon = (sourceType: string) => {
    switch (sourceType.toLowerCase()) {
      case "grid": return <Zap className="w-5 h-5" />;
      case "ups": return <Battery className="w-5 h-5" />;
      case "generator": return <Activity className="w-5 h-5" />;
      case "battery": return <Battery className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    return status === "alert" ? "text-destructive" : "text-success";
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) {
      return <TrendingUp className="w-4 h-4 text-destructive" />;
    } else if (current < previous) {
      return <TrendingDown className="w-4 h-4 text-success" />;
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {hospitals.map((hospital) => (
        <Card key={hospital.id} className="glass border-primary/20 shadow-modern">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-gradient-primary rounded-full"></div>
              <CardTitle className="text-2xl font-bold text-foreground">{hospital.name}</CardTitle>
            </div>
            <CardDescription className="text-lg text-muted-foreground">
              Real-time monitoring across all wards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {hospital.wards.map((ward) => (
                <div key={ward.id} className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <h3 className="text-xl font-semibold text-gradient border-b border-primary/20 pb-2">
                      {ward.name} Ward
                    </h3>
                  </div>
                  
                  <div className="grid gap-6">
                    {ward.devices.map((device) => (
                      <Card key={device.id} className="glass-dark border-border/50 hover-lift transition-all duration-500">
                        <CardHeader className="pb-4">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-foreground flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                                {getSourceIcon(device.sourceType)}
                              </div>
                              <span className="text-lg font-semibold">{device.name}</span>
                            </CardTitle>
                            <div className="flex items-center gap-3">
                              <Badge className={`${getCategoryColor(device.category)} text-white border-0`}>
                                {t(device.category)}
                              </Badge>
                              {device.simulatedData && (
                                <Badge className={`${getRiskColor(device.simulatedData.riskLevel)} border-0`}>
                                  {t(device.simulatedData.riskLevel)}
                                </Badge>
                              )}
                              <Badge 
                                variant={device.status === "alert" ? "destructive" : "default"}
                                className={`${
                                  device.status === "alert" 
                                    ? "bg-gradient-danger text-white border-0" 
                                    : "bg-gradient-success text-white border-0"
                                }`}
                              >
                                {device.status === "alert" && <AlertTriangle className="w-3 h-3 mr-1" />}
                                {t(device.status)}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {device.simulatedData ? (
                            // Real-time parameters display matching the first image
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                              {/* Voltage - Yellow theme */}
                              <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 border border-yellow-500/30 rounded-xl p-4 space-y-3">
                                <div className="flex items-center gap-2 text-yellow-400">
                                  <Zap className="w-5 h-5" />
                                  <span className="text-sm font-medium">Voltage</span>
                                </div>
                                <div className="text-2xl font-bold text-white">
                                  {device.simulatedData.voltage}V
                                </div>
                                <div className="w-full bg-yellow-900/40 rounded-full h-2">
                                  <div 
                                    className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${(device.simulatedData.voltage / 240) * 100}%` }}
                                  ></div>
                                </div>
                              </div>

                              {/* Current - Blue theme */}
                              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-500/30 rounded-xl p-4 space-y-3">
                                <div className="flex items-center gap-2 text-blue-400">
                                  <Activity className="w-5 h-5" />
                                  <span className="text-sm font-medium">Current</span>
                                </div>
                                <div className="text-2xl font-bold text-white">
                                  {device.simulatedData.current}A
                                </div>
                                <div className="w-full bg-blue-900/40 rounded-full h-2">
                                  <div 
                                    className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min((device.simulatedData.current / 15) * 100, 100)}%` }}
                                  ></div>
                                </div>
                              </div>

                              {/* Temperature - Red theme */}
                              <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 border border-red-500/30 rounded-xl p-4 space-y-3">
                                <div className="flex items-center gap-2 text-red-400">
                                  <Thermometer className="w-5 h-5" />
                                  <span className="text-sm font-medium">Temperature</span>
                                </div>
                                <div className="text-2xl font-bold text-white">
                                  {device.simulatedData.temperature}°C
                                </div>
                                <div className="w-full bg-red-900/40 rounded-full h-2">
                                  <div 
                                    className="bg-gradient-to-r from-red-500 to-red-400 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${(device.simulatedData.temperature / 50) * 100}%` }}
                                  ></div>
                                </div>
                              </div>

                              {/* Power - Green theme */}
                              <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-500/30 rounded-xl p-4 space-y-3">
                                <div className="flex items-center gap-2 text-green-400">
                                  <Gauge className="w-5 h-5" />
                                  <span className="text-sm font-medium">Power</span>
                                </div>
                                <div className="text-2xl font-bold text-white">
                                  {device.simulatedData.power}W
                                </div>
                                <div className="w-full bg-green-900/40 rounded-full h-2">
                                  <div 
                                    className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${(device.simulatedData.power / 3000) * 100}%` }}
                                  ></div>
                                </div>
                              </div>

                              {/* Price per Unit - Purple theme */}
                              <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-500/30 rounded-xl p-4 space-y-3">
                                <div className="flex items-center gap-2 text-purple-400">
                                  <span className="text-sm font-bold">TZS</span>
                                  <span className="text-sm font-medium">Price per Unit</span>
                                </div>
                                <div className="text-2xl font-bold text-white">
                                  {device.simulatedData.pricePerUnitTZS}/kWh
                                </div>
                                <div className="text-xs text-purple-300">
                                  Current market rate
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="grid md:grid-cols-3 gap-6">
                              {/* Power Usage */}
                              <div className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground font-medium">Power Usage</span>
                                  <span className="text-sm font-medium text-foreground">{device.powerUsage}%</span>
                                </div>
                                <Progress 
                                  value={device.powerUsage} 
                                  className="h-2 bg-primary/20" 
                                />
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>Previous: {device.previousPower}%</span>
                                  {getTrendIcon(device.powerUsage, device.previousPower)}
                                  <span className={device.powerUsage > device.previousPower ? "text-destructive" : "text-success"}>
                                    {Math.abs(device.powerUsage - device.previousPower)}%
                                  </span>
                                </div>
                              </div>

                              {/* Load */}
                              <div className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-info/10 to-info/5 border border-info/20">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground font-medium">Load</span>
                                  <span className="text-sm font-medium text-foreground">{device.load}%</span>
                                </div>
                                <Progress 
                                  value={device.load} 
                                  className="h-2 bg-info/20" 
                                />
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Gauge className="w-3 h-3" />
                                  <span>Source: {device.sourceType}</span>
                                </div>
                              </div>

                              {/* Device Info */}
                              <div className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-muted/10 to-muted/5 border border-border/50">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground font-medium">Device Count</span>
                                  <span className="text-sm font-medium text-foreground">{device.count} units</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground font-medium">PPM</span>
                                  <span className="text-sm font-medium text-foreground">{device.ppm}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground font-medium">Status</span>
                                  <span className={`text-sm font-medium ${getStatusColor(device.status)}`}>
                                    {device.status === "alert" ? "Attention Required" : "Operational"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
