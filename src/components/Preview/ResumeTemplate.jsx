import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const ResumeTemplate = ({ resumeData }) => {
  const { basicInfo, education, experience, projects, skills, hobbies } = resumeData;

  // Enhanced Section Divider with colored bar
  const SectionDivider = ({ color = '#3498db' }) => (
    <div className="my-4 position-relative">
      <hr style={{
        border: 'none',
        height: '4px',
        backgroundColor: color,
        margin: '20px 0',
        borderRadius: '2px'
      }} />
    </div>
  );

  // Header with accent bar
  const SectionHeader = ({ title }) => (
    <div style={{
      position: 'relative',
      paddingBottom: '10px',
      marginBottom: '20px'
    }}>
      <h2 style={{
        color: '#2c3e50',
        fontWeight: '600',
        fontSize: '1.4rem',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        margin: 0
      }}>
        {title}
      </h2>
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '50px',
        height: '3px',
        backgroundColor: '#3498db'
      }}></div>
    </div>
  );

  return (
    <Card className="p-4 shadow-sm" style={{ 
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      maxWidth: '800px',
      margin: '0 auto',
      border: 'none'
    }}>
      {/* Header Section */}
      <div className="text-center mb-4" style={{ paddingBottom: '20px', borderBottom: '2px solid #3498db' }}>
        <h1 style={{ 
          color: '#2c3e50', 
          fontWeight: '700',
          letterSpacing: '1px',
          marginBottom: '0.5rem',
          fontSize: '2.2rem'
        }}>
          {basicInfo.name}
        </h1>
        <div className="d-flex justify-content-center flex-wrap gap-2">
          <span className="text-muted">{basicInfo.email}</span>
          <span className="text-muted">•</span>
          <span className="text-muted">{basicInfo.phone}</span>
          {basicInfo.linkedin && (
            <>
              <span className="text-muted">•</span>
              <a href={basicInfo.linkedin} target="_blank" rel="noopener noreferrer" 
                 style={{ color: '#3498db', textDecoration: 'none' }}>
                LinkedIn
              </a>
            </>
          )}
          {basicInfo.github && (
            <>
              <span className="text-muted">•</span>
              <a href={basicInfo.github} target="_blank" rel="noopener noreferrer" 
                 style={{ color: '#3498db', textDecoration: 'none' }}>
                GitHub
              </a>
            </>
          )}
        </div>
      </div>

      {/* Education Section */}
      {education.length > 0 && (
        <section className="mb-4">
          <SectionHeader title="Education" />
          <ListGroup variant="flush">
            {education.map((edu, index) => (
              <ListGroup.Item key={index} style={{ border: 'none', padding: '8px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ 
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      marginBottom: '4px',
                      color: '#2c3e50'
                    }}>
                      {edu.degree}
                    </h3>
                    <div style={{ 
                      fontStyle: 'italic',
                      color: '#7f8c8d',
                      marginBottom: '4px'
                    }}>
                      {edu.institution}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ color: '#7f8c8d' }}>
                      {edu.startYear} - {edu.endYear}
                    </span>
                    {edu.gpa && (
                      <div style={{ marginTop: '4px' }}>
                        <span style={{
                          backgroundColor: '#3498db',
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '0.8rem'
                        }}>
                          GPA: {edu.gpa}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <SectionDivider color="#e74c3c" />
        </section>
      )}

      {/* Experience Section */}
      {experience.length > 0 && (
        <section className="mb-4">
          <SectionHeader title="Experience" />
          <ListGroup variant="flush">
            {experience.map((exp, index) => (
              <ListGroup.Item key={index} style={{ border: 'none', padding: '12px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ 
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      marginBottom: '4px',
                      color: '#2c3e50'
                    }}>
                      {exp.position}
                    </h3>
                    <div style={{ 
                      fontStyle: 'italic',
                      color: '#7f8c8d',
                      marginBottom: '8px'
                    }}>
                      {exp.company}
                    </div>
                  </div>
                  <span style={{ color: '#7f8c8d' }}>
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <div style={{ whiteSpace: 'pre-wrap' }}>
                  <ul style={{ 
                    listStyleType: 'disc',
                    paddingLeft: '20px',
                    marginBottom: '0'
                  }}>
                    {exp.responsibilities.split('\n').map((item, i) => (
                      item.trim() && <li key={i} style={{ 
                        marginBottom: '4px',
                        color: '#34495e'
                      }}>{item}</li>
                    ))}
                  </ul>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <SectionDivider color="#2ecc71" />
        </section>
      )}

      {/* Skills Section */}
      {(skills.technical.length > 0 || skills.soft.length > 0) && (
        <section className="mb-4">
          <SectionHeader title="Skills" />
          <div style={{ display: 'flex', gap: '20px' }}>
            {skills.technical.length > 0 && (
              <div style={{ flex: 1 }}>
                <h4 style={{ 
                  fontSize: '1rem',
                  color: '#2c3e50',
                  marginBottom: '12px'
                }}>
                  Technical Skills
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {skills.technical.map((skill, index) => (
                    <span 
                      key={index} 
                      style={{
                        backgroundColor: '#3498db',
                        color: 'white',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '0.85rem'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {skills.soft.length > 0 && (
              <div style={{ flex: 1 }}>
                <h4 style={{ 
                  fontSize: '1rem',
                  color: '#2c3e50',
                  marginBottom: '12px'
                }}>
                  Soft Skills
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {skills.soft.map((skill, index) => (
                    <span 
                      key={index} 
                      style={{
                        backgroundColor: '#95a5a6',
                        color: 'white',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '0.85rem'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <SectionDivider color="#f39c12" />
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="mb-4">
          <SectionHeader title="Projects" />
          <ListGroup variant="flush">
            {projects.map((proj, index) => (
              <ListGroup.Item key={index} style={{ border: 'none', padding: '12px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h3 style={{ 
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#2c3e50'
                  }}>
                    {proj.title}
                  </h3>
                  {proj.link && (
                    <a 
                      href={proj.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{
                        color: '#3498db',
                        textDecoration: 'none',
                        fontSize: '0.9rem'
                      }}
                    >
                      View Project
                    </a>
                  )}
                </div>
                <p style={{ 
                  color: '#34495e',
                  marginBottom: '8px'
                }}>
                  {proj.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {proj.technologies.map((tech, i) => (
                    <span 
                      key={i} 
                      style={{
                        backgroundColor: '#ecf0f1',
                        color: '#2c3e50',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        border: '1px solid #bdc3c7'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <SectionDivider color="#9b59b6" />
        </section>
      )}
    </Card>
  );
};

export default ResumeTemplate;