import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const SmartAlerts = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <AlertTriangle className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">Smart Alerts</h1>
      </div>

      <p className="text-muted-foreground mb-4">Prioritized notifications that reduce noise and highlight critical events.</p>

      <div className="grid gap-4">
        <div className="p-4 rounded-lg border bg-card">
          <h3 className="font-semibold">Severity levels</h3>
          <p className="text-sm text-muted-foreground">Alerts are categorized by risk so staff can focus on high-priority incidents first.</p>
        </div>

        <div className="p-4 rounded-lg border bg-card">
          <h3 className="font-semibold">Routing</h3>
          <p className="text-sm text-muted-foreground">Route alarms to the right team or phone/email so issues are handled by the right people.</p>
        </div>

        <div className="p-4 rounded-lg border bg-card">
          <h3 className="font-semibold">History & context</h3>
          <p className="text-sm text-muted-foreground">Each alert includes recent telemetry so responders see context immediately.</p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Link to="/dashboard" className="inline-block px-3 py-2 rounded-md bg-primary text-primary-foreground">Open Dashboard</Link>
        <Link to="/docs/wards" className="inline-block px-3 py-2 rounded-md border">Wards</Link>
      </div>
    </div>
  </div>
);

export default SmartAlerts;
