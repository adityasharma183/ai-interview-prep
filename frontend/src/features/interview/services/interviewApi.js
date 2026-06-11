import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
});

export const generateInterviewReport = async ({ jobDescription, resumeFile, selfDescription }) => {
    const formData = new FormData();
    formData.append('jobDescription', jobDescription);
    formData.append('selfDescription', selfDescription);
    
    // Fix: Use resumeFile instead of resume
    if (resumeFile) {
        formData.append('resume', resumeFile);
    }

    const response = await api.post('/api/interview/', formData, {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    });

    return response.data;
};

export const getInterviewReportById = async (interviewId) => {
    // Fix: Use backticks instead of single quotes for template literal
    const response = await api.get(`/api/interview/report/${interviewId}`);
    return response.data;
};

export const getAllInterviewReports = async () => {
    // Fix: Add leading slash
    const response = await api.get('/api/interview/');
    return response.data;
};

// Add this function for downloading resume
export const downloadResumePdf = async (interviewId) => {
    const response = await api.get(`/api/interview/${interviewId}/resume`, {
        responseType: 'blob'
    });
    return response.data;
};