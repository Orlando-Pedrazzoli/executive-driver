'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Por enquanto usar número placeholder - substituir com número real da cliente
  const whatsappNumber = '351912164220';
  const defaultMessage =
    'Olá! Gostaria de solicitar um orçamento para serviço de motorista executiva.';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => setShowTooltip(true), 1000);
      setTimeout(() => setShowTooltip(false), 5000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(defaultMessage);
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className='fixed bottom-6 right-6 z-50 flex items-center gap-4'>
      {/* Tooltip */}
      <div
        className={`
          bg-white rounded-lg shadow-premium px-4 py-2 transition-all duration-300
          ${
            showTooltip
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-4 pointer-events-none'
          }
        `}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <p className='text-sm font-medium text-gray-800'>
          Fale conosco no WhatsApp!
        </p>
        <p className='text-xs text-gray-600'>Resposta em minutos</p>
      </div>

      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className='
          group relative bg-green-500 hover:bg-green-600 text-white 
          rounded-full p-4 shadow-premium transition-all duration-300
          hover:scale-110 whatsapp-pulse
        '
        aria-label='Abrir WhatsApp'
      >
        <MessageCircle className='w-6 h-6' />

        {/* Notification badge */}
        <span className='absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping' />
        <span className='absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full' />
      </button>
    </div>
  );
}
