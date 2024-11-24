import React from 'react';

export interface FieldsContainerProps {
  className?: string;
  children: React.ReactNode;
}

const FieldsContainer: React.FC<FieldsContainerProps> = ({
  className,
  children,
}) => {
  return <div className={`default-styles ${className}`}>{children}</div>;
};

export default FieldsContainer;
