
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { SurveyRecord } from '../types';

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const record = location.state?.record as SurveyRecord;

  if (!record) {
    navigate('/');
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="sticky top-0 z-10 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 -ml-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white">分析结果</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <div className="relative rounded-2xl overflow-hidden aspect-video">
          <img src={record.image} alt="Survey" className="w-full h-full object-cover" />
          <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            已完成
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <MapPin className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">位置</p>
              <p className="text-white font-medium">
                {record.latitude.toFixed(6)}°N, {record.longitude.toFixed(6)}°E
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-xl">
              <Calendar className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">时间</p>
              <p className="text-white font-medium">{formatDate(record.timestamp)}</p>
            </div>
          </div>

          {record.markers.length > 0 && (
            <div className="pt-2 border-t border-gray-700">
              <p className="text-gray-400 text-sm mb-2">标记点</p>
              <p className="text-white font-medium">{record.markers.length} 个标记</p>
            </div>
          )}
        </div>

        <div className="bg-gray-800 rounded-2xl p-5">
          <h2 className="text-lg font-bold text-white mb-4">草种识别</h2>
          <div className="space-y-3">
            {record.grassSpecies.map((grass, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: grass.color }}
                    />
                    <span className="text-white font-medium">{grass.name}</span>
                  </div>
                  <span className="text-green-400 font-bold">{grass.coverage}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${grass.coverage}%`,
                      backgroundColor: grass.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-2xl transition-colors"
        >
          继续拍照
        </button>
      </main>
    </div>
  );
}
