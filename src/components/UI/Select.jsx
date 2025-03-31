// src/components/UI/Select.jsx
import React from 'react';
import { Form } from 'react-bootstrap';

const Select = ({ label, name, value, onChange, options, className = '', ...props }) => {
  return (
    <Form.Group className={`mb-3 ${className}`}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Select
        name={name}
        value={value}
        onChange={onChange}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default Select;