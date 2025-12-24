import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Building, Activity } from 'lucide-react';

const Overview = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-2">Get started with PAWAKIT</h1>
        <p className="text-muted-foreground mb-6">
          Lightweight hospital power monitoring — register sites, create wards and add devices to
          start seeing live metrics on the dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="p-6 rounded-lg border bg-card">
          <div className="flex items-center gap-3 mb-3">
            <Building className="w-6 h-6 text-primary" />
            <h3 className="font-semibold">Hospitals</h3>
          </div>
          <p className="text-sm text-muted-foreground">Register your facility with a clear name, contact and address. This name appears across PAWAKIT.</p>
          <div className="mt-4">
            <Link to="/docs/hospitals" className="text-sm text-primary font-medium">Learn about hospitals →</Link>
          </div>
        </div>

        <div className="p-6 rounded-lg border bg-card">
          <div className="flex items-center gap-3 mb-3">
            <Activity className="w-6 h-6 text-primary" />
            <h3 className="font-semibold">Wards</h3>
          </div>
          <p className="text-sm text-muted-foreground">Create wards to group devices by department (ICU, Theater, Labs). Wards help target alerts and reports.</p>
          <div className="mt-4">
            <Link to="/docs/wards" className="text-sm text-primary font-medium">Learn about wards →</Link>
          </div>
        </div>

        <div className="p-6 rounded-lg border bg-card">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-6 h-6 text-primary" />
            <h3 className="font-semibold">Devices</h3>
          </div>
          <p className="text-sm text-muted-foreground">Add devices (e.g., UPS, Fridge, Ventilator). PAWAKIT simulates voltage, current, temperature and power for each device.</p>
          <div className="mt-4">
            <Link to="/docs/devices" className="text-sm text-primary font-medium">Learn about devices →</Link>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link to="/dashboard" className="inline-block bg-gradient-to-r from-primary to-yellow-400 text-primary-foreground px-4 py-2 rounded-md font-semibold">Open Dashboard</Link>
      </div>
    </div>
  );
};

export default Overview;
