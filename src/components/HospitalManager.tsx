import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Activity, Plus, Hospital, Building, Trash2, Edit, PlusCircle, X } from "lucide-react";
import { Link } from 'react-router-dom';
import { toast } from "sonner";
import { formatHospitalName } from "@/lib/utils";

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
  serialNumber?: string;
  modelNumber?: string;
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
  address?: string;
  contact?: string;
  wards: Ward[];
}

interface HospitalManagerProps {
  hospitals: HospitalData[];
  setHospitals: (hospitals: HospitalData[]) => void;
}

export const HospitalManager = ({ hospitals, setHospitals }: HospitalManagerProps) => {
  const [activeTab, setActiveTab] = useState('hospitals');
  const [selectedHospital, setSelectedHospital] = useState<HospitalData | null>(null);
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null);
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
  const [newDevice, setNewDevice] = useState({
    name: "",
    count: 1,
    category: "lifesaving" as "lifesaving" | "lab" | "general",
    sourceType: "Grid",
    serialNumber: "",
    modelNumber: "",
  });
  const [isAddHospitalOpen, setIsAddHospitalOpen] = useState(false);
  const [isAddWardOpen, setIsAddWardOpen] = useState(false);
  const [newHospital, setNewHospital] = useState({ name: '', address: '', contact: '' });
  const [newWard, setNewWard] = useState({ name: '' });
  const [expandedWard, setExpandedWard] = useState<number | null>(null);

  // Set the first hospital as selected by default
  useEffect(() => {
    if (hospitals.length > 0 && !selectedHospital) {
      setSelectedHospital(hospitals[0]);
      setActiveTab('wards');
    } else if (hospitals.length === 0) {
      setSelectedHospital(null);
      setSelectedWard(null);
    }
  }, [hospitals, selectedHospital]);

  // Set the first ward as selected when hospital changes
  useEffect(() => {
    if (selectedHospital?.wards?.length > 0 && !selectedWard) {
      setSelectedWard(selectedHospital.wards[0]);
      setActiveTab('devices');
    }
  }, [selectedHospital, selectedWard]);

  // Handle adding a new hospital
  const handleAddHospital = () => {
    if (!newHospital.name.trim()) {
      toast.error('Hospital name is required');
      return;
    }
    
    const newHospitalData: HospitalData = {
      id: Date.now(),
      name: formatHospitalName(newHospital.name),
      address: newHospital.address.trim(),
      contact: newHospital.contact.trim(),
      wards: []
    };
    
    const updatedHospitals = [...hospitals, newHospitalData];
    setHospitals(updatedHospitals);
    setSelectedHospital(newHospitalData);
    setNewHospital({ name: '', address: '', contact: '' });
    setIsAddHospitalOpen(false);
    setActiveTab('wards');
    setIsAddWardOpen(true);
    
    toast.success('Hospital created. Next: add wards.');
  };

  // Handle adding a new ward
  const handleAddWard = () => {
    if (!selectedHospital) {
      toast.error('Please select a hospital first');
      return;
    }
    
    if (!newWard.name.trim()) {
      toast.error('Ward name is required');
      return;
    }
    
    const ward: Ward = {
      id: Date.now(),
      name: newWard.name.trim(),
      devices: []
    };
    
    const updatedHospitals = hospitals.map(h => 
      h.id === selectedHospital.id
        ? { ...h, wards: [...(h.wards || []), ward] }
        : h
    );
    
    setHospitals(updatedHospitals);
    setSelectedWard(ward);
    setNewWard({ name: '' });
    setIsAddWardOpen(false);
    setActiveTab('devices');
    setIsAddDeviceOpen(true);
    toast.success('Ward added. Next: add devices.');
  };

  // Handle adding a new device
  const handleAddDevice = () => {
    if (!selectedWard) {
      toast.error('Please select a ward first');
      return;
    }

    if (!newDevice.name.trim()) {
      toast.error('Device name is required');
      return;
    }

    if (!newDevice.serialNumber.trim()) {
      toast.error('Serial number is required');
      return;
    }

    if (!newDevice.modelNumber.trim()) {
      toast.error('Model number is required');
      return;
    }

    const powerUsage = Math.round(25 + Math.random() * 55);
    const device: Device = {
      id: Date.now(),
      name: newDevice.name.trim(),
      count: Math.max(1, newDevice.count || 1),
      category: newDevice.category,
      powerUsage,
      sourceType: newDevice.sourceType,
      load: Math.round(20 + Math.random() * 70),
      status: 'normal',
      previousPower: powerUsage,
      ppm: Math.round(50 + Math.random() * 200),
      serialNumber: newDevice.serialNumber.trim(),
      modelNumber: newDevice.modelNumber.trim(),
    };

    const updatedHospitals = hospitals.map(hospital => ({
      ...hospital,
      wards: hospital.wards.map(ward => {
        if (ward.id === selectedWard.id) {
          return {
            ...ward,
            devices: [...ward.devices, device]
          };
        }
        return ward;
      })
    }));

    setHospitals(updatedHospitals);
    setNewDevice({ name: '', count: 1, category: 'lifesaving', sourceType: 'Grid', serialNumber: '', modelNumber: '' });
    setIsAddDeviceOpen(false);
    toast.success('Device added successfully with serial and model numbers.');
  };

  const handleRemoveWard = (wardId: number) => {
    if (!selectedHospital) return;

    const updatedHospitals = hospitals.map((h) =>
      h.id === selectedHospital.id ? { ...h, wards: h.wards.filter((w) => w.id !== wardId) } : h
    );
    setHospitals(updatedHospitals);

    if (selectedWard?.id === wardId) {
      setSelectedWard(null);
      setActiveTab('wards');
    }

    toast.success('Ward removed');
  };

  const handleRemoveDevice = (deviceId: number) => {
    if (!selectedHospital || !selectedWard) return;

    const updatedHospitals = hospitals.map((h) => ({
      ...h,
      wards: h.wards.map((w) =>
        w.id === selectedWard.id ? { ...w, devices: w.devices.filter((d) => d.id !== deviceId) } : w
      ),
    }));

    setHospitals(updatedHospitals);
    toast.success('Device removed');
  };

  const handleRemoveDeviceFromWard = (wardId: number, deviceId: number) => {
    if (!selectedHospital) return;

    const updatedHospitals = hospitals.map((h) => ({
      ...h,
      wards: h.wards.map((w) =>
        w.id === wardId ? { ...w, devices: w.devices.filter((d) => d.id !== deviceId) } : w
      ),
    }));

    setHospitals(updatedHospitals);
    toast.success('Device removed');
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "lifesaving": return "bg-red-500";
      case "lab": return "bg-blue-500";
      case "general": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  // Render empty state if no hospitals exist
  if (hospitals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="bg-muted p-6 rounded-full mb-4">
          <Hospital className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No Hospitals Found</h3>
        <p className="text-muted-foreground mb-6">
          Get started by adding your first hospital
        </p>
        <Button onClick={() => setIsAddHospitalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Hospital
        </Button>

        <Dialog open={isAddHospitalOpen} onOpenChange={setIsAddHospitalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Hospital</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="hospitalNameEmpty" className="text-right">
                  Name *
                </Label>
                <Input
                  id="hospitalNameEmpty"
                  value={newHospital.name}
                  onChange={(e) => setNewHospital({ ...newHospital, name: e.target.value })}
                  className="col-span-3"
                  placeholder="Enter hospital name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="hospitalAddressEmpty" className="text-right">
                  Address
                </Label>
                <Input
                  id="hospitalAddressEmpty"
                  value={newHospital.address}
                  onChange={(e) => setNewHospital({ ...newHospital, address: e.target.value })}
                  className="col-span-3"
                  placeholder="Enter hospital address"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="hospitalContactEmpty" className="text-right">
                  Contact
                </Label>
                <Input
                  id="hospitalContactEmpty"
                  value={newHospital.contact}
                  onChange={(e) => setNewHospital({ ...newHospital, contact: e.target.value })}
                  className="col-span-3"
                  placeholder="Enter contact information"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddHospitalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" onClick={handleAddHospital}>
                Add Hospital
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Hospital Management</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
          <TabsTrigger value="wards" disabled={!selectedHospital}>Wards</TabsTrigger>
          <TabsTrigger value="devices" disabled={!selectedHospital}>Devices</TabsTrigger>
        </TabsList>

        <TabsContent value="hospitals">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Hospitals</h3>
              <div className="flex items-center gap-2">
                <Link to="/docs/hospitals" className="text-sm text-muted-foreground hover:text-foreground">Learn more</Link>
                <Button onClick={() => setIsAddHospitalOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Hospital
                </Button>
              </div>
            </div>
            
            {hospitals.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No hospitals found. Add your first hospital to get started.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {hospitals.map((hospital) => (
                  <Card key={hospital.id} className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => {
                      setSelectedHospital(hospital);
                      setActiveTab('wards');
                    }}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{formatHospitalName(hospital.name)}</CardTitle>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardDescription>{hospital.address}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Building className="mr-2 h-4 w-4" />
                        {hospital.wards.length} {hospital.wards.length === 1 ? 'Ward' : 'Wards'}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="wards">
          {selectedHospital && (
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">Wards in {formatHospitalName(selectedHospital.name)}</h3>
                  <p className="text-sm text-muted-foreground">Manage wards for {formatHospitalName(selectedHospital.name)} — create and organize wards where devices will be placed for monitoring.</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link to="/docs/wards" className="text-sm text-muted-foreground hover:text-foreground">Learn more</Link>
                  <Button onClick={() => setIsAddWardOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Ward
                  </Button>
                </div>
              </div>
              
              {selectedHospital.wards.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No wards found. Add your first ward to get started.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {selectedHospital.wards.map((ward) => (
                    <Card key={ward.id} className="cursor-pointer hover:bg-accent/50 transition-colors"
                      onClick={() => {
                        setSelectedWard(ward);
                        setActiveTab('devices');
                      }}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{ward.name}</CardTitle>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveWard(ward.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Activity className="mr-2 h-4 w-4" />
                          {ward.devices.length} {ward.devices.length === 1 ? 'Device' : 'Devices'}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="devices">
          {selectedHospital && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-medium">Device Management</h3>
                <p className="text-sm text-muted-foreground">Select a ward to view and manage devices. Add serial numbers and model numbers during device registration.</p>
              </div>

              {selectedHospital.wards.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No wards found. Add a ward first.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedHospital.wards.map((ward) => (
                    <Card key={ward.id} className="overflow-hidden">
                      <div 
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-accent/50 transition-colors"
                        onClick={() => setExpandedWard(expandedWard === ward.id ? null : ward.id)}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <Building className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{ward.name}</p>
                            <p className="text-sm text-muted-foreground">{ward.devices.length} device{ward.devices.length !== 1 ? 's' : ''}</p>
                          </div>
                        </div>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedWard(ward);
                            setIsAddDeviceOpen(true);
                          }}
                          size="sm"
                          className="mr-2"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Device
                        </Button>
                        <svg
                          className={`h-5 w-5 text-muted-foreground transition-transform ${expandedWard === ward.id ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>

                      {expandedWard === ward.id && ward.devices.length > 0 && (
                        <div className="border-t px-4 py-3 space-y-3 bg-muted/30">
                          {ward.devices.map((device) => (
                            <Card key={device.id} className="border bg-background">
                              <CardHeader className="pb-3">
                                <div className="flex justify-between items-start gap-3">
                                  <div className="flex-1">
                                    <CardTitle className="text-base">{device.name}</CardTitle>
                                    <CardDescription className="mt-1">
                                      {device.count} unit{device.count !== 1 ? 's' : ''}
                                    </CardDescription>
                                  </div>
                                  <Badge variant={device.status === 'alert' ? 'destructive' : 'default'}>
                                    {device.status}
                                  </Badge>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  <Badge variant="outline" className="text-xs">{device.category}</Badge>
                                  <Badge variant="outline" className="text-xs">{device.sourceType}</Badge>
                                </div>
                              </CardHeader>
                              <CardContent className="space-y-3">
                                <div className="grid grid-cols-2 gap-4 text-sm border-b pb-3">
                                  {device.serialNumber && (
                                    <div>
                                      <p className="text-muted-foreground text-xs font-medium mb-1">Serial Number</p>
                                      <p className="font-mono font-semibold text-foreground">{device.serialNumber}</p>
                                    </div>
                                  )}
                                  {device.modelNumber && (
                                    <div>
                                      <p className="text-muted-foreground text-xs font-medium mb-1">Model Number</p>
                                      <p className="font-mono font-semibold text-foreground">{device.modelNumber}</p>
                                    </div>
                                  )}
                                </div>

                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => handleRemoveDeviceFromWard(ward.id, device.id)}
                                  >
                                    <Trash2 className="h-3 w-3 mr-1" />
                                    Remove
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}

                      {expandedWard === ward.id && ward.devices.length === 0 && (
                        <div className="border-t px-4 py-4 text-center text-sm text-muted-foreground bg-muted/30">
                          No devices in this ward yet.
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={isAddHospitalOpen} onOpenChange={setIsAddHospitalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Hospital</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hospitalName2" className="text-right">
                Name *
              </Label>
              <Input
                id="hospitalName2"
                value={newHospital.name}
                onChange={(e) => setNewHospital({ ...newHospital, name: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleAddHospital()}
                className="col-span-3"
                placeholder="Enter hospital name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hospitalAddress2" className="text-right">
                Address
              </Label>
              <Input
                id="hospitalAddress2"
                value={newHospital.address}
                onChange={(e) => setNewHospital({ ...newHospital, address: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleAddHospital()}
                className="col-span-3"
                placeholder="Enter hospital address"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hospitalContact2" className="text-right">
                Contact
              </Label>
              <Input
                id="hospitalContact2"
                value={newHospital.contact}
                onChange={(e) => setNewHospital({ ...newHospital, contact: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleAddHospital()}
                className="col-span-3"
                placeholder="Enter contact information"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddHospitalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleAddHospital}>
              Add Hospital
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddWardOpen} onOpenChange={setIsAddWardOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Ward</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="wardName" className="text-right">
                Name *
              </Label>
              <Input
                id="wardName"
                value={newWard.name}
                onChange={(e) => setNewWard({ name: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleAddWard()}
                className="col-span-3"
                placeholder="Enter ward name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddWardOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleAddWard}>
              Add Ward
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddDeviceOpen} onOpenChange={setIsAddDeviceOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add New Device</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p className="text-sm text-muted-foreground">Add a device to {selectedWard ? `${selectedWard.name} ward` : 'the selected ward'}. All device details will be saved in the database.</p>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deviceName2" className="text-right">
                Name *
              </Label>
              <Input
                id="deviceName2"
                value={newDevice.name}
                onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleAddDevice()}
                className="col-span-3"
                placeholder="e.g., ICU Monitor"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="serialNumber" className="text-right">
                Serial # *
              </Label>
              <Input
                id="serialNumber"
                value={newDevice.serialNumber}
                onChange={(e) => setNewDevice({ ...newDevice, serialNumber: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleAddDevice()}
                className="col-span-3"
                placeholder="e.g., SN-2025-001"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="modelNumber" className="text-right">
                Model # *
              </Label>
              <Input
                id="modelNumber"
                value={newDevice.modelNumber}
                onChange={(e) => setNewDevice({ ...newDevice, modelNumber: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleAddDevice()}
                className="col-span-3"
                placeholder="e.g., M-5000-X"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deviceCount" className="text-right">
                Count
              </Label>
              <Input
                id="deviceCount"
                type="number"
                min="1"
                value={newDevice.count}
                onChange={(e) => setNewDevice({ ...newDevice, count: parseInt(e.target.value) || 1 })}
                onKeyDown={(e) => e.key === 'Enter' && handleAddDevice()}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Category</Label>
              <div className="col-span-3">
                <Select
                  value={newDevice.category}
                  onValueChange={(value: 'lifesaving' | 'lab' | 'general') =>
                    setNewDevice({ ...newDevice, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lifesaving">Life-saving</SelectItem>
                    <SelectItem value="lab">Laboratory</SelectItem>
                    <SelectItem value="general">General Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Power Source</Label>
              <div className="col-span-3">
                <Select value={newDevice.sourceType} onValueChange={(value) => setNewDevice({ ...newDevice, sourceType: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Grid">Grid</SelectItem>
                    <SelectItem value="UPS">UPS</SelectItem>
                    <SelectItem value="Generator">Generator</SelectItem>
                    <SelectItem value="Battery">Battery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDeviceOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleAddDevice}>
              Add Device
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
