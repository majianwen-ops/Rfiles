
import { GrassSpecies } from '../types';

export const analyzeGrassSpecies = async (imageData: string): Promise<GrassSpecies[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const grassTypes = [
        { name: '羊草', color: '#4CAF50' },
        { name: '针茅', color: '#8BC34A' },
        { name: '冰草', color: '#CDDC39' },
        { name: '隐子草', color: '#FFEB3B' },
        { name: '早熟禾', color: '#FFC107' },
      ];

      const numSpecies = Math.floor(Math.random() * 3) + 2;
      const selected = grassTypes.sort(() => Math.random() - 0.5).slice(0, numSpecies);
      
      let remaining = 100;
      const result: GrassSpecies[] = [];
      
      selected.forEach((grass, index) => {
        if (index === selected.length - 1) {
          result.push({ ...grass, coverage: remaining });
        } else {
          const coverage = Math.floor(Math.random() * remaining * 0.7) + 10;
          result.push({ ...grass, coverage });
          remaining -= coverage;
        }
      });

      resolve(result.sort((a, b) => b.coverage - a.coverage));
    }, 1500);
  });
};

export const getLocation = (): Promise<{ latitude: number; longitude: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        resolve({
          latitude: 39.9042 + (Math.random() - 0.5) * 0.1,
          longitude: 116.4074 + (Math.random() - 0.5) * 0.1,
        });
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });
};
