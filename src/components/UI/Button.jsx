// src/components/UI/Button.jsx
import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

const Button = ({ children, variant = 'primary', size, className = '', ...props }) => {
  return (
    <BootstrapButton
      variant={variant}
      size={size}
      className={`${className}`}
      {...props}
    >
      {children}
    </BootstrapButton>
  );
};

export default Button;