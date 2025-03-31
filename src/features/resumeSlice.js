// features/resumeSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { calculateATSScore, generateAnalysis } from '../utils/atsScorer';

const initialState = {
  basicInfo: {
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    portfolio: ''
  },
  education: [],
  experience: [],
  projects: [],
  skills: {
    technical: [],
    soft: []
  },
  hobbies: [],
  isLoading: false,
  atsScore: 0,
  analysis: {
    summary: '',
    details: '',
    score: 0
  },
  generatedContent: '',
  error: null
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    updateBasicInfo: (state, action) => {
      state.basicInfo = { ...state.basicInfo, ...action.payload };
    },
    updateEducation: (state, action) => {
      state.education = action.payload;
    },
    updateExperience: (state, action) => {
      state.experience = action.payload;
    },
    updateProjects: (state, action) => {
      state.projects = action.payload;
    },
    updateSkills: (state, action) => {
      state.skills = { ...state.skills, ...action.payload };
    },
    generateResumeStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    generateResumeSuccess: (state, action) => {
      state.isLoading = false;
      state.generatedContent = action.payload.content || '';
      
      try {
        const scoreResult = calculateATSScore(action.payload.content);
        const analysisResult = generateAnalysis(scoreResult);
        
        state.atsScore = analysisResult.score;
        state.analysis = {
          summary: analysisResult.summary,
          details: analysisResult.details
        };
      } catch (error) {
        state.error = 'Failed to analyze resume content';
        state.atsScore = 0;
        state.analysis = {
          summary: 'Analysis failed',
          details: 'Could not analyze the generated resume'
        };
      }
    },
    generateResumeFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Resume generation failed';
    },
    resetResume: (state) => {
      return initialState;
    }
  },
});

export const { 
  updateBasicInfo,
  updateEducation,
  updateExperience,
  updateProjects,
  updateSkills,
  generateResumeStart,
  generateResumeSuccess,
  generateResumeFailure,
  resetResume
} = resumeSlice.actions;

export default resumeSlice.reducer;