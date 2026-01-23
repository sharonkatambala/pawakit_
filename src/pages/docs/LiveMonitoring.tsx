import React from 'react';
import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

const LiveMonitoring = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Activity className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">Live Monitoring</h1>
      </div>

      <p className="text-muted-foreground mb-4">Continuous device telemetry lets you see current status and trends so teams can react fast.</p>

      <div className="grid gap-4">
        <div className="p-4 rounded-lg border bg-card">
          <h3 className="font-semibold">Real-time status</h3>
          <p className="text-sm text-muted-foreground">See live voltage, current, temperature and power for each device. Colors and badges indicate alert level.</p>
        </div>

        <div className="p-4 rounded-lg border bg-card">
          <h3 className="font-semibold">Trend visibility</h3>
          <p className="text-sm text-muted-foreground">Short-term trends help identify gradual failures before they become critical.</p>
        </div>

        <div className="p-4 rounded-lg border bg-card">
          <h3 className="font-semibold">Operator actions</h3>
          <p className="text-sm text-muted-foreground">Assign devices to wards and teams so alerts are routed to the right staff immediately.</p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Link to="/dashboard" className="inline-block px-3 py-2 rounded-md bg-primary text-primary-foreground">Open Dashboard</Link>
        <Link to="/docs/devices" className="inline-block px-3 py-2 rounded-md border">Devices</Link>
      </div>
    </div>
  </div>
);

export default LiveMonitoring;
