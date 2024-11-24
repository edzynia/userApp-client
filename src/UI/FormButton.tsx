import React from 'react';

interface FormButtonProps {
  label: string;
  loading?: boolean;
  disabled?: boolean;
}

const FormButton: React.FC<FormButtonProps> = ({
  label,
  loading = false,
  disabled = false,
}) => {
  return (
    <button
      type='submit'
      className={`w-full bg-primary text-white py-3 rounded-full transition-all duration-200 text-lg mt-6 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={disabled}
    >
      {loading ? 'Logging in...' : label}
    </button>
  );
};

export default FormButton;
