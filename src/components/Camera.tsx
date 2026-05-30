
import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../store';
import { Marker } from '../types';

interface CameraProps {
  onCapture: (imageData: string, markers: Marker[], hasGrid: boolean) => void;
}

export default function Camera({ onCapture }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const { hasGrid, markers, addMarker, clearMarkers } = useAppStore();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setStream(mediaStream);
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!hasGrid) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    addMarker({
      x,
      y,
      id: Date.now().toString(),
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !videoRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvas = () => {
      if (videoRef.current) {
        canvas.width = videoRef.current.videoWidth || canvas.clientWidth;
        canvas.height = videoRef.current.videoHeight || canvas.clientHeight;

        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        drawQuadrat(ctx, canvas.width, canvas.height);
        requestAnimationFrame(updateCanvas);
      }
    };

    updateCanvas();
  }, [hasGrid, markers]);

  const drawQuadrat = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const size = Math.min(width, height) * 0.7;
    const x = (width - size) / 2;
    const y = (height - size) / 2;

    ctx.strokeStyle = '#FF9800';
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, size, size);

    if (hasGrid) {
      ctx.strokeStyle = 'rgba(255, 152, 0, 0.5)';
      ctx.lineWidth = 1;

      for (let i = 1; i < 10; i++) {
        const linePos = x + (size / 10) * i;
        ctx.beginPath();
        ctx.moveTo(linePos, y);
        ctx.lineTo(linePos, y + size);
        ctx.stroke();

        const linePosY = y + (size / 10) * i;
        ctx.beginPath();
        ctx.moveTo(x, linePosY);
        ctx.lineTo(x + size, linePosY);
        ctx.stroke();
      }

      markers.forEach((marker) => {
        const markerX = x + (marker.x / 100) * size;
        const markerY = y + (marker.y / 100) * size;

        ctx.fillStyle = '#FF5722';
        ctx.beginPath();
        ctx.arc(markerX, markerY, 8, 0, 2 * Math.PI);
        ctx.fill();

        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    }

    ctx.fillStyle = '#FF9800';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('1m × 1m', x + 10, y - 10);
  };

  const handleCapture = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imageData = canvas.toDataURL('image/jpeg', 0.9);
    onCapture(imageData, [...markers], hasGrid);
    clearMarkers();
  };

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="absolute inset-0 w-full h-full cursor-crosshair"
      />
      <button
        onClick={handleCapture}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-orange-500 rounded-full border-4 border-white shadow-lg hover:bg-orange-600 active:scale-95 transition-all"
      >
        <div className="w-10 h-10 rounded-full border-2 border-white mx-auto" />
      </button>
    </div>
  );
}
