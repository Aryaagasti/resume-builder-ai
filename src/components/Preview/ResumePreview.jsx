import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Alert } from 'react-bootstrap';
import { downloadPDF, downloadDOCX } from '../../services/resumeService';

const ResumePreview = () => {
  const { generatedContent, basicInfo } = useSelector(state => state.resume);

  const handleDownloadPDF = () => {
    if (!generatedContent) {
      alert('Please generate a resume first');
      return;
    }
    downloadPDF(generatedContent, `${basicInfo.name || 'resume'}`.replace(/\s+/g, '_'));
  };

  const handleDownloadDOCX = () => {
    if (!generatedContent) {
      alert('Please generate a resume first');
      return;
    }
    downloadDOCX(generatedContent, `${basicInfo.name || 'resume'}`.replace(/\s+/g, '_'));
  };

  return (
    <div className="p-3" style={{ backgroundColor: '#f8f9fa' }}>
      {generatedContent ? (
        <>
          <div className="mb-3 d-flex gap-2">
            <Button variant="primary" onClick={handleDownloadPDF}>
              Download PDF
            </Button>
            <Button variant="outline-primary" onClick={handleDownloadDOCX}>
              Download DOCX
            </Button>
          </div>
          <div 
            className="bg-white p-4 shadow-sm rounded" 
            dangerouslySetInnerHTML={{ __html: generatedContent }}
            style={{ 
              minHeight: '500px',
              border: '1px solid #dee2e6'
            }}
          />
        </>
      ) : (
        <Alert variant="info" className="text-center">
          Your generated resume will appear here after you click "Generate Resume"
        </Alert>
      )}
    </div>
  );
};

export default ResumePreview;