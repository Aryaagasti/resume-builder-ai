// src/components/FormSection/Skills.jsx
import React, { useState } from 'react';
import { Button, Form, Row, Col, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateSkills } from '../../features/resumeSlice';

const Skills = () => {
  const dispatch = useDispatch();
  const { skills } = useSelector(state => state.resume);
  const [techInput, setTechInput] = useState('');
  const [softInput, setSoftInput] = useState('');

  const handleAddTechSkill = () => {
    if (techInput.trim()) {
      const newSkills = [...skills.technical, techInput.trim()];
      dispatch(updateSkills({ ...skills, technical: newSkills }));
      setTechInput('');
    }
  };

  const handleAddSoftSkill = () => {
    if (softInput.trim()) {
      const newSkills = [...skills.soft, softInput.trim()];
      dispatch(updateSkills({ ...skills, soft: newSkills }));
      setSoftInput('');
    }
  };

  const handleRemoveTechSkill = (index) => {
    const newSkills = [...skills.technical];
    newSkills.splice(index, 1);
    dispatch(updateSkills({ ...skills, technical: newSkills }));
  };

  const handleRemoveSoftSkill = (index) => {
    const newSkills = [...skills.soft];
    newSkills.splice(index, 1);
    dispatch(updateSkills({ ...skills, soft: newSkills }));
  };

  return (
    <Form.Group className="mb-4 p-3 border rounded">
      <h4 className="mb-3">Skills</h4>
      
      <Row className="mb-3">
        <Col md={6}>
          <Form.Label>Technical Skills</Form.Label>
          <div className="d-flex mb-2">
            <Form.Control
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="e.g., JavaScript, React"
              onKeyPress={(e) => e.key === 'Enter' && handleAddTechSkill()}
            />
            <Button variant="primary" onClick={handleAddTechSkill} className="ms-2">
              Add
            </Button>
          </div>
          <div className="d-flex flex-wrap">
            {skills.technical.map((skill, index) => (
              <Badge key={index} bg="primary" className="me-1 mb-1 d-flex align-items-center">
                {skill}
                <Button
                  variant="link"
                  className="text-white p-0 ms-1"
                  style={{ lineHeight: 1 }}
                  onClick={() => handleRemoveTechSkill(index)}
                >
                  ×
                </Button>
              </Badge>
            ))}
          </div>
        </Col>
        <Col md={6}>
          <Form.Label>Soft Skills</Form.Label>
          <div className="d-flex mb-2">
            <Form.Control
              type="text"
              value={softInput}
              onChange={(e) => setSoftInput(e.target.value)}
              placeholder="e.g., Communication, Teamwork"
              onKeyPress={(e) => e.key === 'Enter' && handleAddSoftSkill()}
            />
            <Button variant="success" onClick={handleAddSoftSkill} className="ms-2">
              Add
            </Button>
          </div>
          <div className="d-flex flex-wrap">
            {skills.soft.map((skill, index) => (
              <Badge key={index} bg="success" className="me-1 mb-1 d-flex align-items-center">
                {skill}
                <Button
                  variant="link"
                  className="text-white p-0 ms-1"
                  style={{ lineHeight: 1 }}
                  onClick={() => handleRemoveSoftSkill(index)}
                >
                  ×
                </Button>
              </Badge>
            ))}
          </div>
        </Col>
      </Row>
    </Form.Group>
  );
};

export default Skills;