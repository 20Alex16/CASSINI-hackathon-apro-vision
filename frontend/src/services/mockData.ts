// import { Anomaly, Company, DataSource, PollutionData, Supplier, WorkflowStep } from "@/types";

// Realistic textile supply chain locations (Tier-1/Tier-2 hubs)
/*
export const suppliers: Supplier[] = [
  { id: "s1", name: "Bosphorus Textile Mills", companyId: "c1", companyName: "Aurora Couture", location: { lat: 41.0082, lng: 28.9784, city: "Istanbul", country: "Turkey" }, riskLevel: "MEDIUM", pollutionIndex: 58, category: "Dyeing & Finishing", lastScan: "2026-02-12" },
  { id: "s2", name: "Dhaka Knitwear Cooperative", companyId: "c1", companyName: "Aurora Couture", location: { lat: 23.8103, lng: 90.4125, city: "Dhaka", country: "Bangladesh" }, riskLevel: "HIGH", pollutionIndex: 82, category: "Knitting", lastScan: "2026-02-15" },
  { id: "s3", name: "Tirupur Cotton Hub", companyId: "c2", companyName: "Maison Fenix", location: { lat: 11.1085, lng: 77.3411, city: "Tirupur", country: "India" }, riskLevel: "MEDIUM", pollutionIndex: 64, category: "Cotton Processing", lastScan: "2026-02-10" },
  { id: "s4", name: "Guangdong Print & Weave", companyId: "c2", companyName: "Maison Fenix", location: { lat: 23.1291, lng: 113.2644, city: "Guangzhou", country: "China" }, riskLevel: "HIGH", pollutionIndex: 79, category: "Printing", lastScan: "2026-02-14" },
  { id: "s5", name: "Mekong Garment Works", companyId: "c3", companyName: "Lumière Studio", location: { lat: 10.8231, lng: 106.6297, city: "Ho Chi Minh", country: "Vietnam" }, riskLevel: "LOW", pollutionIndex: 27, category: "Cut & Sew", lastScan: "2026-02-13" },
  { id: "s6", name: "Karachi Denim House", companyId: "c3", companyName: "Lumière Studio", location: { lat: 24.8607, lng: 67.0011, city: "Karachi", country: "Pakistan" }, riskLevel: "HIGH", pollutionIndex: 88, category: "Denim Wash", lastScan: "2026-02-11" },
  { id: "s7", name: "Phnom Penh Apparel Co.", companyId: "c4", companyName: "Nordhaus Atelier", location: { lat: 11.5564, lng: 104.9282, city: "Phnom Penh", country: "Cambodia" }, riskLevel: "MEDIUM", pollutionIndex: 52, category: "Apparel Assembly", lastScan: "2026-02-09" },
  { id: "s8", name: "Casablanca Fast Fashion", companyId: "c4", companyName: "Nordhaus Atelier", location: { lat: 33.5731, lng: -7.5898, city: "Casablanca", country: "Morocco" }, riskLevel: "LOW", pollutionIndex: 31, category: "Cut & Sew", lastScan: "2026-02-12" },
  { id: "s9", name: "Jakarta Synthetic Fibers", companyId: "c5", companyName: "Atelier Verde", location: { lat: -6.2088, lng: 106.8456, city: "Jakarta", country: "Indonesia" }, riskLevel: "MEDIUM", pollutionIndex: 60, category: "Synthetic Fibers", lastScan: "2026-02-15" },
  { id: "s10", name: "Cairo Cotton Spinning", companyId: "c5", companyName: "Atelier Verde", location: { lat: 30.0444, lng: 31.2357, city: "Cairo", country: "Egypt" }, riskLevel: "LOW", pollutionIndex: 24, category: "Spinning", lastScan: "2026-02-10" },
  { id: "s11", name: "Porto Wool Finishing", companyId: "c6", companyName: "Bellavita Roma", location: { lat: 41.1579, lng: -8.6291, city: "Porto", country: "Portugal" }, riskLevel: "LOW", pollutionIndex: 18, category: "Wool Finishing", lastScan: "2026-02-14" },
  { id: "s12", name: "Hangzhou Silk Mills", companyId: "c6", companyName: "Bellavita Roma", location: { lat: 30.2741, lng: 120.1551, city: "Hangzhou", country: "China" }, riskLevel: "MEDIUM", pollutionIndex: 55, category: "Silk Production", lastScan: "2026-02-11" },
  { id: "s13", name: "Bangalore Tech Fabrics", companyId: "c1", companyName: "Aurora Couture", location: { lat: 12.9716, lng: 77.5946, city: "Bangalore", country: "India" }, riskLevel: "LOW", pollutionIndex: 22, category: "Technical Textiles", lastScan: "2026-02-13" },
  { id: "s14", name: "Surabaya Garment Park", companyId: "c4", companyName: "Nordhaus Atelier", location: { lat: -7.2575, lng: 112.7521, city: "Surabaya", country: "Indonesia" }, riskLevel: "HIGH", pollutionIndex: 76, category: "Apparel Assembly", lastScan: "2026-02-08" },
  { id: "s15", name: "Lima Pima Cotton Co.", companyId: "c5", companyName: "Atelier Verde", location: { lat: -12.0464, lng: -77.0428, city: "Lima", country: "Peru" }, riskLevel: "LOW", pollutionIndex: 19, category: "Cotton Processing", lastScan: "2026-02-15" },
];
*/

