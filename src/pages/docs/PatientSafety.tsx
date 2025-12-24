import React from 'react';
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';

const PatientSafety = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Users className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">Patient Safety</h1>
      </div>

      <p className="text-muted-foreground mb-4">How PAWAKIT helps keep critical care uninterrupted and equipment reliable.</p>

      <div className="grid gap-4">
        <div className="p-4 rounded-lg border bg-card">
          <h3 className="font-semibold">Equipment uptime</h3>
          <p className="text-sm text-muted-foreground">Monitoring reduces unexpected equipment failures and helps maintain continuous care.</p>
        </div>

        <div className="p-4 rounded-lg border bg-card">
          <h3 className="font-semibold">Faster response</h3>
          <p className="text-sm text-muted-foreground">Alerts directed to responsible teams shorten time-to-fix for critical devices.</p>
        </div>

        <div className="p-4 rounded-lg border bg-card">
          <h3 className="font-semibold">Reporting</h3>
          <p className="text-sm text-muted-foreground">Use ward-level views to prioritize interventions where they matter most.</p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Link to="/dashboard" className="inline-block px-3 py-2 rounded-md bg-primary text-primary-foreground">Open Dashboard</Link>
        <Link to="/docs/hospitals" className="inline-block px-3 py-2 rounded-md border">Hospitals</Link>
      </div>
    </div>
  </div>
);

export default PatientSafety;
