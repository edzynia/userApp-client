import React from 'react';
import BackButton from './BackButton';

const FormWrapper: React.FC<{
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}> = ({ title, onSubmit, children }) => {
  return (
    <div className='min-h-screen flex justify-center items-start'>
      <div className='bg-white shadow-xl rounded-2xl p-6 w-full max-w-md'>
        <div className='flex items-center justify-between mb-4'>
          <BackButton />
          <h2 className='text-2xl text-textGray text-center flex-1'>{title}</h2>
        </div>
        <form onSubmit={onSubmit} className='space-y-4'>
          {children}
        </form>
      </div>
    </div>
  );
};

export default FormWrapper;
