import React from 'react';

export interface UserListWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const UserListWrapper: React.FC<UserListWrapperProps> = ({
  children,
  className = '',
}) => {
  return <div className={`default-styles ${className}`}>{children}</div>;
};

export default UserListWrapper;