/*
export const companies: Company[] = [
  { id: "c1", name: "Aurora Couture", industry: "Luxury Apparel", headquarters: "Paris, France", supplierCount: 3, averageRisk: "MEDIUM", riskScore: 54, lastUpdated: "2026-02-15" },
  { id: "c2", name: "Maison Fenix", industry: "Designer Fashion", headquarters: "Milan, Italy", supplierCount: 2, averageRisk: "HIGH", riskScore: 71, lastUpdated: "2026-02-14" },
  { id: "c3", name: "Lumière Studio", industry: "Premium Denim", headquarters: "Lyon, France", supplierCount: 2, averageRisk: "MEDIUM", riskScore: 58, lastUpdated: "2026-02-13" },
  { id: "c4", name: "Nordhaus Atelier", industry: "Sustainable Fashion", headquarters: "Berlin, Germany", supplierCount: 3, averageRisk: "MEDIUM", riskScore: 53, lastUpdated: "2026-02-12" },
  { id: "c5", name: "Atelier Verde", industry: "Eco Apparel", headquarters: "Barcelona, Spain", supplierCount: 3, averageRisk: "LOW", riskScore: 34, lastUpdated: "2026-02-15" },
  { id: "c6", name: "Bellavita Roma", industry: "Luxury Knitwear", headquarters: "Rome, Italy", supplierCount: 2, averageRisk: "LOW", riskScore: 36, lastUpdated: "2026-02-14" },
];
*/

// Generate 24 months of pollution data with seasonal variation + anomalies
/*
export function getPollutionHistory(supplierId: string): PollutionData[] {
  const supplier = suppliers.find((s) => s.id === supplierId);
  const base = supplier ? supplier.pollutionIndex : 50;
  const data: PollutionData[] = [];
  const now = new Date("2026-02-01");
  for (let i = 23; i >= 0; i--) {
    const d = new Date(now);
    d.setMonth(d.getMonth() - i);
    const seasonal = Math.sin((i / 12) * Math.PI * 2) * 8;
    const noise = (Math.sin(i * 1.7 + base) * 6 + Math.cos(i * 0.9) * 4);
    const spike = (i === 18 || i === 7) ? 18 : 0;
    const value = Math.max(5, Math.min(100, base + seasonal + noise + spike));
    data.push({ date: d.toISOString().slice(0, 7), value: Math.round(value * 10) / 10 });
  }
  return data;
}

export function getAnomalies(supplierId: string): Anomaly[] {
  const supplier = suppliers.find((s) => s.id === supplierId);
  if (!supplier) return [];
  if (supplier.riskLevel === "LOW") {
    return [
      { date: "2025-08-14", description: "Minor turbidity deviation detected via Sentinel-2 multispectral analysis.", severity: "LOW" },
    ];
  }
  if (supplier.riskLevel === "MEDIUM") {
    return [
      { date: "2025-11-22", description: "Discharge plume above seasonal baseline observed in adjacent water body.", severity: "MEDIUM" },
      { date: "2025-07-09", description: "Chlorophyll-a concentration spike near outflow channel.", severity: "MEDIUM" },
      { date: "2025-03-18", description: "Suspended sediment anomaly correlated with monsoon onset.", severity: "LOW" },
    ];
  }
  return [
    { date: "2025-12-05", description: "Persistent NDWI degradation detected over 4-week window.", severity: "HIGH" },
    { date: "2025-10-17", description: "Heavy metal proxy index exceeded alert threshold.", severity: "HIGH" },
    { date: "2025-06-28", description: "Thermal pollution signature near supplier outflow.", severity: "MEDIUM" },
    { date: "2025-04-11", description: "Recurring weekend discharge pattern identified.", severity: "MEDIUM" },
  ];
}

export const dataSources: DataSource[] = [
  {
    title: "Copernicus Sentinel-2",
    description: "Multispectral imagery at 10–60 m resolution with a 5-day revisit cycle, used for water quality and surface pollution analysis.",
    reference: "ESA / European Commission",
    icon: "satellite",
  },
  {
    title: "Copernicus Sentinel-3 OLCI",
    description: "Ocean and Land Colour Instrument used to derive chlorophyll, turbidity and suspended matter indicators in coastal waters.",
    reference: "ESA Earth Observation",
    icon: "waves",
  },
  {
    title: "Copernicus Sentinel-5P",
    description: "Tropospheric monitoring of NO₂, SO₂ and aerosols to flag atmospheric pollution surrounding industrial facilities.",
    reference: "ESA / Copernicus Programme",
    icon: "air",
  },
  {
    title: "Copernicus Data Space Ecosystem",
    description: "Official European access platform for Sentinel data, providing scalable, license-free retrieval pipelines.",
    reference: "European Commission",
    icon: "cloud",
  },
];

export const workflowSteps: WorkflowStep[] = [
  { step: 1, title: "Data Ingestion", description: "Sentinel satellite imagery is automatically retrieved from the Copernicus Data Space Ecosystem on a 5-day cadence.", icon: "satellite_alt" },
  { step: 2, title: "Data Processing", description: "Multispectral bands are atmospherically corrected and aligned with each supplier facility footprint.", icon: "memory" },
  { step: 3, title: "Risk Detection", description: "Hydrographic, atmospheric and thermal anomalies are flagged using ESA-validated indicators.", icon: "radar" },
  { step: 4, title: "Continuous Monitoring", description: "Each supplier site is tracked over time with historical baselining and seasonal correction.", icon: "monitoring" },
  { step: 5, title: "Compliance Insights", description: "Findings are mapped to CSDDD / ESRS E3 obligations with prioritised remediation guidance.", icon: "verified" },
];

export const platformStats = {
  totalCompanies: 0, //companies.length,
  totalSuppliers: suppliers.length,
  activeRisks: suppliers.filter((s) => s.riskLevel === "HIGH").length,
  countriesCovered: new Set(suppliers.map((s) => s.location.country)).size,
};

*/