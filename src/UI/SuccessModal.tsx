import React, { useEffect } from 'react';

interface SuccessModalProps {
  message?: string;
  duration?: number;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  message = '',
  duration = 1000, // 1 sec
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40'>
      <div className='flex flex-col items-center justify-center'>
        <div className='w-24 h-24 flex items-center justify-center bg-green-500 rounded-full shadow-md'>
          <svg
            className='w-12 h-12 text-white'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M5 13l4 4L19 7'
            />
          </svg>
        </div>
        {message && (
          <p className='text-white text-lg font-semibold mt-4'>{message}</p>
        )}
      </div>
    </div>
  );
};

export default SuccessModal;
