
export interface GrassSpecies {
  name: string;
  coverage: number;
  color: string;
}

export interface Marker {
  x: number;
  y: number;
  id: string;
}

export interface SurveyRecord {
  id: string;
  image: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  grassSpecies: GrassSpecies[];
  markers: Marker[];
  hasGrid: boolean;
}
