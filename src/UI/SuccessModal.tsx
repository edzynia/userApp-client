import React, { useEffect } from 'react';

interface SuccessModalProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

interface SuccessModalProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  message,
  duration = 1500, //1.5sec
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg shadow-lg p-6 text-center'>
        <p className='text-green-500 text-lg font-semibold'>{message}</p>
      </div>
    </div>
  );
};

export default SuccessModal;
