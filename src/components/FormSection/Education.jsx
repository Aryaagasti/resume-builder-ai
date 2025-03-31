// src/components/FormSection/Education.jsx
import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateEducation } from '../../features/resumeSlice';

const Education = () => {
  const dispatch = useDispatch();
  const { education } = useSelector(state => state.resume);
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    startYear: '',
    endYear: '',
    gpa: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddEducation = () => {
    if (formData.degree && formData.institution) {
      dispatch(updateEducation([...education, formData]));
      setFormData({
        degree: '',
        institution: '',
        startYear: '',
        endYear: '',
        gpa: ''
      });
    }
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    dispatch(updateEducation(updatedEducation));
  };

  return (
    <Form.Group className="mb-4 p-3 border rounded">
      <h4 className="mb-3">Education</h4>
      
      <Row className="mb-3">
        <Col md={6}>
          <Form.Label>Degree</Form.Label>
          <Form.Control
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            placeholder="e.g., Bachelor of Science in Computer Science"
          />
        </Col>
        <Col md={6}>
          <Form.Label>Institution</Form.Label>
          <Form.Control
            type="text"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            placeholder="e.g., University of Technology"
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <Form.Label>Start Year</Form.Label>
          <Form.Control
            type="text"
            name="startYear"
            value={formData.startYear}
            onChange={handleChange}
            placeholder="e.g., 2018"
          />
        </Col>
        <Col md={3}>
          <Form.Label>End Year</Form.Label>
          <Form.Control
            type="text"
            name="endYear"
            value={formData.endYear}
            onChange={handleChange}
            placeholder="e.g., 2022"
          />
        </Col>
        <Col md={3}>
          <Form.Label>GPA</Form.Label>
          <Form.Control
            type="text"
            name="gpa"
            value={formData.gpa}
            onChange={handleChange}
            placeholder="e.g., 3.8"
          />
        </Col>
        <Col md={3} className="d-flex align-items-end">
          <Button variant="primary" onClick={handleAddEducation} className="w-100">
            Add Education
          </Button>
        </Col>
      </Row>

      {education.length > 0 && (
        <div className="mt-3">
          <h5>Added Education</h5>
          <ul className="list-group">
            {education.map((edu, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{edu.degree}</strong> at {edu.institution} ({edu.startYear}-{edu.endYear})
                </div>
                <Button variant="danger" size="sm" onClick={() => handleRemoveEducation(index)}>
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

export default Education;