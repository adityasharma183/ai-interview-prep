import { createRequire } from 'module';
import InterviewReportModel from '../models/interviewReportModel.js';
import generateInterviewReport from '../services/aiServices.js';

// Create a require instance to handle legacy dependencies safely
const require = createRequire(import.meta.url);
const pdfModule = require('pdf-parse');

async function generateInterViewReportController(req, res) {
    try {
        const resumeFile = req.file;
        if (!resumeFile) {
            return res.status(400).json({ success: false, message: "Resume file is required" });
        }

        // 1. Parse the PDF buffer via version 2.4.5 class constructor structure
        const PDFParserClass = pdfModule.PDFParse || pdfModule;
        const parserInstance = new PDFParserClass(Uint8Array.from(req.file.buffer));
        const resumeContent = await parserInstance.getText();
        const resumeText = resumeContent.text || resumeContent;

        const { selfDescription, jobDescription } = req.body;
        
        // 2. Request the structured report from your Gemini AI service
        const aiResponse = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription,
        });

        // 3. RUNTIME KEY DECONSTRUCTION
        // If the AI service nests the schema under a top-level key, grab the contents.
        const report = aiResponse?.interview_report 
            || aiResponse?.interviewReport 
            || aiResponse?.data 
            || aiResponse;

        // CRITICAL DEBUG: Print the resolved keys to your terminal so you can see what is happening
        console.log("--- RESOLVED AI REPORT KEYS ---", Object.keys(report));
        console.log("MATCH SCORE VALUE FOUND:", report.matchScore);

        // 4. Save to MongoDB with fallback checking to catch both camelCase and snake_case
        const interViewReport = await InterviewReportModel.create({
            user: req.user?.id, 
            resume: resumeText, 
            selfDescription,
            jobDescription,
            
            // Checks for direct camelCase, then falls back to snake_case variants if needed
            technicalQuestions: report.technicalQuestions || report.technical_questions || [],
            behavioralQuestions: report.behavioralQuestions || report.behavioral_questions || [],
            skillGaps: report.skillGaps || report.skill_gap_analysis || [],
            preparationPlans: report.preparationPlans || report.preparation_plan || [],
            
            matchScore: typeof report.matchScore === 'object' 
                ? (report.matchScore?.score || 0) 
                : (report.matchScore || report.match_score || 0)
        });

        return res.status(201).json({ 
            message: 'Interview report generated successfully!!',
            success: true, 
            data: interViewReport 
        });

    } catch (error) {
        console.error("Error in generateInterViewReportController:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export {
    generateInterViewReportController
};