// src/components/FormSection/Projects.jsx
import React, { useState } from 'react';
import { Button, Form, Row, Col, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateProjects } from '../../features/resumeSlice';

const Projects = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector(state => state.resume);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    link: ''
  });
  const [techInput, setTechInput] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProject = () => {
    if (formData.title && formData.description) {
      const technologies = techInput.split(',').map(tech => tech.trim()).filter(tech => tech);
      dispatch(updateProjects([...projects, { ...formData, technologies }]));
      setFormData({
        title: '',
        description: '',
        technologies: '',
        link: ''
      });
      setTechInput('');
    }
  };

  const handleRemoveProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    dispatch(updateProjects(updatedProjects));
  };

  return (
    <Form.Group className="mb-4 p-3 border rounded">
      <h4 className="mb-3">Projects</h4>
      
      <Row className="mb-3">
        <Col md={6}>
          <Form.Label>Project Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., E-commerce Website"
          />
        </Col>
        <Col md={6}>
          <Form.Label>Project Link (optional)</Form.Label>
          <Form.Control
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="e.g., https://github.com/username/project"
          />
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the project, your role, and key achievements"
          rows={3}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Technologies Used (comma separated)</Form.Label>
        <Form.Control
          type="text"
          value={techInput}
          onChange={(e) => setTechInput(e.target.value)}
          placeholder="e.g., React, Node.js, MongoDB"
        />
      </Form.Group>

      <div className="mb-3">
        <Button variant="primary" onClick={handleAddProject} className="w-100">
          Add Project
        </Button>
      </div>

      {projects.length > 0 && (
        <div className="mt-3">
          <h5>Added Projects</h5>
          <ul className="list-group">
            {projects.map((proj, index) => (
              <li key={index} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{proj.title}</strong>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="ms-2">
                        <Badge bg="info">Link</Badge>
                      </a>
                    )}
                  </div>
                  <Button variant="danger" size="sm" onClick={() => handleRemoveProject(index)}>
                    Remove
                  </Button>
                </div>
                <p className="mt-2 mb-1">{proj.description}</p>
                <div>
                  {proj.technologies.map((tech, i) => (
                    <Badge key={i} bg="secondary" className="me-1">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Form.Group>
  );
};

export default Projects;