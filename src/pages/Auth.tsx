
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Zap, ArrowLeft, Plus, Trash2, Building, Hospital, User, Lock, Mail, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface Device {
  id: string;
  name: string;
  count: number;
  category: "lifesaving" | "lab" | "general";
  sourceType: string;
}

interface Ward {
  id: string;
  name: string;
  devices: Device[];
}

const Auth = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  
  // Registration form state
  const [hospitalName, setHospitalName] = useState("");
  const [wards, setWards] = useState<Ward[]>([]);
  const [newWard, setNewWard] = useState({ name: "", devices: [] as Device[] });
  const [newDevice, setNewDevice] = useState({
    name: "",
    count: 1,
    category: "general" as "lifesaving" | "lab" | "general",
    sourceType: "Grid"
  });
  const [selectedWardId, setSelectedWardId] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      toast.success("Login successful! Welcome to PAWAKIT Dashboard");
      navigate("/dashboard");
      setIsLoading(false);
    }, 1500);
  };

  const addWard = () => {
    if (!newWard.name.trim()) {
      toast.error("Please enter a ward name");
      return;
    }

    const ward: Ward = {
      id: Date.now().toString(),
      name: newWard.name,
      devices: []
    };

    setWards([...wards, ward]);
    setNewWard({ name: "", devices: [] });
    toast.success("Ward added successfully!");
  };

  const removeWard = (wardId: string) => {
    setWards(wards.filter(ward => ward.id !== wardId));
    toast.success("Ward removed");
  };

  const addDevice = () => {
    if (!newDevice.name.trim() || !selectedWardId) {
      toast.error("Please enter device details and select a ward");
      return;
    }

    const device: Device = {
      id: Date.now().toString(),
      name: newDevice.name,
      count: newDevice.count,
      category: newDevice.category,
      sourceType: newDevice.sourceType
    };

    setWards(wards.map(ward => 
      ward.id === selectedWardId 
        ? { ...ward, devices: [...ward.devices, device] }
        : ward
    ));

    setNewDevice({ name: "", count: 1, category: "general", sourceType: "Grid" });
    toast.success("Device added successfully!");
  };

  const removeDevice = (wardId: string, deviceId: string) => {
    setWards(wards.map(ward => 
      ward.id === wardId 
        ? { ...ward, devices: ward.devices.filter(device => device.id !== deviceId) }
        : ward
    ));
    toast.success("Device removed");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hospitalName.trim()) {
      toast.error("Please enter hospital name");
      return;
    }

    if (wards.length === 0) {
      toast.error("Please add at least one ward");
      return;
    }

    setIsLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      console.log("Registration data:", { hospitalName, wards });
      localStorage.setItem('isLoggedIn', 'true');
      toast.success("Registration successful! Hospital setup completed. Please check your email to verify your account");
      navigate("/dashboard");
      setIsLoading(false);
    }, 1500);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "lifesaving": return "bg-gradient-danger";
      case "lab": return "bg-gradient-info";
      case "general": return "bg-gradient-success";
      default: return "bg-gradient-primary";
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-primary/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 mb-4 transition-colors group">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="font-medium">{t('backToHome')}</span>
          </Link>
          
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-lg opacity-75"></div>
              <div className="relative bg-gradient-primary p-2.5 rounded-xl shadow-glow">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {t('pawakit')}
            </span>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            {t('accessYourDashboard')}
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50 backdrop-blur-sm border border-border/50 p-1 rounded-xl mb-6">
            <TabsTrigger 
              value="login" 
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow font-semibold transition-all duration-300"
            >
              {t('login')}
            </TabsTrigger>
            <TabsTrigger 
              value="register" 
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow font-semibold transition-all duration-300"
            >
              {t('register')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="glass border-primary/20 shadow-modern">
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary/10 border border-primary/20 mb-3">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">{t('login')}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {t('enterCredentials')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4 max-w-sm mx-auto">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-medium flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-primary" />
                      {t('email')}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="doctor@hospital.com"
                      required
                      className="bg-background/50 border-border/50 text-foreground placeholder-muted-foreground focus:border-primary transition-all duration-300 h-10 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground font-medium flex items-center gap-2 text-sm">
                      <Lock className="w-4 h-4 text-primary" />
                      {t('password')}
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      className="bg-background/50 border-border/50 text-foreground focus:border-primary transition-all duration-300 h-10 text-base"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:bg-gradient-accent text-primary-foreground font-semibold transition-all duration-300 h-10 text-base hover:shadow-glow-primary mt-6"
                    disabled={isLoading}
                  >
                    {isLoading ? t('loggingIn') : t('login')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <div className="space-y-6">
              {/* Personal Information */}
              <Card className="glass border-primary/20 shadow-modern">
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary/10 border border-primary/20 mb-3">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">{t('personalInformation')}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {t('createAccount')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4 max-w-lg mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-foreground font-medium text-sm">{t('firstName')}</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          required
                          className="bg-background/50 border-border/50 text-foreground placeholder-muted-foreground focus:border-primary transition-all duration-300 h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-foreground font-medium text-sm">{t('lastName')}</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          required
                          className="bg-background/50 border-border/50 text-foreground placeholder-muted-foreground focus:border-primary transition-all duration-300 h-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground font-medium flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-primary" />
                        {t('email')}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="doctor@hospital.com"
                        required
                        className="bg-background/50 border-border/50 text-foreground placeholder-muted-foreground focus:border-primary transition-all duration-300 h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-foreground font-medium flex items-center gap-2 text-sm">
                        <Shield className="w-4 h-4 text-primary" />
                        {t('role')}
                      </Label>
                      <Select>
                        <SelectTrigger className="bg-background/50 border-border/50 text-foreground focus:border-primary transition-all duration-300 h-10">
                          <SelectValue placeholder={t('selectYourRole')} />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="admin">{t('hospitalAdministrator')}</SelectItem>
                          <SelectItem value="engineer">{t('biomedicalEngineer')}</SelectItem>
                          <SelectItem value="technician">{t('maintenanceTechnician')}</SelectItem>
                          <SelectItem value="doctor">{t('medicalDoctor')}</SelectItem>
                          <SelectItem value="nurse">{t('nurse')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-foreground font-medium flex items-center gap-2 text-sm">
                          <Lock className="w-4 h-4 text-primary" />
                          {t('password')}
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          required
                          className="bg-background/50 border-border/50 text-foreground focus:border-primary transition-all duration-300 h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-foreground font-medium flex items-center gap-2 text-sm">
                          <Lock className="w-4 h-4 text-primary" />
                          {t('confirmPassword')}
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          required
                          className="bg-background/50 border-border/50 text-foreground focus:border-primary transition-all duration-300 h-10"
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Hospital Setup */}
              <Card className="glass border-primary/20 shadow-modern">
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary/10 border border-primary/20 mb-3">
                    <Hospital className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">
                    {t('hospitalSetup')}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {t('setupHospitalWards')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 max-w-lg mx-auto">
                  {/* Hospital Name */}
                  <div className="space-y-2">
                    <Label htmlFor="hospitalName" className="text-foreground font-medium text-base">{t('hospitalName')}</Label>
                    <Input
                      id="hospitalName"
                      placeholder="General Hospital"
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                      required
                      className="bg-background/50 border-border/50 text-foreground placeholder-muted-foreground focus:border-primary transition-all duration-300 h-10 text-base"
                    />
                  </div>

                  {/* Add Ward */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">{t('wards')}</h3>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input
                        placeholder={t('wardName')}
                        value={newWard.name}
                        onChange={(e) => setNewWard({ ...newWard, name: e.target.value })}
                        className="bg-background/50 border-border/50 text-foreground placeholder-muted-foreground focus:border-primary transition-all duration-300 flex-1 h-10"
                      />
                      <Button 
                        onClick={addWard} 
                        className="bg-gradient-primary hover:bg-gradient-accent text-primary-foreground shrink-0 font-semibold transition-all duration-300 h-10 px-4 hover:shadow-glow"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        {t('addWard')}
                      </Button>
                    </div>

                    {/* Ward List */}
                    <div className="space-y-4">
                      {wards.map((ward) => (
                        <Card key={ward.id} className="glass-dark border-border/50">
                          <CardHeader className="pb-3">
                            <CardTitle className="flex items-center justify-between text-foreground text-base">
                              <span className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20">
                                  <Building className="w-3.5 h-3.5 text-primary" />
                                </div>
                                {ward.name}
                              </span>
                              <div className="flex items-center gap-2">
                                <div className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold text-muted-foreground border-border bg-muted/50">
                                  {ward.devices.length} {t('devices')}
                                </div>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => removeWard(ward.id)}
                                  className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-300 h-7 px-2"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {/* Add Device */}
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full border-primary/50 text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-300 h-9 text-sm"
                                  onClick={() => setSelectedWardId(ward.id)}
                                >
                                  <Plus className="w-3.5 h-3.5 mr-2" />
                                  {t('addDevice')}
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="glass border-border max-w-sm">
                                <DialogHeader>
                                  <DialogTitle className="text-foreground text-lg">{t('addDeviceToWard')} {ward.name}</DialogTitle>
                                  <DialogDescription className="text-muted-foreground">
                                    {t('addMedicalEquipment')}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-3">
                                  <div>
                                    <Label htmlFor="deviceName" className="text-foreground font-medium text-sm">{t('deviceName')}</Label>
                                    <Input
                                      id="deviceName"
                                      placeholder={t('deviceNamePlaceholder')}
                                      value={newDevice.name}
                                      onChange={(e) => setNewDevice({...newDevice, name: e.target.value})}
                                      className="bg-background/50 border-border/50 text-foreground placeholder-muted-foreground focus:border-primary transition-all duration-300 h-9"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="deviceCount" className="text-foreground font-medium text-sm">{t('numberOfDevices')}</Label>
                                    <Input
                                      id="deviceCount"
                                      type="number"
                                      min="1"
                                      value={newDevice.count}
                                      onChange={(e) => setNewDevice({...newDevice, count: parseInt(e.target.value) || 1})}
                                      className="bg-background/50 border-border/50 text-foreground focus:border-primary transition-all duration-300 h-9"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="deviceCategory" className="text-foreground font-medium text-sm">{t('category')}</Label>
                                    <Select value={newDevice.category} onValueChange={(value: "lifesaving" | "lab" | "general") => setNewDevice({...newDevice, category: value})}>
                                      <SelectTrigger className="bg-background/50 border-border/50 text-foreground focus:border-primary transition-all duration-300 h-9">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent className="bg-card border-border">
                                        <SelectItem value="lifesaving">{t('lifeSaving')}</SelectItem>
                                        <SelectItem value="lab">{t('laboratory')}</SelectItem>
                                        <SelectItem value="general">{t('generalSupport')}</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label htmlFor="sourceType" className="text-foreground font-medium text-sm">{t('powerSource')}</Label>
                                    <Select value={newDevice.sourceType} onValueChange={(value) => setNewDevice({...newDevice, sourceType: value})}>
                                      <SelectTrigger className="bg-background/50 border-border/50 text-foreground focus:border-primary transition-all duration-300 h-9">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent className="bg-card border-border">
                                        <SelectItem value="Grid">{t('grid')}</SelectItem>
                                        <SelectItem value="UPS">{t('ups')}</SelectItem>
                                        <SelectItem value="Generator">{t('generator')}</SelectItem>
                                        <SelectItem value="Battery">{t('battery')}</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <Button 
                                    onClick={addDevice} 
                                    className="w-full bg-gradient-primary hover:bg-gradient-accent text-primary-foreground font-semibold transition-all duration-300 hover:shadow-glow h-9"
                                  >
                                    {t('addDevice')}
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>

                            {/* Device List */}
                            <div className="space-y-2">
                              {ward.devices.map((device) => (
                                <div key={device.id} className="flex items-center justify-between p-3 bg-background/30 rounded-lg border border-border/30">
                                  <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <div className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold text-white border-0 ${getCategoryColor(device.category)}`}>
                                      {t(device.category)}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <p className="text-foreground font-medium truncate text-sm">{device.name}</p>
                                      <p className="text-muted-foreground text-xs">
                                        {device.count} {t('units')} • {t(device.sourceType.toLowerCase())}
                                      </p>
                                    </div>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeDevice(ward.id, device.id)}
                                    className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground shrink-0 transition-all duration-300 h-6 px-2"
                                  >
                                    <Trash2 className="w-2.5 h-2.5" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Register Button */}
                  <Button 
                    onClick={handleRegister}
                    className="w-full bg-gradient-primary hover:bg-gradient-accent text-primary-foreground font-semibold transition-all duration-300 h-10 text-base hover:shadow-glow-primary mt-6"
                    disabled={isLoading}
                  >
                    {isLoading ? t('creatingAccount') : t('completeRegistration')}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
