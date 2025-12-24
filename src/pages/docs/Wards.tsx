import React from 'react';
import { Link } from 'react-router-dom';
import { Hospital, List } from 'lucide-react';

const WardsDocs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <List className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Wards — organizing tips</h1>
        </div>

        <p className="text-muted-foreground mb-4">Wards represent logical groups for devices. Think in terms of response teams and physical location.</p>

        <div className="grid gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-semibold">Naming</h3>
            <p className="text-sm text-muted-foreground">Include department and location (e.g., "ICU — East Wing") so staff can act quickly on alerts.</p>
          </div>

          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-semibold">Device placement</h3>
            <p className="text-sm text-muted-foreground">Add devices to the ward where they are physically located to keep monitoring accurate.</p>
          </div>

          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-semibold">Reporting</h3>
            <p className="text-sm text-muted-foreground">Wards can be used to filter dashboard views and generate targeted reports for specific teams.</p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Link to="/dashboard" className="inline-block px-3 py-2 rounded-md bg-primary text-primary-foreground">Open Wards</Link>
          <Link to="/docs/devices" className="inline-block px-3 py-2 rounded-md border">Devices guide</Link>
        </div>
      </div>
    </div>
  );
};

export default WardsDocs;
