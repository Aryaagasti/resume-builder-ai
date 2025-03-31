// src/App.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Tab, Nav, Button, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import BasicInfo from './components/FormSection/BasicInfo';
import Education from './components/FormSection/Education';
import Experience from './components/FormSection/Experience';
import Projects from './components/FormSection/Projects';
import Skills from './components/FormSection/Skills';
import ResumePreview from './components/Preview/ResumePreview';
import Analysis from './components/Analysis/Analysis';
import { generateResumeStart, generateResumeSuccess, generateResumeFailure } from './features/resumeSlice';
import { generateATSResume } from './services/geminiService';
import { calculateATSScore, generateAnalysis } from './utils/atsScorer';

function App() {
  const dispatch = useDispatch();
  const resume = useSelector(state => state.resume); // Get all resume data here
  const [activeTab, setActiveTab] = useState('preview');

  // In your App.jsx, update the handleGenerateResume function:
const handleGenerateResume = async () => {
  dispatch(generateResumeStart());
  try {
    const content = await generateATSResume(resume);
    const scoreResult = calculateATSScore(content);
    const analysis = generateAnalysis(scoreResult);
    
    dispatch(generateResumeSuccess({
      content,
      score: analysis.score,
      analysis: analysis.details,
      summary: analysis.summary
    }));
    setActiveTab('analysis');
  } catch (error) {
    dispatch(generateResumeFailure());
    alert(`Failed to generate resume: ${error.message}`);
  }
};

  return (
    <Container fluid className="vh-100 p-0">
      <Row className="g-0 h-100">
        <Col md={6} className="p-4 bg-light h-100 overflow-auto">
          <Tab.Container defaultActiveKey="basic">
            <Nav variant="tabs" className="mb-4">
              <Nav.Item>
                <Nav.Link eventKey="basic">Basic Info</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="education">Education</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="experience">Experience</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="projects">Projects</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="skills">Skills</Nav.Link>
              </Nav.Item>
            </Nav>
            
            <Tab.Content>
              <Tab.Pane eventKey="basic">
                <BasicInfo />
              </Tab.Pane>
              <Tab.Pane eventKey="education">
                <Education />
              </Tab.Pane>
              <Tab.Pane eventKey="experience">
                <Experience />
              </Tab.Pane>
              <Tab.Pane eventKey="projects">
                <Projects />
              </Tab.Pane>
              <Tab.Pane eventKey="skills">
                <Skills />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
          
          <Button 
            variant="primary" 
            onClick={handleGenerateResume}
            disabled={resume.isLoading}
            className="w-100 mt-3"
          >
            {resume.isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Generating...
              </>
            ) : 'Generate Resume'}
          </Button>
        </Col>
        
        <Col md={6} className="p-4 h-100 overflow-auto">
          <div className="d-flex mb-3">
            <Button 
              variant={activeTab === 'preview' ? 'primary' : 'outline-primary'}
              onClick={() => setActiveTab('preview')}
              className="me-2"
            >
              Preview
            </Button>
            <Button 
              variant={activeTab === 'analysis' ? 'primary' : 'outline-primary'}
              onClick={() => setActiveTab('analysis')}
            >
              Analysis
            </Button>
          </div>
          
          {activeTab === 'preview' ? <ResumePreview /> : <Analysis />}
        </Col>
      </Row>
    </Container>
  );
}

export default App;