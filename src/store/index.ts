
import { create } from 'zustand';
import { SurveyRecord, GrassSpecies, Marker } from '../types';

interface AppState {
  hasGrid: boolean;
  setHasGrid: (value: boolean) => void;
  markers: Marker[];
  addMarker: (marker: Marker) => void;
  clearMarkers: () => void;
  records: SurveyRecord[];
  addRecord: (record: SurveyRecord) => void;
  deleteRecord: (id: string) => void;
  loadRecords: () => void;
  currentRecord: SurveyRecord | null;
  setCurrentRecord: (record: SurveyRecord | null) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  hasGrid: false,
  setHasGrid: (value) => set({ hasGrid: value }),
  markers: [],
  addMarker: (marker) => set((state) => ({ markers: [...state.markers, marker] })),
  clearMarkers: () => set({ markers: [] }),
  records: [],
  addRecord: (record) => {
    const newRecords = [record, ...get().records];
    set({ records: newRecords });
    localStorage.setItem('surveyRecords', JSON.stringify(newRecords));
  },
  deleteRecord: (id) => {
    const newRecords = get().records.filter((r) => r.id !== id);
    set({ records: newRecords });
    localStorage.setItem('surveyRecords', JSON.stringify(newRecords));
  },
  loadRecords: () => {
    const stored = localStorage.getItem('surveyRecords');
    if (stored) {
      set({ records: JSON.parse(stored) });
    }
  },
  currentRecord: null,
  setCurrentRecord: (record) => set({ currentRecord: record }),
}));
