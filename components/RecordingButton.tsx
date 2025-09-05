'use client';

import { useState, useRef } from 'react';
import { Mic, Square, Video } from 'lucide-react';

interface RecordingButtonProps {
  onRecordingStart?: () => void;
  onRecordingStop?: (blob: Blob) => void;
}

export function RecordingButton({ onRecordingStart, onRecordingStop }: RecordingButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: true 
      });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: Blob[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        onRecordingStop?.(blob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      onRecordingStart?.();
      
      // Start timer
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Unable to access camera/microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center space-y-4">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`
          w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-lg
          transition-all duration-200 shadow-lg hover:shadow-xl
          ${isRecording 
            ? 'bg-red-600 hover:bg-red-700 recording-pulse' 
            : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
          }
        `}
      >
        {isRecording ? (
          <Square className="w-8 h-8" />
        ) : (
          <div className="flex items-center space-x-1">
            <Video className="w-6 h-6" />
            <Mic className="w-5 h-5" />
          </div>
        )}
      </button>
      
      {isRecording && (
        <div className="text-center">
          <div className="text-red-400 font-mono text-lg font-bold">
            REC {formatTime(recordingTime)}
          </div>
          <p className="text-text-secondary text-sm mt-1">
            Recording in progress...
          </p>
        </div>
      )}
      
      {!isRecording && (
        <div className="text-center">
          <h3 className="text-lg font-semibold text-text-primary">Quick Record</h3>
          <p className="text-text-secondary text-sm">
            Tap to start recording audio & video
          </p>
        </div>
      )}
    </div>
  );
}
