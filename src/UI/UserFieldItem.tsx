import React from 'react';

interface UserFieldItemProps {
  icon: string;
  value: string;
  style: string;
}

const UserFieldItem: React.FC<UserFieldItemProps> = ({
  icon,
  value,
  style,
}) => {
  return (
    <div className='flex items-center space-x-2'>
      <span className='text-gray-500 text-lg'>{icon}</span>
      <span className={`text-lg ${style}`}>{value}</span>
    </div>
  );
};

export default UserFieldItem;
