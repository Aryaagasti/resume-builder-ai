// src/components/UI/TextArea.jsx
import React from 'react';
import { Form } from 'react-bootstrap';

const TextArea = ({ label, name, value, onChange, placeholder, rows = 3, className = '', ...props }) => {
  return (
    <Form.Group className={`mb-3 ${className}`}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        as="textarea"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        {...props}
      />
    </Form.Group>
  );
};

export default TextArea;