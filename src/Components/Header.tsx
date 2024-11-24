import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  logoSrc: string;
  logoAlt: string;
}

const Header: React.FC<HeaderProps> = ({ logoSrc, logoAlt }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/users'); // Redirect to UserList
  };

  return (
    <header className='flex items-center justify-center py-4'>
      <img
        src={logoSrc}
        alt={logoAlt}
        style={{
          width: '110px',
          height: '110px',
          margin: '1.5rem',
          cursor: 'pointer',
        }}
        onClick={handleLogoClick}
      />
    </header>
  );
};

export default Header;
