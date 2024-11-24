import React from 'react';

export interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder = '',
  error = '',
}) => {
  return (
    <div className='mb-4'>
      <label className='block text-sm font-semibold text-gray-700 mb-1'>
        {label}
      </label>
      <div className='bg-gray-50 flex items-center border rounded-lg shadow-sm p-3'>
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-transparent outline-none text-gray-800 ${
            error ? 'border-red-500' : ''
          }`}
        />
      </div>
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  );
};

export default InputField;
