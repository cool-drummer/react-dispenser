import axios from 'axios';
import { Egg } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const UserInterface: React.FC = () => {
  const [status, setStatus] = useState<'standby' | 'processing' | 'completed'>('standby');

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await axios.get('/api/user/status');
        setStatus(response.data.status);
      } catch (error) {
        console.error('Error checking status:', error);
      }
    };

    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRequest = async () => {
    try {
      await axios.post('/api/user/request');
      setStatus('processing');
    } catch (error) {
      console.error('Error making request:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Servicio de Huevos</h1>
      {status === 'standby' && (
        <button
          onClick={handleRequest}
          className="flex items-center px-6 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors text-lg"
        >
          <Egg className="mr-2" size={24} />
          Pide tu kilo de huevo aquí
        </button>
      )}
      {status === 'processing' && (
        <div>
          <p className="text-lg mb-4">Procesando tu pedido</p>
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      )}
      {status === 'completed' && (
        <div>
          <p className="text-lg mb-4">¡Gracias por tu pedido!</p>
          <p className="text-md">Vuelve pronto</p>
        </div>
      )}
    </div>
  );
};

export default UserInterface;