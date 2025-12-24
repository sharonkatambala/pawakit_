
interface ExportDevice {
  id: number;
  name: string;
  category: string;
  ward: string;
  hospital: string;
  voltage?: number;
  current?: number;
  temperature?: number;
  power?: number;
  pricePerUnitTZS?: number;
  riskLevel?: string;
  status: string;
  timestamp?: string;
}

export class DataExporter {
  static exportToCSV(devices: ExportDevice[], filename: string = 'pawakit-devices'): void {
    const headers = [
      'Device ID',
      'Device Name',
      'Category',
      'Ward',
      'Hospital',
      'Voltage (V)',
      'Current (A)',
      'Temperature (°C)',
      'Power (W)',
      'Price per Unit (TZS)',
      'Risk Level',
      'Status',
      'Timestamp'
    ];

    const csvContent = [
      headers.join(','),
      ...devices.map(device => [
        device.id,
        `"${device.name}"`,
        device.category,
        `"${device.ward}"`,
        `"${device.hospital}"`,
        device.voltage || 0,
        device.current || 0,
        device.temperature || 0,
        device.power || 0,
        device.pricePerUnitTZS || 0,
        device.riskLevel || 'unknown',
        device.status,
        device.timestamp || new Date().toISOString()
      ].join(','))
    ].join('\n');

    this.downloadFile(csvContent, `${filename}.csv`, 'text/csv');
  }

  static exportToExcel(devices: ExportDevice[], filename: string = 'pawakit-devices'): void {
    // Simple TSV format that Excel can open
    const headers = [
      'Device ID',
      'Device Name',
      'Category',
      'Ward',
      'Hospital',
      'Voltage (V)',
      'Current (A)',
      'Temperature (°C)',
      'Power (W)',
      'Price per Unit (TZS)',
      'Risk Level',
      'Status',
      'Timestamp'
    ];

    const tsvContent = [
      headers.join('\t'),
      ...devices.map(device => [
        device.id,
        device.name,
        device.category,
        device.ward,
        device.hospital,
        device.voltage || 0,
        device.current || 0,
        device.temperature || 0,
        device.power || 0,
        device.pricePerUnitTZS || 0,
        device.riskLevel || 'unknown',
        device.status,
        device.timestamp || new Date().toISOString()
      ].join('\t'))
    ].join('\n');

    this.downloadFile(tsvContent, `${filename}.xlsx`, 'application/vnd.ms-excel');
  }

  private static downloadFile(content: string, filename: string, contentType: string): void {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}
