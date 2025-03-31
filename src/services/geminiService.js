// src/services/geminiService.js
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const generateATSResume = async (resumeData) => {
  // Validate input data
  if (!resumeData || !resumeData.basicInfo) {
    throw new Error('Incomplete resume data provided');
  }

  const prompt = `
  Generate an ATS-friendly resume for a software engineering position with an ATS score of 75+.
  Return the resume in clean HTML format with no additional commentary or markdown.
  
  Requirements:
  1. Add black horizontal divider bars after each major section
  2. Use this exact HTML for dividers: <hr style="border: 1px solid black; margin: 20px 0;">
  3. Include these exact section headings (case sensitive):
     - EXPERIENCE
     - EDUCATION
     - SKILLS
     - PROJECTS
  4. Maintain professional formatting with proper HTML structure

  Personal Information:
  <div style="margin-bottom: 20px;">
    <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 5px;">${resumeData.basicInfo.name || 'Your Name'}</h1>
    <div style="display: flex; flex-wrap: wrap; gap: 10px; color: #555;">
      <span>${resumeData.basicInfo.email || 'email@example.com'}</span>
      <span>|</span>
      <span>${resumeData.basicInfo.phone || 'Phone Number'}</span>
      ${resumeData.basicInfo.linkedin ? `<span>|</span><a href="${resumeData.basicInfo.linkedin}">LinkedIn</a>` : ''}
      ${resumeData.basicInfo.github ? `<span>|</span><a href="${resumeData.basicInfo.github}">GitHub</a>` : ''}
    </div>
  </div>
  <hr style="border: 1px solid black; margin: 20px 0;">

  EDUCATION:
  <div style="margin-bottom: 20px;">
    <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 15px;">EDUCATION</h2>
    ${resumeData.education.map(edu => `
      <div style="margin-bottom: 15px;">
        <div style="display: flex; justify-content: space-between;">
          <h3 style="font-weight: 600; margin-bottom: 5px;">${edu.degree || 'Degree'}</h3>
          <span>${edu.startYear || 'Start'} - ${edu.endYear || 'End'}</span>
        </div>
        <p style="font-style: italic; margin-bottom: 5px;">${edu.institution || 'Institution'}</p>
        ${edu.gpa ? `<p>GPA: ${edu.gpa}</p>` : ''}
      </div>
    `).join('') || '<p>No education provided</p>'}
  </div>
  <hr style="border: 1px solid black; margin: 20px 0;">

  EXPERIENCE:
  <div style="margin-bottom: 20px;">
    <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 15px;">EXPERIENCE</h2>
    ${resumeData.experience.map(exp => `
      <div style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between;">
          <h3 style="font-weight: 600; margin-bottom: 5px;">${exp.position || 'Position'}</h3>
          <span>${exp.startDate || 'Start'} - ${exp.endDate || 'End'}</span>
        </div>
        <p style="font-style: italic; margin-bottom: 10px;">${exp.company || 'Company'}</p>
        <ul style="padding-left: 20px;">
          ${exp.responsibilities.split('\n').map(item => 
            item.trim() ? `<li style="margin-bottom: 5px;">${item}</li>` : ''
          ).join('')}
        </ul>
      </div>
    `).join('') || '<p>No experience provided</p>'}
  </div>
  <hr style="border: 1px solid black; margin: 20px 0;">

  PROJECTS:
  <div style="margin-bottom: 20px;">
    <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 15px;">PROJECTS</h2>
    ${resumeData.projects.map(proj => `
      <div style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between;">
          <h3 style="font-weight: 600; margin-bottom: 5px;">${proj.title || 'Project'}</h3>
          ${proj.link ? `<a href="${proj.link}">View Project</a>` : ''}
        </div>
        <p style="margin-bottom: 10px;">${proj.description || 'No description'}</p>
        <p><strong>Technologies:</strong> ${proj.technologies?.join(', ') || 'Not specified'}</p>
      </div>
    `).join('') || '<p>No projects provided</p>'}
  </div>
  <hr style="border: 1px solid black; margin: 20px 0;">

  SKILLS:
  <div style="margin-bottom: 20px;">
    <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 15px;">SKILLS</h2>
    <div style="display: flex; flex-wrap: wrap; gap: 20px;">
      <div>
        <h3 style="font-weight: 600; margin-bottom: 10px;">Technical</h3>
        <ul style="padding-left: 20px;">
          ${resumeData.skills.technical.map(skill => 
            `<li style="margin-bottom: 5px;">${skill}</li>`
          ).join('') || '<li>None</li>'}
        </ul>
      </div>
      <div>
        <h3 style="font-weight: 600; margin-bottom: 10px;">Soft</h3>
        <ul style="padding-left: 20px;">
          ${resumeData.skills.soft.map(skill => 
            `<li style="margin-bottom: 5px;">${skill}</li>`
          ).join('') || '<li>None</li>'}
        </ul>
      </div>
    </div>
  </div>
  <hr style="border: 1px solid black; margin: 20px 0;">
  `;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to generate content');
    }

    const data = await response.json();
    
    const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!generatedText) {
      throw new Error('No valid content generated');
    }

    // Clean and validate the generated content
    let finalContent = generatedText
      .replace(/```html|```/g, '')
      .trim();
    
    // Verify all required sections are present
    const requiredSections = ['EXPERIENCE', 'EDUCATION', 'SKILLS', 'PROJECTS'];
    const missingSections = requiredSections.filter(
      section => !finalContent.includes(`<h2[^>]*>${section}</h2>`)
    );

    if (missingSections.length > 0) {
      console.warn('Missing sections in generated content:', missingSections);
    }

    return finalContent;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error(`Failed to generate resume: ${error.message}`);
  }
};