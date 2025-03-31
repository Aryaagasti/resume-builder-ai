// src/components/Analysis/Analysis.jsx
import React from 'react';
import { Card, ProgressBar, Alert, Button, Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { downloadPDF, downloadDOCX } from '../../services/resumeService';

const Analysis = () => {
  const { atsScore, analysis, generatedContent, basicInfo } = useSelector(state => state.resume);

  const getScoreVariant = () => {
    if (atsScore >= 85) return 'success';
    if (atsScore >= 75) return 'warning';
    return 'danger';
  };

  const handleDownloadPDF = () => {
    downloadPDF(generatedContent, `${basicInfo.name || 'resume'}`.replace(/\s+/g, '_'));
  };

  const handleDownloadDOCX = () => {
    downloadDOCX(generatedContent, `${basicInfo.name || 'resume'}`.replace(/\s+/g, '_'));
  };

  // Parse the analysis details if it's a string
  const parsedAnalysis = typeof analysis === 'string' ? {
    summary: analysis.split('\n\n')[0] || 'No summary available',
    details: analysis,
    score: atsScore
  } : analysis;

  return (
    <Card className="mb-4">
      <Card.Header as="h5" className="bg-primary text-white">
        Resume Analysis
      </Card.Header>
      <Card.Body>
        <div className="text-center mb-4">
          <h3>ATS Score: {atsScore || 0}/100</h3>
          <ProgressBar
            now={atsScore || 0}
            label={`${atsScore || 0}%`}
            variant={getScoreVariant()}
            className="mb-3"
            style={{ height: '30px' }}
          />
          <Alert variant={getScoreVariant()} className="text-center">
            <strong>{parsedAnalysis.summary || 'No analysis summary available'}</strong>
          </Alert>
        </div>

        <Accordion defaultActiveKey="0" className="mb-4">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Detailed Analysis Breakdown</Accordion.Header>
            <Accordion.Body>
              <div style={{ whiteSpace: 'pre-wrap' }}>
                {parsedAnalysis.details || 'No detailed analysis available'}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <div className="d-flex justify-content-center gap-3">
          <Button variant="primary" onClick={handleDownloadPDF}>
            Download PDF
          </Button>
          <Button variant="secondary" onClick={handleDownloadDOCX}>
            Download DOCX
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Analysis;