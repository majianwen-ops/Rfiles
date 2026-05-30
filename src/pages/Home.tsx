
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Grid, MapPin, History } from 'lucide-react';
import CameraComponent from '../components/Camera';
import { useAppStore } from '../store';
import { analyzeGrassSpecies, getLocation } from '../utils/analysis';
import { Marker } from '../types';

export default function Home() {
  const navigate = useNavigate();
  const { hasGrid, setHasGrid, addRecord, clearMarkers } = useAppStore();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleCapture = async (imageData: string, markers: Marker[], capturedHasGrid: boolean) => {
    setIsAnalyzing(true);

    try {
      const [location, grassSpecies] = await Promise.all([
        getLocation(),
        analyzeGrassSpecies(imageData),
      ]);

      const record = {
        id: Date.now().toString(),
        image: imageData,
        latitude: location.latitude,
        longitude: location.longitude,
        timestamp: new Date().toISOString(),
        grassSpecies,
        markers,
        hasGrid: capturedHasGrid,
      };

      addRecord(record);
      navigate('/result', { state: { record } });
    } catch (error) {
      console.error('Error analyzing:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="relative flex-1">
        <CameraComponent onCapture={handleCapture} />
        
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-xl">
                <MapPin className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-white">
                <p className="text-sm text-gray-300">获取位置中...</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/history')}
            className="bg-black/50 backdrop-blur-sm rounded-2xl p-4 hover:bg-black/70 transition-colors"
          >
            <History className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="absolute top-24 left-1/2 -translate-x-1/2">
          <button
            onClick={() => {
              setHasGrid(!hasGrid);
              clearMarkers();
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-sm transition-all ${
              hasGrid 
                ? 'bg-orange-500/90 text-white shadow-lg' 
                : 'bg-black/50 text-white hover:bg-black/70'
            }`}
          >
            <Grid className="w-5 h-5" />
            <span className="font-medium">{hasGrid ? '网格已开启' : '切换网格'}</span>
          </button>
        </div>

        {isAnalyzing && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white text-lg font-medium">分析中...</p>
              <p className="text-gray-400 mt-2">识别草种并计算盖度</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-900 border-t border-gray-800 p-6">
        <p className="text-gray-400 text-center text-sm">
          {hasGrid ? '点击画面添加标记点' : '点击拍照进行草种识别'}
        </p>
      </div>
    </div>
  );
}
