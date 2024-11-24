import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  // Optional portal target
  portalTarget?: HTMLElement;
}

const Modal: React.FC<ModalProps> = ({
  title,
  content,
  onConfirm,
  onCancel,
  confirmText = 'Yes',
  cancelText = 'No',
  // Default portal target
  portalTarget = document.body,
}) => {
  return ReactDOM.createPortal(
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white rounded-lg shadow-lg w-[450px] p-6'>
        <h2 className='text-xl font-bold text-gray-700 mb-4 text-center'>
          {title}
        </h2>
        <p className='text-gray-600 mb-6 text-center'>{content}</p>
        <div className='flex gap-4 mt-4'>
          <button
            onClick={onCancel}
            className='bg-gray-300 text-gray-700 py-3 px-6 w-48 rounded-full transition-all duration-200 hover:bg-gray-400'
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className='bg-primary text-white py-3 px-6 w-48 rounded-full transition-all duration-200 hover:bg-green-700'
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    portalTarget,
  );
};

export default Modal;
