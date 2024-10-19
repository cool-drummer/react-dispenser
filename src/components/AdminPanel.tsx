import React, { useState } from 'react';
import axios from 'axios';
import { Play, Square } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'running' | 'stopped'>('idle');

  const handleStart = async () => {
    try {
      await axios.post('/api/admin/start');
      setStatus('running');
    } catch (error) {
      console.error('Error starting motor:', error);
    }
  };

  const handleStop = async () => {
    try {
      await axios.post('/api/admin/stop');
      setStatus('stopped');
    } catch (error) {
      console.error('Error stopping motor:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>
      <div className="flex space-x-4">
        <button
          onClick={handleStart}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          disabled={status === 'running'}
        >
          <Play className="mr-2" size={20} />
          Iniciar
        </button>
        <button
          onClick={handleStop}
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          disabled={status === 'stopped'}
        >
          <Square className="mr-2" size={20} />
          Detener
        </button>
      </div>
      <p className="mt-4 text-gray-600">
        Estado: {status === 'idle' ? 'Inactivo' : status === 'running' ? 'En funcionamiento' : 'Detenido'}
      </p>
    </div>
  );
};

export default AdminPanel;