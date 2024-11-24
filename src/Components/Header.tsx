import React from 'react';

interface HeaderProps {
  logoSrc: string;
  logoAlt: string;
}

const Header: React.FC<HeaderProps> = ({ logoSrc, logoAlt }) => {
  return (
    <header className='flex items-center justify-center py-4'>
      <img
        src={logoSrc}
        alt={logoAlt}
        style={{ width: '110px', height: '110px', margin: '1.5rem' }}
      />
    </header>
  );
};

export default Header;
