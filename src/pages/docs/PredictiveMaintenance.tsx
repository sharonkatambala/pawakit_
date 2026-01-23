import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

const PredictiveMaintenance = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Zap className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">Predictive Maintenance</h1>
      </div>

      <p className="text-muted-foreground mb-4">Early warnings from trends help schedule maintenance before failures occur.</p>

      <div className="grid gap-4">
        <div className="p-4 rounded-lg border bg-card">
          <h3 className="font-semibold">Trend detection</h3>
          <p className="text-sm text-muted-foreground">Track slow degradations like rising temperature or increasing power draw.</p>
        </div>

        <div className="p-4 rounded-lg border bg-card">
          <h3 className="font-semibold">Reduce downtime</h3>
          <p className="text-sm text-muted-foreground">Planned interventions reduce emergency repairs and service interruptions.</p>
        </div>

        <div className="p-4 rounded-lg border bg-card">
          <h3 className="font-semibold">Maintenance planning</h3>
          <p className="text-sm text-muted-foreground">Use device metrics to prioritize service orders and parts procurement.</p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Link to="/dashboard" className="inline-block px-3 py-2 rounded-md bg-primary text-primary-foreground">Open Dashboard</Link>
        <Link to="/docs/devices" className="inline-block px-3 py-2 rounded-md border">Devices</Link>
      </div>
    </div>
  </div>
);

export default PredictiveMaintenance;
