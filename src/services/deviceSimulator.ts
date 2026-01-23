
interface SimulatedDeviceData {
  voltage: number;
  current: number;
  temperature: number;
  power: number;
  pricePerUnitTZS: number;
  timestamp: Date;
  riskLevel: 'high' | 'medium' | 'low';
}

export class DeviceSimulator {
  private static instance: DeviceSimulator;
  private intervals: Map<number, NodeJS.Timeout> = new Map();
  private callbacks: Map<number, (data: SimulatedDeviceData) => void> = new Map();

  static getInstance(): DeviceSimulator {
    if (!DeviceSimulator.instance) {
      DeviceSimulator.instance = new DeviceSimulator();
    }
    return DeviceSimulator.instance;
  }

  // Tanzania electricity pricing (approximate TZS per kWh)
  private getCurrentElectricityPrice(): number {
    // Base price around 400-600 TZS per kWh with some variation
    const basePrice = 500;
    const variation = Math.random() * 100 - 50; // ±50 TZS variation
    return Math.max(350, basePrice + variation);
  }

  private generateDeviceData(deviceCategory: string): SimulatedDeviceData {
    let baseVoltage = 220; // Standard voltage in Tanzania
    let baseCurrent = 5;
    let baseTemperature = 25;
    let basePower = 1000;

    // Adjust based on device category
    switch (deviceCategory) {
      case 'lifesaving':
        baseVoltage = 220 + (Math.random() * 20 - 10);
        baseCurrent = 8 + (Math.random() * 4 - 2);
        baseTemperature = 22 + (Math.random() * 6);
        basePower = 1500 + (Math.random() * 500);
        break;
      case 'lab':
        baseVoltage = 220 + (Math.random() * 15 - 7.5);
        baseCurrent = 6 + (Math.random() * 3 - 1.5);
        baseTemperature = 20 + (Math.random() * 8);
        basePower = 1200 + (Math.random() * 800);
        break;
      case 'general':
        baseVoltage = 220 + (Math.random() * 10 - 5);
        baseCurrent = 3 + (Math.random() * 2 - 1);
        baseTemperature = 25 + (Math.random() * 10);
        basePower = 800 + (Math.random() * 400);
        break;
    }

    const voltage = Math.round(baseVoltage * 10) / 10;
    const current = Math.round(baseCurrent * 10) / 10;
    const temperature = Math.round(baseTemperature * 10) / 10;
    const power = Math.round(basePower);
    const pricePerUnitTZS = Math.round(this.getCurrentElectricityPrice());

    // Risk assessment based on parameters
    let riskLevel: 'high' | 'medium' | 'low' = 'low';
    
    if (voltage < 200 || voltage > 240 || 
        temperature > 35 || 
        (deviceCategory === 'lifesaving' && (current < 6 || current > 12))) {
      riskLevel = 'high';
    } else if (voltage < 210 || voltage > 230 || 
               temperature > 30 || 
               current > baseCurrent * 1.5) {
      riskLevel = 'medium';
    }

    return {
      voltage,
      current,
      temperature,
      power,
      pricePerUnitTZS,
      timestamp: new Date(),
      riskLevel
    };
  }

  startSimulation(deviceId: number, category: string, callback: (data: SimulatedDeviceData) => void): void {
    this.stopSimulation(deviceId); // Stop existing simulation if any
    
    this.callbacks.set(deviceId, callback);
    
    // Initial data
    callback(this.generateDeviceData(category));
    
    // Update every 3-5 seconds
    const interval = setInterval(() => {
      const data = this.generateDeviceData(category);
      callback(data);
    }, 3000 + Math.random() * 2000);
    
    this.intervals.set(deviceId, interval);
  }

  stopSimulation(deviceId: number): void {
    const interval = this.intervals.get(deviceId);
    if (interval) {
      clearInterval(interval);
      this.intervals.delete(deviceId);
      this.callbacks.delete(deviceId);
    }
  }

  stopAllSimulations(): void {
    this.intervals.forEach((interval) => clearInterval(interval));
    this.intervals.clear();
    this.callbacks.clear();
  }
}

export const deviceSimulator = DeviceSimulator.getInstance();
