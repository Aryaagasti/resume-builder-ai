export const formatResumeContent = (resumeData) => {
  const { basicInfo, education, experience, projects, skills, hobbies } = resumeData;

  // Reusable divider component
  const sectionDivider = `<div style="height: 1px; background-color: #000; margin: 25px 0; opacity: 0.2;"></div>`;

  let content = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
      <header style="text-align: center; margin-bottom: 30px;">
        <h1 style="margin-bottom: 5px; color: #2c3e50; font-size: 28px;">${basicInfo.name}</h1>
        <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 15px; color: #7f8c8d;">
          <span>${basicInfo.email}</span>
          <span>•</span>
          <span>${basicInfo.phone}</span>
          ${basicInfo.linkedin ? `<span>•</span><a href="${basicInfo.linkedin}" target="_blank" style="color: #3498db; text-decoration: none;">LinkedIn</a>` : ''}
          ${basicInfo.github ? `<span>•</span><a href="${basicInfo.github}" target="_blank" style="color: #3498db; text-decoration: none;">GitHub</a>` : ''}
          ${basicInfo.portfolio ? `<span>•</span><a href="${basicInfo.portfolio}" target="_blank" style="color: #3498db; text-decoration: none;">Portfolio</a>` : ''}
        </div>
      </header>
      
      ${sectionDivider}
  `;

  if (education.length > 0) {
    content += `
      <section style="margin-bottom: 20px;">
        <h2 style="color: #2c3e50; font-size: 20px; font-weight: 600; margin-bottom: 15px; text-transform: uppercase;">EDUCATION</h2>
        <ul style="list-style-type: none; padding-left: 0;">
          ${education.map(edu => `
            <li style="margin-bottom: 15px;">
              <div style="display: flex; justify-content: space-between;">
                <div>
                  <h3 style="font-size: 17px; font-weight: 600; margin-bottom: 4px;">${edu.degree}</h3>
                  <div style="font-style: italic; color: #7f8c8d;">${edu.institution}</div>
                </div>
                <div style="color: #7f8c8d;">
                  ${edu.startYear} - ${edu.endYear}
                  ${edu.gpa ? `<div style="margin-top: 4px;"><span style="background-color: #3498db; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.85rem;">GPA: ${edu.gpa}</span></div>` : ''}
                </div>
              </div>
            </li>
          `).join('')}
        </ul>
      </section>
      
      ${sectionDivider}
    `;
  }

  if (experience.length > 0) {
    content += `
      <section style="margin-bottom: 20px;">
        <h2 style="color: #2c3e50; font-size: 20px; font-weight: 600; margin-bottom: 15px; text-transform: uppercase;">EXPERIENCE</h2>
        <ul style="list-style-type: none; padding-left: 0;">
          ${experience.map(exp => `
            <li style="margin-bottom: 20px;">
              <div style="display: flex; justify-content: space-between;">
                <div>
                  <h3 style="font-size: 17px; font-weight: 600; margin-bottom: 4px;">${exp.position}</h3>
                  <div style="font-style: italic; color: #7f8c8d;">${exp.company}</div>
                </div>
                <div style="color: #7f8c8d;">
                  ${exp.startDate} - ${exp.endDate}
                </div>
              </div>
              <ul style="padding-left: 20px; margin-top: 8px; list-style-type: square;">
                ${exp.responsibilities.split('\n').map(item => item.trim() ? `<li style="margin-bottom: 6px; color: #34495e;">${item}</li>` : '').join('')}
              </ul>
            </li>
          `).join('')}
        </ul>
      </section>
      
      ${sectionDivider}
    `;
  }

  if (projects.length > 0) {
    content += `
      <section style="margin-bottom: 20px;">
        <h2 style="color: #2c3e50; font-size: 20px; font-weight: 600; margin-bottom: 15px; text-transform: uppercase;">PROJECTS</h2>
        <ul style="list-style-type: none; padding-left: 0;">
          ${projects.map(proj => `
            <li style="margin-bottom: 20px;">
              <div style="display: flex; justify-content: space-between;">
                <h3 style="font-size: 17px; font-weight: 600; margin-bottom: 8px;">${proj.title}</h3>
                ${proj.link ? `<a href="${proj.link}" target="_blank" style="color: #3498db; text-decoration: none; font-size: 0.9rem;">View Project</a>` : ''}
              </div>
              <p style="margin-bottom: 8px; color: #34495e;">${proj.description}</p>
              <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                ${proj.technologies.map(tech => `
                  <span style="background-color: #ecf0f1; color: #2c3e50; padding: 2px 8px; border-radius: 4px; font-size: 0.85rem; border: 1px solid #bdc3c7;">
                    ${tech}
                  </span>
                `).join('')}
              </div>
            </li>
          `).join('')}
        </ul>
      </section>
      
      ${sectionDivider}
    `;
  }

  if (skills.technical.length > 0 || skills.soft.length > 0) {
    content += `
      <section style="margin-bottom: 20px;">
        <h2 style="color: #2c3e50; font-size: 20px; font-weight: 600; margin-bottom: 15px; text-transform: uppercase;">SKILLS</h2>
        <div style="display: flex; flex-wrap: wrap; gap: 30px;">
    `;

    if (skills.technical.length > 0) {
      content += `
        <div style="flex: 1; min-width: 200px;">
          <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 12px; color: #2c3e50;">Technical</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${skills.technical.map(skill => `
              <span style="background-color: #3498db; color: white; padding: 4px 10px; border-radius: 4px; font-size: 0.85rem;">
                ${skill}
              </span>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (skills.soft.length > 0) {
      content += `
        <div style="flex: 1; min-width: 200px;">
          <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 12px; color: #2c3e50;">Soft</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${skills.soft.map(skill => `
              <span style="background-color: #95a5a6; color: white; padding: 4px 10px; border-radius: 4px; font-size: 0.85rem;">
                ${skill}
              </span>
            `).join('')}
          </div>
        </div>
      `;
    }

    content += `
        </div>
      </section>
    `;
  }

  if (hobbies.length > 0) {
    content += `
      ${sectionDivider}
      <section style="margin-bottom: 20px;">
        <h2 style="color: #2c3e50; font-size: 20px; font-weight: 600; margin-bottom: 15px; text-transform: uppercase;">HOBBIES</h2>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${hobbies.map(hobby => `
            <span style="background-color: #f0f0f0; color: #2c3e50; padding: 4px 12px; border-radius: 4px; font-size: 0.85rem; border: 1px solid #ddd;">
              ${hobby}
            </span>
          `).join('')}
        </div>
      </section>
    `;
  }

  content += `</div>`;

  return content;
};