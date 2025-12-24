import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

const PowerAnalytics = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <TrendingUp className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">Power Analytics</h1>
      </div>

      <p className="text-muted-foreground mb-4">Understand consumption patterns and identify opportunities to save energy.</p>

      <div className="grid gap-4">
        <div className="p-4 rounded-lg border bg-card">
          <h3 className="font-semibold">Usage insights</h3>
          <p className="text-sm text-muted-foreground">Track power draw per device and ward to target high-consumption equipment.</p>
        </div>

        <div className="p-4 rounded-lg border bg-card">
          <h3 className="font-semibold">Cost estimation</h3>
          <p className="text-sm text-muted-foreground">Estimate running costs from measured power and price/kWh inputs.</p>
        </div>

        <div className="p-4 rounded-lg border bg-card">
          <h3 className="font-semibold">Optimization</h3>
          <p className="text-sm text-muted-foreground">Use insights to schedule maintenance or shift loads to cheaper sources when possible.</p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Link to="/dashboard" className="inline-block px-3 py-2 rounded-md bg-primary text-primary-foreground">Open Dashboard</Link>
        <Link to="/docs/devices" className="inline-block px-3 py-2 rounded-md border">Devices</Link>
      </div>
    </div>
  </div>
);

export default PowerAnalytics;
