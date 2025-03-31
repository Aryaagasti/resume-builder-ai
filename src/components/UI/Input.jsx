// src/components/UI/Input.jsx
import React from 'react';
import { Form } from 'react-bootstrap';

const Input = ({ label, type = 'text', name, value, onChange, placeholder, className = '', ...props }) => {
  return (
    <Form.Group className={`mb-3 ${className}`}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
    </Form.Group>
  );
};

export default Input;