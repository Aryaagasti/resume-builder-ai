// src/components/FormSection/Experience.jsx
import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateExperience } from '../../features/resumeSlice';

const Experience = () => {
  const dispatch = useDispatch();
  const { experience } = useSelector(state => state.resume);
  const [formData, setFormData] = useState({
    position: '',
    company: '',
    startDate: '',
    endDate: '',
    responsibilities: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddExperience = () => {
    if (formData.position && formData.company) {
      dispatch(updateExperience([...experience, formData]));
      setFormData({
        position: '',
        company: '',
        startDate: '',
        endDate: '',
        responsibilities: ''
      });
    }
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = [...experience];
    updatedExperience.splice(index, 1);
    dispatch(updateExperience(updatedExperience));
  };

  return (
    <Form.Group className="mb-4 p-3 border rounded">
      <h4 className="mb-3">Work Experience</h4>
      
      <Row className="mb-3">
        <Col md={6}>
          <Form.Label>Position</Form.Label>
          <Form.Control
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="e.g., Software Engineer"
          />
        </Col>
        <Col md={6}>
          <Form.Label>Company</Form.Label>
          <Form.Control
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g., Tech Corp Inc."
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="text"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            placeholder="e.g., Jun 2020"
          />
        </Col>
        <Col md={3}>
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="text"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            placeholder="e.g., Present"
          />
        </Col>
        <Col md={6}>
          <Form.Label>Responsibilities</Form.Label>
          <Form.Control
            as="textarea"
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            placeholder="Describe your responsibilities and achievements"
            rows={2}
          />
        </Col>
      </Row>

      <div className="mb-3">
        <Button variant="primary" onClick={handleAddExperience} className="w-100">
          Add Experience
        </Button>
      </div>

      {experience.length > 0 && (
        <div className="mt-3">
          <h5>Added Experience</h5>
          <ul className="list-group">
            {experience.map((exp, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{exp.position}</strong> at {exp.company} ({exp.startDate}-{exp.endDate})
                </div>
                <Button variant="danger" size="sm" onClick={() => handleRemoveExperience(index)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Form.Group>
  );
};

export default Experience;