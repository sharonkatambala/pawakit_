import React from 'react';
import { Link } from 'react-router-dom';
import { Building, CheckCircle } from 'lucide-react';

const HospitalsDocs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <Building className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Hospitals — what to enter</h1>
        </div>

        <p className="text-muted-foreground mb-4">Provide clear, consistent details so your teams and reports always reference the same site.</p>

        <div className="grid gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-semibold">Name</h3>
            <p className="text-sm text-muted-foreground">Use the institution's official name. PAWAKIT normalizes capitalization and ensures "Hospital" is present.</p>
          </div>

          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-semibold">Address</h3>
            <p className="text-sm text-muted-foreground">Optional but helpful when managing multiple sites — include city or campus to disambiguate.</p>
          </div>

          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-semibold">Contact</h3>
            <p className="text-sm text-muted-foreground">Provide an admin phone or email so colleagues know who to notify for device management or alerts.</p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-success" />
          <span className="text-sm text-muted-foreground">Tip: one site per hospital entry. For branches, create separate hospitals.</span>
        </div>

        <div className="mt-8 flex gap-3">
          <Link to="/dashboard" className="inline-block px-3 py-2 rounded-md bg-primary text-primary-foreground">Open Hospital Manager</Link>
          <Link to="/docs/wards" className="inline-block px-3 py-2 rounded-md border">Wards guide</Link>
        </div>
      </div>
    </div>
  );
};

export default HospitalsDocs;
