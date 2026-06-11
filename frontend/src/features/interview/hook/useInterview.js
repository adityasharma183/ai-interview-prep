import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, downloadResumePdf } from "../services/interviewApi";
import { useContext } from "react";
import { InterviewContext } from "../interviewContext";

export const useInterview = () => {
    const context = useContext(InterviewContext);
    
    if (!context) {
        throw new Error('useInterview must be used inside within InterviewProvider');
    }
    
    const { 
        loading, 
        setLoading, 
        report, 
        reports, 
        setReport, 
        setReports 
    } = context;

    // Fix: Add minimum loading time to prevent flashing
    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true);
        
        // Store start time
        const startTime = Date.now();
        const MIN_LOADING_TIME = 2000; // 2 seconds minimum loading time
        
        try {
            const response = await generateInterviewReport({ 
                resumeFile, 
                jobDescription, 
                selfDescription 
            });
            
            // Calculate elapsed time
            const elapsed = Date.now() - startTime;
            const remainingTime = MIN_LOADING_TIME - elapsed;
            
            // If response came too fast, wait for minimum loading time
            if (remainingTime > 0) {
                await new Promise(resolve => setTimeout(resolve, remainingTime));
            }
            
            // Handle different response structures
            const reportData = response.interviewReport || response.data || response;
            setReport(reportData);
            
            // Update reports list if needed
            if (setReports) {
                setReports(prev => [reportData, ...(prev || [])]);
            }
            
            return reportData;
        } catch (error) {
            console.error('Generate report error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getReportById = async (interviewId) => {
        setLoading(true);
        
        try {
            const response = await getInterviewReportById(interviewId);
            const reportData = response.interviewReport || response.data || response;
            setReport(reportData);
            return reportData;
        } catch (error) {
            console.error('Get report by id error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getAllReports = async () => {
        setLoading(true);
        
        try {
            const response = await getAllInterviewReports();
            const reportsData = response.interviewReports || response.data || response;
            setReports(reportsData || []);
            return reportsData;
        } catch (error) {
            console.error('Get all reports error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getResumePdf = async (interviewId) => {
        try {
            const blob = await downloadResumePdf(interviewId);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `resume_${interviewId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download resume error:', error);
            throw error;
        }
    };

    return {
        loading,
        report,
        reports,
        getAllReports,
        getReportById,
        generateReport,
        getResumePdf
    };
};