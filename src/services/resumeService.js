// src/services/resumeService.js
import html2pdf from 'html2pdf.js';
import { Packer } from 'docx';
import { Document, Paragraph, TextRun } from 'docx';

export const downloadPDF = (content, filename) => {
  try {
    // Create a clean div element
    const element = document.createElement('div');
    element.innerHTML = typeof content === 'string' ? content : JSON.stringify(content);
    
    const opt = {
      margin: 10,
      filename: `${filename || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        logging: true,
        useCORS: true
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait' 
      }
    };

    // Generate PDF
    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .catch(err => console.error('PDF generation error:', err));
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  }
};

export const downloadDOCX = async (content, filename) => {
  try {
    // Convert HTML to plain text for DOCX
    const plainText = typeof content === 'string' 
      ? content.replace(/<[^>]+>/g, ' ') 
      : JSON.stringify(content);

    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: plainText,
                size: 24, // 12pt
                font: 'Arial'
              })
            ]
          })
        ]
      }]
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename || 'resume'}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating DOCX:', error);
    alert('Failed to generate DOCX. Please try again.');
  }
};