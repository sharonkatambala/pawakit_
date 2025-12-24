import React, { createContext, useContext, useState } from 'react';

interface Translations {
  [key: string]: {
    en: string;
    sw: string;
  };
}

const translations: Translations = {
  // Navigation
  home: { en: "Home", sw: "Nyumbani" },
  dashboard: { en: "Dashboard", sw: "Dashibodi" },
  login: { en: "Login", sw: "Ingia" },
  register: { en: "Register", sw: "Jisajili" },
  contact: { en: "Contact", sw: "Wasiliana" },
  logout: { en: "Logout", sw: "Toka" },
  
  // Auth Page
  backToHome: { en: "Back to Home", sw: "Rudi Nyumbani" },
  accessYourDashboard: { en: "Access your energy monitoring dashboard", sw: "Fikia dashibodi yako ya ufuatiliaji wa nishati" },
  enterCredentials: { en: "Enter your credentials to access your dashboard", sw: "Ingiza utambulisho wako ili kufikia dashibodi yako" },
  email: { en: "Email", sw: "Barua pepe" },
  password: { en: "Password", sw: "Nywila" },
  loggingIn: { en: "Logging in...", sw: "Inaingia..." },
  createAccount: { en: "Create your account details", sw: "Unda maelezo ya akaunti yako" },
  personalInformation: { en: "Personal Information", sw: "Taarifa za Kibinafsi" },
  firstName: { en: "First Name", sw: "Jina la Kwanza" },
  lastName: { en: "Last Name", sw: "Jina la Mwisho" },
  role: { en: "Role", sw: "Nafasi" },
  selectYourRole: { en: "Select your role", sw: "Chagua nafasi yako" },
  hospitalAdministrator: { en: "Hospital Administrator", sw: "Msimamizi wa Hospitali" },
  biomedicalEngineer: { en: "Biomedical Engineer", sw: "Mhandisi wa Vifaa vya Matibabu" },
  maintenanceTechnician: { en: "Maintenance Technician", sw: "Fundi wa Matengenezo" },
  medicalDoctor: { en: "Medical Doctor", sw: "Daktari wa Matibabu" },
  nurse: { en: "Nurse", sw: "Muuguzi" },
  confirmPassword: { en: "Confirm Password", sw: "Thibitisha Nywila" },
  hospitalSetup: { en: "Hospital Setup", sw: "Mpangilio wa Hospitali" },
  setupHospitalWards: { en: "Set up your hospital, wards, and devices", sw: "Pangilia hospitali, wodi, na vifaa vyako" },
  hospitalName: { en: "Hospital Name", sw: "Jina la Hospitali" },
  wards: { en: "Wards", sw: "Wodi" },
  wardName: { en: "Ward Name (e.g., ICU, Emergency)", sw: "Jina la Wodi (k.m., ICU, Dharura)" },
  addWard: { en: "Add Ward", sw: "Ongeza Wodi" },
  devices: { en: "devices", sw: "vifaa" },
  addDevice: { en: "Add Device", sw: "Ongeza Kifaa" },
  addDeviceToWard: { en: "Add Device to", sw: "Ongeza Kifaa kwenye" },
  addMedicalEquipment: { en: "Add medical equipment and devices", sw: "Ongeza vifaa na vifaa vya matibabu" },
  deviceName: { en: "Device Name", sw: "Jina la Kifaa" },
  deviceNamePlaceholder: { en: "e.g., MRI Scanner, Ventilator", sw: "k.m., Kifaa cha MRI, Kifaa cha Kupumua" },
  numberOfDevices: { en: "Number of Devices", sw: "Idadi ya Vifaa" },
  category: { en: "Category", sw: "Aina" },
  lifeSaving: { en: "Life-saving", sw: "Kuokoa Maisha" },
  laboratory: { en: "Laboratory", sw: "Maabara" },
  generalSupport: { en: "General Support", sw: "Msaada wa Jumla" },
  powerSource: { en: "Power Source", sw: "Chanzo cha Umeme" },
  grid: { en: "Grid", sw: "Mtandao" },
  ups: { en: "UPS", sw: "UPS" },
  generator: { en: "Generator", sw: "Jenereta" },
  battery: { en: "Battery", sw: "Betri" },
  units: { en: "units", sw: "vitengo" },
  creatingAccount: { en: "Creating Account...", sw: "Inaunda Akaunti..." },
  completeRegistration: { en: "Complete Registration", sw: "Maliza Usajili" },
  
  // Hero Section
  smartEnergyMonitoring: { en: "Smart Energy Monitoring", sw: "Ufuatiliaji Mahiri wa Nishati" },
  pawakit: { en: "PAWAKIT", sw: "PAWAKIT" },
  liveDashboard: { en: "Live Dashboard", sw: "Dashibodi ya Moja kwa Moja" },
  heroDescription: { 
    en: "Advanced energy monitoring and backup system designed specifically for hospitals and healthcare facilities", 
    sw: "Mfumo wa kina wa ufuatiliaji wa nishati na hifadhi uliotengenezwa maalum kwa hospitali na vituo vya afya"
  },
  getStarted: { en: "Get Started", sw: "Anza" },
  goToDashboard: { en: "Go to Dashboard", sw: "Nenda Dashibodi" },
  watchDemo: { en: "Watch Demo", sw: "Tazama Onyesho" },
  
  // Problem & Solution Section
  theProblem: { en: "The Problem", sw: "Tatizo" },
  ourSolution: { en: "Our Solution", sw: "Suluhisho Letu" },
  powerOutages: { en: "Power Outages", sw: "Kukatika kwa Umeme" },
  powerOutagesDesc: { 
    en: "Unexpected power cuts can be life-threatening, affecting critical medical equipment and patient care", 
    sw: "Kukatika kwa umeme bila kutarajia kunaweza kuwa hatari ya kifo, kikiathiri vifaa muhimu vya matibabu na utunzaji wa wagonjwa"
  },
  noRealTimeMonitoring: { en: "No Real-time Monitoring", sw: "Hakuna Ufuatiliaji wa Wakati Halisi" },
  noRealTimeMonitoringDesc: { 
    en: "Lack of immediate visibility leads to unexpected equipment failures and reactive maintenance", 
    sw: "Ukosefu wa uonekano wa haraka unasababisha kuharibu kwa vifaa bila kutarajia na utunzaji wa majibu"
  },
  manualManagement: { en: "Manual Management", sw: "Usimamizi wa Mkono" },
  manualManagementDesc: { 
    en: "Manual power management is inefficient, error-prone, and requires constant human intervention", 
    sw: "Usimamizi wa umeme kwa mkono si wa ufanisi, una makosa, na unahitaji uingiliaji wa binadamu kila wakati"
  },
  realTimeMonitoring: { en: "Real-time Monitoring", sw: "Ufuatiliaji wa Wakati Halisi" },
  realTimeMonitoringDesc: { 
    en: "Continuous power tracking with instant alerts and comprehensive analytics for all hospital devices", 
    sw: "Ufuatiliaji wa nishati wa kuendelea na tahadhari za haraka na uchambuzi mkamilifu kwa vifaa vyote vya hospitali"
  },
  automatedBackup: { en: "Automated Backup", sw: "Hifadhi ya Otomatiki" },
  automatedBackupDesc: { 
    en: "Seamless automatic switching to backup power during outages with zero downtime", 
    sw: "Kubadilisha kwa urahisi kwa otomatiki kwa umeme wa hifadhi wakati wa kukatika bila kuzorota"
  },
  smartManagement: { en: "Smart Management", sw: "Usimamizi Mahiri" },
  smartManagementDesc: { 
    en: "Intelligent dashboard for comprehensive hospital-wide energy management and optimization", 
    sw: "Dashibodi mahiri kwa usimamizi mkamilifu wa nishati hospitalini na uboreshaji"
  },
  
  // Live Monitoring Section
  liveMonitoring: { en: "Live Monitoring", sw: "Ufuatiliaji wa Moja kwa Moja" },
  liveMonitoringDesc: { 
    en: "Real-time monitoring of your hospital's critical medical equipment and power infrastructure", 
    sw: "Ufuatiliaji wa wakati halisi wa vifaa muhimu vya matibabu na miundombinu ya umeme ya hospitali yako"
  },
  powerStatus: { en: "Power Status", sw: "Hali ya Umeme" },
  mainPowerOperational: { en: "Main power supply operational", sw: "Msambazaji mkuu wa umeme unafanya kazi" },
  networkStatus: { en: "Network Status", sw: "Hali ya Mtandao" },
  allDevicesOnline: { en: "All devices online and reporting", sw: "Vifaa vyote vimeunga mkono na kuripoti" },
  backupPower: { en: "Backup Power", sw: "Umeme wa Hifadhi" },
  emergencyBackupReady: { en: "Emergency backup ready", sw: "Hifadhi ya dharura ipo tayari" },
  deviceStatusMonitor: { en: "Device Status Monitor", sw: "Kijisimamia cha Hali ya Kifaa" },
  deviceNameStatus: { en: "Device Name", sw: "Jina la Kifaa" },
  status: { en: "Status", sw: "Hali" },
  powerLevel: { en: "Power Level", sw: "Kiwango cha Umeme" },
  location: { en: "Location", sw: "Mahali" },
  
  // Device statuses
  online: { en: "Online", sw: "Mtandaoni" },
  offline: { en: "Offline", sw: "Nje ya Mtandao" },
  normal: { en: "NORMAL", sw: "KAWAIDA" },
  connected: { en: "CONNECTED", sw: "IMEUNGANISHWA" },
  
  // Device monitoring features
  realTimeMonitoringFeature: { en: "Track power usage, load, and status across all hospital devices", sw: "Fuatilia matumizi ya umeme, mzigo, na hali kwa vifaa vyote vya hospitali" },
  smartAlerts: { en: "Smart Alerts", sw: "Tahadhari Mahiri" },
  smartAlertsDesc: { en: "Instant notifications for power anomalies and equipment status", sw: "Arifa za haraka za kasoro za umeme na hali ya vifaa" },
  deviceManagement: { en: "Device Management", sw: "Usimamizi wa Vifaa" },
  deviceManagementDesc: { en: "Categorize and monitor life-saving, lab, and support equipment", sw: "Panga na fuatilia vifaa vya kuokoa maisha, maabara, na msaada" },
  
  // Impact Areas
  impactAreas: { en: "Impact Areas", sw: "Maeneo ya Athari" },
  impactAreasDesc: { 
    en: "PAWAKIT transforms healthcare facilities by ensuring reliable power across critical areas", 
    sw: "PAWAKIT inabadilisha vituo vya afya kwa kuhakikisha umeme wa kutegemewa katika maeneo muhimu"
  },
  criticalCareUnits: { en: "Critical Care Units", sw: "Vitengo vya Utunzaji Muhimu" },
  criticalCareDesc: { en: "Ensure uninterrupted power for life-saving equipment in ICUs and emergency rooms", sw: "Hakikisha umeme usiokatizwa kwa vifaa vya kuokoa maisha katika ICU na vyumba vya dharura" },
  operatingTheaters: { en: "Operating Theaters", sw: "Vyumba vya Upasuaji" },
  operatingTheatersDesc: { en: "Maintain stable power supply during critical surgical procedures", sw: "Dumisha msambazaji wa umeme thabiti wakati wa taratibu muhimu za upasuaji" },
  medicalEquipment: { en: "Medical Equipment", sw: "Vifaa vya Matibabu" },
  medicalEquipmentDesc: { en: "Protect expensive diagnostic and treatment equipment from power fluctuations", sw: "Linda vifaa ghali vya uchunguzi na matibabu kutoka kwa mabadiliko ya umeme" },
  patientSafety: { en: "Patient Safety", sw: "Usalama wa Mgonjwa" },
  patientSafetyDesc: { en: "Reduce medical errors and improve patient outcomes through reliable power", sw: "Punguza makosa ya matibabu na kuboresha matokeo ya wagonjwa kupitia umeme wa kutegemewa" },
  
  // CTA Section
  ctaTitle: { 
    en: "Ready to Transform Your Hospital's Power Management?", 
    sw: "Uko Tayari Kubadilisha Usimamizi wa Umeme wa Hospitali Yako?"
  },
  ctaDescription: { 
    en: "Join leading healthcare facilities already using PAWAKIT for reliable, smart energy monitoring", 
    sw: "Jiunge na vituo vya afya vya uwongozi vinavyotumia PAWAKIT kwa ufuatiliaji wa nishati wa kutegemewa na mahiri"
  },
  contactUs: { en: "Contact Us", sw: "Wasiliana Nasi" },
  startFreeTrial: { en: "Start Free Trial", sw: "Anza Jaribio la Bure" },
  
  // Footer
  quickLinks: { en: "Quick Links", sw: "Viungo vya Haraka" },
  services: { en: "Services", sw: "Huduma" },
  energyMonitoring: { en: "Energy Monitoring", sw: "Ufuatiliaji wa Nishati" },
  backupSystems: { en: "Backup Systems", sw: "Mifumo ya Hifadhi" },
  realTimeAlerts: { en: "Real-time Alerts", sw: "Tahadhari za Wakati Halisi" },
  footerDescription: { 
    en: "Smart energy monitoring and backup system for hospitals and healthcare facilities.", 
    sw: "Mfumo mahiri wa ufuatiliaji wa nishati na hifadhi kwa hospitali na vituo vya afya."
  },
  allRightsReserved: { en: "All rights reserved. | Built for healthcare excellence.", sw: "Haki zote zimehifadhiwa. | Imetengenezwa kwa ubora wa afya." },
  
  // Dashboard
  totalDevices: { en: "Total Devices", sw: "Vifaa Vyote" },
  activeAlerts: { en: "Active Alerts", sw: "Tahadhari Zinazofanya Kazi" },
  avgPowerUsage: { en: "Avg Power Usage", sw: "Matumizi ya Umeme" },
  systemStatus: { en: "System Status", sw: "Hali ya Mfumo" },
  
  // Device categories
  lifesaving: { en: "Life-saving", sw: "Kuokoa Maisha" },
  lab: { en: "Laboratory", sw: "Maabara" },
  general: { en: "General Support", sw: "Msaada wa Jumla" },
  
  // Risk levels
  high: { en: "High Risk", sw: "Hatari Kubwa" },
  medium: { en: "Medium Risk", sw: "Hatari ya Kati" },
  low: { en: "Low Risk", sw: "Hatari Ndogo" },
  
  // Device monitoring
  voltage: { en: "Voltage", sw: "Volteji" },
  current: { en: "Current", sw: "Mkondo" },
  temperature: { en: "Temperature", sw: "Joto" },
  power: { en: "Power", sw: "Nguvu" },
  pricePerUnit: { en: "Price per Unit", sw: "Bei kwa Kipimo" },
  
  // Actions
  export: { en: "Export Data", sw: "Hamisha Data" },
  addDeviceAction: { en: "Add Device", sw: "Ongeza Kifaa" },
  editDevice: { en: "Edit Device", sw: "Hariri Kifaa" },
  deleteDevice: { en: "Delete Device", sw: "Futa Kifaa" },
  
  // Status
  alert: { en: "Alert", sw: "Tahadhari" },
  
  // Device names (can be translated or kept as is)
  ventilatorA01: { en: "Ventilator A-01", sw: "Kifaa cha Kupumua A-01" },
  ctScanner: { en: "CT Scanner", sw: "Kifaa cha CT" },
  dialysisMachine: { en: "Dialysis Machine", sw: "Kifaa cha Dialysis" },
  xrayUnit: { en: "X-Ray Unit", sw: "Kifaa cha X-Ray" },
  ultrasoundDevice: { en: "Ultrasound Device", sw: "Kifaa cha Ultrasound" },
  defibrillator: { en: "Defibrillator", sw: "Kifaa cha Defibrillator" },
  
  // Locations
  icuWard1: { en: "ICU Ward 1", sw: "Wodi ya ICU 1" },
  radiology: { en: "Radiology", sw: "Radiolojia" },
  nephrology: { en: "Nephrology", sw: "Fizi" },
  emergency: { en: "Emergency", sw: "Dharura" },
  maternity: { en: "Maternity", sw: "Uzazi" },
  
  // Additional translations for homepage
  keyFeatures: { en: 'Key Features', sw: 'Vipengele Muhimu' },
  teamCollaboration: { en: 'Team Collaboration', sw: 'Ushirikiano wa Timu' },
  liveParameters: { en: 'Live Parameters', sw: 'Vigezo vya Moja kwa Moja' },
  liveParametersDesc: { 
    en: 'Real-time monitoring of critical electrical parameters', 
    sw: 'Ufuatiliaji wa moja kwa moja wa vigezo muhimu vya umeme'
  },
  stable: { en: 'Stable', sw: 'Imara' },
  optimal: { en: 'Optimal', sw: 'Bora' },
  efficient: { en: 'Efficient', sw: 'Ufanisi' },
  hospitalManagement: { en: 'Hospital Management', sw: 'Usimamizi wa Hospitali' },
  
  // Contact form translations  
  contactUsTitle: { en: 'Get in Touch', sw: 'Wasiliana Nasi' },
  nameLabel: { en: 'Your Name', sw: 'Jina Lako' },
  emailLabel: { en: 'Your Email', sw: 'Barua Pepe Yako' },
  messageLabel: { en: 'Your Message', sw: 'Ujumbe Wako' },
  sendMessage: { en: 'Send Message', sw: 'Tuma Ujumbe' },
  contactSuccess: { en: 'Message sent successfully!', sw: 'Ujumbe umetumwa kwa ufanisi!' },
};

interface LanguageContextType {
  language: 'en' | 'sw';
  setLanguage: (lang: 'en' | 'sw') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'sw'>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
