export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export interface SupplierLocation {
  lat: number;
  lng: number;
  city: string;
  country: string;
}

export interface CompanyReport {
  id: string;
  pollution_index: number;
  data: PollutionData[];
}

export interface Company {
  id: number;
  risk_score: number;
  name: string;
  location: string;

  risk_level?: 'LOW' | 'MEDIUM' | 'HIGH'
}

export interface PollutionData {
  date: string;
  value: number;
}

export interface Anomaly {
  date: string;
  description: string;
  severity: RiskLevel;
}

export interface DataSource {
  title: string;
  description: string;
  reference: string;
  icon: string;
}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}
