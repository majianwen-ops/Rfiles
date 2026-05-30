
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, MapPin, Calendar } from 'lucide-react';
import { useAppStore } from '../store';
import { SurveyRecord } from '../types';

export default function History() {
  const navigate = useNavigate();
  const { records, loadRecords, deleteRecord, setCurrentRecord } = useAppStore();

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleRecordClick = (record: SurveyRecord) => {
    setCurrentRecord(record);
    navigate('/result', { state: { record } });
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
          <h1 className="text-xl font-bold text-white">历史记录</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        {records.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-600" />
            </div>
            <p className="text-gray-400 text-lg">暂无记录</p>
            <p className="text-gray-500 text-sm mt-2">开始拍照创建第一条记录</p>
          </div>
        ) : (
          <div className="space-y-4">
            {records.map((record) => (
              <div
                key={record.id}
                className="bg-gray-800 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => handleRecordClick(record)}
                  className="w-full text-left"
                >
                  <div className="relative aspect-video">
                    <img
                      src={record.image}
                      alt="Survey"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center gap-2 text-white/90 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{record.latitude.toFixed(4)}°, {record.longitude.toFixed(4)}°</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(record.timestamp)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400 text-sm font-medium">
                          {record.grassSpecies.length} 种草
                        </span>
                        {record.markers.length > 0 && (
                          <span className="text-orange-400 text-sm font-medium">
                            {record.markers.length} 个标记
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {record.grassSpecies.slice(0, 3).map((grass, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1.5 bg-gray-700/50 px-3 py-1.5 rounded-full"
                        >
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: grass.color }}
                          />
                          <span className="text-white text-xs">{grass.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </button>
                <div className="px-4 pb-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteRecord(record.id);
                    }}
                    className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 py-2 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm font-medium">删除记录</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
