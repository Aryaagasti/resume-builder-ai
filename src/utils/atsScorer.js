// utils/atsScorer.js
export const calculateATSScore = (resumeContent) => {
  if (!resumeContent) {
    return {
      score: 0,
      analysis: ['❌ No resume content provided']
    };
  }

  let score = 0;
  const analysis = [];
  const contentLower = resumeContent.toLowerCase();

  // Section Checks (30 points max)
  const sections = {
    'experience': { points: 15, found: false },
    'education': { points: 10, found: false },
    'skills': { points: 10, found: false },
    'projects': { points: 10, found: false }
  };

  // Check for section headings
  Object.keys(sections).forEach(section => {
    const regex = new RegExp(`<h[1-6][^>]*>\\s*${section}`, 'i');
    if (regex.test(resumeContent)) {
      score += sections[section].points;
      sections[section].found = true;
      analysis.push(`✅ Found ${section} section (+${sections[section].points} points)`);
    } else {
      analysis.push(`❌ Missing ${section} section (0 points)`);
    }
  });

  // Keyword Analysis (30 points max)
  const keywordCategories = {
    'Technical Terms': [
      'JavaScript', 'React', 'Python', 'Java', 'C++', 'SQL',
      'HTML', 'CSS', 'TypeScript', 'Node.js', 'Express'
    ],
    'Concepts': [
      'algorithms', 'data structures', 'debugging', 'testing',
      'APIs', 'microservices', 'cloud', 'AWS', 'Azure', 'Docker',
      'Git', 'CI/CD', 'agile', 'scrum'
    ]
  };

  let keywordPoints = 0;
  Object.entries(keywordCategories).forEach(([category, keywords]) => {
    const foundKeywords = keywords.filter(kw => 
      contentLower.includes(kw.toLowerCase())
    );
    
    if (foundKeywords.length > 0) {
      const categoryPoints = Math.min(foundKeywords.length * 2, 15);
      keywordPoints += categoryPoints;
      analysis.push(
        `✅ Found ${foundKeywords.length}/${keywords.length} ${category} keywords (+${categoryPoints} points)`
      );
    } else {
      analysis.push(`❌ Missing ${category} keywords (0 points)`);
    }
  });

  score += Math.min(keywordPoints, 30);

  // Metrics and Achievements (10 points)
  const hasMetrics = /(\d+%|\$?\d+\+?|\d+\.\d+)/.test(resumeContent);
  if (hasMetrics) {
    score += 10;
    analysis.push('✅ Found measurable achievements (+10 points)');
  } else {
    analysis.push('❌ Missing measurable achievements (0 points)');
  }

  // Action Verbs (10 points)
  const actionVerbs = [
    'developed', 'implemented', 'designed', 'optimized',
    'led', 'managed', 'created', 'built', 'improved',
    'increased', 'reduced', 'delivered', 'achieved'
  ];
  
  const foundVerbs = actionVerbs.filter(verb => 
    contentLower.includes(verb)
  ).length;
  
  const verbPoints = Math.min(foundVerbs, 10);
  score += verbPoints;
  analysis.push(`✅ Found ${foundVerbs}/${actionVerbs.length} action verbs (+${verbPoints} points)`);

  // Formatting (10 points)
  const hasBulletPoints = /<ul>|<li>|\u2022/.test(resumeContent);
  const hasHeadings = /<h[1-6]>/.test(resumeContent);
  const hasDividers = /<hr[^>]*style="[^"]*border[^"]*"/.test(resumeContent);
  
  if (hasBulletPoints && hasHeadings && hasDividers) {
    score += 10;
    analysis.push('✅ Excellent formatting with headings, bullet points and dividers (+10 points)');
  } else if (hasBulletPoints && hasHeadings) {
    score += 7;
    analysis.push('⚠️ Good formatting but missing dividers (+7 points)');
  } else if (hasBulletPoints || hasHeadings) {
    score += 5;
    analysis.push('⚠️ Partial formatting (only headings or bullet points) (+5 points)');
  } else {
    analysis.push('❌ Poor formatting (0 points)');
  }

  // Ensure score is between 0-100
  score = Math.max(0, Math.min(score, 100));

  return {
    score,
    analysis
  };
};

export const generateAnalysis = (scoreResult) => {
  if (!scoreResult) {
    return {
      score: 0,
      summary: '❌ No analysis available',
      details: 'No resume content was provided for analysis'
    };
  }

  const { score = 0, analysis = [] } = scoreResult;
  
  let summary = '';
  if (score >= 85) {
    summary = '🌟 Excellent ATS compatibility! Your resume should perform very well.';
  } else if (score >= 75) {
    summary = '👍 Good ATS compatibility. Your resume meets most requirements.';
  } else if (score >= 50) {
    summary = '⚠️ Fair ATS compatibility. Some improvements needed.';
  } else {
    summary = '❌ Poor ATS compatibility. Significant improvements needed.';
  }

  return {
    summary,
    details: analysis.join('\n\n'),
    score
  };
};