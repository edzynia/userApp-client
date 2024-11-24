import React from 'react';

export interface UserFieldProps {
  name: string;
  city: string;
  email: string;
}

const UserField: React.FC<UserFieldProps> = ({ name, city, email }) => {
  const fields = [
    { icon: '👤', value: name, style: 'font-bold text-gray-800' },
    { icon: '📧', value: email, style: 'text-gray-700' },
    { icon: '🏠', value: city, style: 'text-gray-600' },
  ];

  return (
    <div className='grid grid-cols-3 gap-4 items-center'>
      {fields.map(({ icon, value, style }, index) => (
        <div key={index} className='flex items-center'>
          <span className='text-gray-500'>{icon}</span>
          <span className={`ml-2 ${style}`}>{value}</span>
        </div>
      ))}
    </div>
  );
};

export default UserField;
