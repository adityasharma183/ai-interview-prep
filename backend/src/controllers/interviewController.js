

import { createRequire } from 'module';
import InterviewReportModel from '../models/interviewReportModel.js';
import generateInterviewReport from '../services/aiServices.js';

const require = createRequire(import.meta.url);
const pdfModule = require('pdf-parse');

async function generateInterViewReportController(req, res) {
    try {
        const resumeFile = req.file;
        if (!resumeFile) {
            return res.status(400).json({ success: false, message: "Resume file is required" });
        }

        // Parse PDF
        const PDFParserClass = pdfModule.PDFParse || pdfModule;
        const parserInstance = new PDFParserClass(Uint8Array.from(req.file.buffer));
        const resumeContent = await parserInstance.getText();
        const resumeText = resumeContent.text || resumeContent;

        const { selfDescription, jobDescription } = req.body;

        // Get AI response
        const aiResponse = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription,
        });

        // Extract report data
        const report = aiResponse?.interview_report 
            || aiResponse?.interviewReport 
            || aiResponse?.data 
            || aiResponse;

        console.log("AI Response received:", JSON.stringify(report, null, 2));

        // Validate and transform data before saving
        const validatedData = {
            user: req.user?.id,
            resume: resumeText,
            selfDescription,
            jobDescription,
            
            // Ensure arrays exist
            technicalQuestions: Array.isArray(report.technicalQuestions) ? report.technicalQuestions : [],
            behavioralQuestions: Array.isArray(report.behavioralQuestions) ? report.behavioralQuestions : [],
            skillGaps: Array.isArray(report.skillGaps) ? report.skillGaps : [],
            preparationPlans: Array.isArray(report.preparationPlans) ? report.preparationPlans : [],
            
            // Fix matchScore: extract number if it's an object
            matchScore: (() => {
                const score = report.matchScore;
                if (typeof score === 'number') return score;
                if (typeof score === 'object' && score !== null) {
                    return score.score || score.value || 0;
                }
                return Number(score) || 0;
            })()
        };

        // Additional validation for skillGaps importance field
        if (validatedData.skillGaps.length > 0) {
            validatedData.skillGaps = validatedData.skillGaps.map(gap => ({
                skill: gap.skill,
                // Extract only the importance keyword, remove any extra text
                importance: (() => {
                    const imp = (gap.importance || '').toString();
                    if (imp.toLowerCase().includes('high')) return 'High';
                    if (imp.toLowerCase().includes('medium')) return 'Medium';
                    if (imp.toLowerCase().includes('low')) return 'Low';
                    return 'Medium'; // default
                })()
            }));
        }

        // Create the report
        const interViewReport = await InterviewReportModel.create(validatedData);

        return res.status(201).json({
            message: 'Interview report generated successfully!!',
            success: true,
            data: interViewReport
        });

    } catch (error) {
        console.error("Error in generateInterViewReportController:", error);
        
        // Check if it's a validation error
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ 
                success: false, 
                message: "Validation failed", 
                errors 
            });
        }
        
        return res.status(500).json({ success: false, message: error.message });
    }
}

/**
 * @route GET /api/interview/report/:InterviewId
 * @description generate new interview report  on the basis of user self description,resume pdf & job description
 * @access private
 */
async function getInterviewReportByIdController(req,res) {

    const {InterviewId}=req.params
    const interviewReport=await InterviewReportModel.findOne({_id:InterviewId,user:req.user.id})

    
}

/**
 
 * @description controller to get all interview reports of logged in user
 
 */
async function getAllInterviewReportsController(req,res) {
    const interviewReports=await InterviewReportModel.find({user:req.user.id}).sort({createdAt:-1}).select('-resume -selfDescription -jobDescription -_v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan')
    res.status(200).json({
        message:'Interview Reports fetched successfully !!',
        interviewReports
    })
}


export { generateInterViewReportController,getInterviewReportByIdController,getAllInterviewReportsController };