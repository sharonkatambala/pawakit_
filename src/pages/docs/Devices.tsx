import React from 'react';
import { Link } from 'react-router-dom';
import { Bolt, Thermometer, Zap } from 'lucide-react';

const DevicesDocs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <Bolt className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Devices — what PAWAKIT shows</h1>
        </div>

        <p className="text-muted-foreground mb-4">Each device shows live metrics (simulated in this demo) so teams can spot anomalies fast.</p>

        <div className="grid gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-semibold">Voltage & Current</h3>
            <p className="text-sm text-muted-foreground">Monitors power supply health. Sudden drops or spikes can indicate faults or failing power sources.</p>
          </div>

          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-semibold">Temperature</h3>
            <p className="text-sm text-muted-foreground">Overheating may signal equipment failure—set thresholds and respond to alerts.</p>
          </div>

          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-semibold">Power (W)</h3>
            <p className="text-sm text-muted-foreground">Calculated wattage helps estimate energy costs and identify abnormal consumption.</p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Link to="/dashboard" className="inline-block px-3 py-2 rounded-md bg-primary text-primary-foreground">Open Devices</Link>
          <Link to="/docs/overview" className="inline-block px-3 py-2 rounded-md border">Overview</Link>
        </div>
      </div>
    </div>
  );
};

export default DevicesDocs;
