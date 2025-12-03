
export type Language = 'en' | 'ru';

export interface LocalizedString {
  en: string;
  ru: string;
}

export enum ProjectName {
  CORALINA = 'Coralina',
  SERENITY = 'Serenity',
  SIERRA = 'Sierra'
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface UnitPlan {
  id: string;
  project: ProjectName;
  name: string; // The display name e.g., "1 Bedroom S"
  code: string; // The specific unit code e.g., "1BSC1"
  category: string; // Normalized category for comparison e.g., "1 Bedroom"
  subCategory: string; // S, M, L, Plus, etc.
  minSize: number;
  maxSize: number;
}

export interface MasterPlanMetrics {
  unitsPerRai: number; // Density
  greenSpaceRatio: number; // % of land
  commonAreaPerUnit: number; // sqm per unit
  totalCommonArea: number;
  distinctZones: LocalizedString[];
  facilityDensity: number; // Unique facilities per building
}

export interface LayoutFeature {
  category: 'Orientation' | 'Facilities' | 'Parking' | 'Zoning';
  description: LocalizedString;
  icon: string;
}

export interface ProjectInfo {
  name: ProjectName;
  totalUnits: number;
  landAreaRai: string;
  landAreaSqm: number;
  buildings: number;
  storeys: number;
  location: LocalizedString;
  coordinates: Coordinates;
  facilities: string[];
  unitTypes: string[];
  masterPlan: MasterPlanMetrics;
  layoutFeatures: LayoutFeature[];
}

export interface SetAnalysisResult {
  union: string[];
  intersection: string[];
  uniqueToCoralina: string[];
  uniqueToSerenity: string[];
  uniqueToSierra: string[];
}