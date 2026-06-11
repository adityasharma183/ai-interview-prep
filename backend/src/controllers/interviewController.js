// import { createRequire } from 'module';
// import InterviewReportModel from '../models/interviewReportModel.js';
// import generateInterviewReport from '../services/aiServices.js';

// const require = createRequire(import.meta.url);
// const pdfModule = require('pdf-parse');

// async function generateInterViewReportController(req, res) {
//     try {
//         const resumeFile = req.file;
//         if (!resumeFile) {
//             return res.status(400).json({ success: false, message: "Resume file is required" });
//         }

//         // Parse PDF
//         const PDFParserClass = pdfModule.PDFParse || pdfModule;
//         const parserInstance = new PDFParserClass(Uint8Array.from(req.file.buffer));
//         const resumeContent = await parserInstance.getText();
//         const resumeText = resumeContent.text || resumeContent;

//         const { selfDescription, jobDescription } = req.body;

//         // Get AI response
//         const aiResponse = await generateInterviewReport({
//             resume: resumeText,
//             selfDescription,
//             jobDescription,
//         });

//         // Extract report data
//         const report = aiResponse?.interview_report 
//             || aiResponse?.interviewReport 
//             || aiResponse?.data 
//             || aiResponse;

//         console.log("AI Response received:", JSON.stringify(report, null, 2));

//         // Transform technical questions - map suggestedAnswer to answer
//         const technicalQuestions = (report.technicalQuestions || report.technicalInterview || []).map(q => ({
//             question: q.question,
//             intention: q.intention,
//             answer: q.answer || q.suggestedAnswer || q.sampleAnswer || "No answer provided"
//         }));

//         // Transform behavioral questions - map suggestedAnswer to answer
//         const behavioralQuestions = (report.behavioralQuestions || report.behavioralInterview || []).map(q => ({
//             question: q.question,
//             intention: q.intention,
//             answer: q.answer || q.suggestedAnswer || q.sampleAnswer || "No answer provided"
//         }));

//         // Transform skill gaps
//         const skillGaps = (report.skillGaps || []).map(gap => ({
//             skill: gap.skill,
//             importance: (() => {
//                 const imp = (gap.importance || '').toString();
//                 if (imp.toLowerCase().includes('high')) return 'High';
//                 if (imp.toLowerCase().includes('medium')) return 'Medium';
//                 if (imp.toLowerCase().includes('low')) return 'Low';
//                 return 'Medium';
//             })()
//         }));

//         // Transform preparation plans
//         const preparationPlans = (report.preparationPlan || report.preparationPlans || []).map(plan => ({
//             day: plan.day || plan.days || `Week ${plan.week || 1}`,
//             focus: plan.focus || plan.focusArea || "General Preparation",
//             tasks: plan.tasks || []
//         }));

//         // Get title
//         const title = report.title || report.jobTitle || (() => {
//             const firstLine = jobDescription.split('\n')[0];
//             return firstLine.substring(0, 100) || 'Interview Report';
//         })();

//         // Get match score
//         const matchScore = (() => {
//             const score = report.matchScore;
//             if (typeof score === 'number') return score;
//             if (typeof score === 'object' && score !== null) {
//                 return score.score || score.value || 0;
//             }
//             return Number(score) || 0;
//         })();

//         // Validate data before saving
//         const validatedData = {
//             user: req.user?.id,
//             resume: resumeText,
//             selfDescription,
//             jobDescription,
//             title: title,
//             technicalQuestions: technicalQuestions,
//             behavioralQuestions: behavioralQuestions,
//             skillGaps: skillGaps,
//             preparationPlans: preparationPlans,
//             matchScore: matchScore
//         };

//         // Log the transformed data for debugging
//         console.log("Transformed data:", JSON.stringify({
//             title: validatedData.title,
//             technicalQuestionsCount: validatedData.technicalQuestions.length,
//             behavioralQuestionsCount: validatedData.behavioralQuestions.length,
//             skillGapsCount: validatedData.skillGaps.length,
//             preparationPlansCount: validatedData.preparationPlans.length,
//             matchScore: validatedData.matchScore,
//             sampleAnswer: validatedData.technicalQuestions[0]?.answer
//         }, null, 2));

//         // Create the report
//         const interViewReport = await InterviewReportModel.create(validatedData);

//         return res.status(201).json({
//             message: 'Interview report generated successfully!!',
//             success: true,
//             data: interViewReport
//         });

//     } catch (error) {
//         console.error("Error in generateInterViewReportController:", error);
        
//         // Check if it's a validation error
//         if (error.name === 'ValidationError') {
//             const errors = Object.values(error.errors).map(err => err.message);
//             return res.status(400).json({ 
//                 success: false, 
//                 message: "Validation failed", 
//                 errors 
//             });
//         }
        
//         return res.status(500).json({ success: false, message: error.message });
//     }
// }

// /**
//  * @route GET /api/interview/report/:InterviewId
//  * @description Get interview report by ID
//  * @access private
//  */
// async function getInterviewReportByIdController(req, res) {
//     try {
//         const { InterviewId } = req.params;
//         const interviewReport = await InterviewReportModel.findOne({ 
//             _id: InterviewId, 
//             user: req.user.id 
//         });
        
//         if (!interviewReport) {
//             return res.status(404).json({ 
//                 success: false, 
//                 message: "Interview report not found" 
//             });
//         }
        
//         return res.status(200).json({
//             success: true,
//             interviewReport
//         });
//     } catch (error) {
//         console.error("Error in getInterviewReportByIdController:", error);
//         return res.status(500).json({ success: false, message: error.message });
//     }
// }

// /**
//  * @description controller to get all interview reports of logged in user
//  */
// async function getAllInterviewReportsController(req, res) {
//     try {
//         const interviewReports = await InterviewReportModel.find({ user: req.user.id })
//             .sort({ createdAt: -1 })
//             .select('-resume -selfDescription -jobDescription -__v');
        
//         return res.status(200).json({
//             message: 'Interview Reports fetched successfully !!',
//             success: true,
//             interviewReports
//         });
//     } catch (error) {
//         console.error("Error in getAllInterviewReportsController:", error);
//         return res.status(500).json({ success: false, message: error.message });
//     }
// }

// export { 
//     generateInterViewReportController, 
//     getInterviewReportByIdController, 
//     getAllInterviewReportsController 
// };


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

        // Transform technical questions - handle multiple answer field names
        const technicalQuestions = (report.technicalQuestions || report.technicalInterview || []).map(q => ({
            question: q.question,
            intention: q.intention,
            answer: q.answer || q.suggestedAnswer || q.sampleAnswer || q.expectedAnswer || "No answer provided"
        }));

        // Transform behavioral questions - handle multiple answer field names
        const behavioralQuestions = (report.behavioralQuestions || report.behavioralInterview || []).map(q => ({
            question: q.question,
            intention: q.intention,
            answer: q.answer || q.suggestedAnswer || q.sampleAnswer || q.expectedAnswer || "No answer provided"
        }));

        // Transform skill gaps
        const skillGaps = (report.skillGaps || []).map(gap => ({
            skill: gap.skill,
            importance: (() => {
                const imp = (gap.importance || '').toString();
                if (imp.toLowerCase().includes('high')) return 'High';
                if (imp.toLowerCase().includes('medium')) return 'Medium';
                if (imp.toLowerCase().includes('low')) return 'Low';
                return 'Medium';
            })()
        }));

        // Transform preparation plans - handle both preparationPlan and preparationPlans
        const preparationPlans = (report.preparationPlan || report.preparationPlans || []).map((plan, index) => ({
            day: plan.day?.toString() || plan.days || `Day ${index + 1}`,
            focus: plan.focus || plan.focusArea || "General Preparation",
            tasks: plan.tasks || []
        }));

        // Get title - handle multiple field names
        const title = report.title || report.jobTitle || report.jobRole || (() => {
            const firstLine = jobDescription.split('\n')[0];
            return firstLine.substring(0, 100) || 'Interview Report';
        })();

        // Get match score
        const matchScore = (() => {
            const score = report.matchScore;
            if (typeof score === 'number') return score;
            if (typeof score === 'object' && score !== null) {
                return score.score || score.value || 0;
            }
            return Number(score) || 0;
        })();

        // Validate data before saving
        const validatedData = {
            user: req.user?.id,
            resume: resumeText,
            selfDescription,
            jobDescription,
            title: title,
            technicalQuestions: technicalQuestions,
            behavioralQuestions: behavioralQuestions,
            skillGaps: skillGaps,
            preparationPlans: preparationPlans,
            matchScore: matchScore
        };

        // Log the transformed data for debugging
        console.log("Transformed data:", JSON.stringify({
            title: validatedData.title,
            technicalQuestionsCount: validatedData.technicalQuestions.length,
            behavioralQuestionsCount: validatedData.behavioralQuestions.length,
            skillGapsCount: validatedData.skillGaps.length,
            preparationPlansCount: validatedData.preparationPlans.length,
            matchScore: validatedData.matchScore,
            sampleAnswer: validatedData.technicalQuestions[0]?.answer
        }, null, 2));

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
 * @description Get interview report by ID
 * @access private
 */
async function getInterviewReportByIdController(req, res) {
    try {
        const { InterviewId } = req.params;
        const interviewReport = await InterviewReportModel.findOne({ 
            _id: InterviewId, 
            user: req.user.id 
        });
        
        if (!interviewReport) {
            return res.status(404).json({ 
                success: false, 
                message: "Interview report not found" 
            });
        }
        
        return res.status(200).json({
            success: true,
            interviewReport
        });
    } catch (error) {
        console.error("Error in getInterviewReportByIdController:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

/**
 * @description controller to get all interview reports of logged in user
 */
async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await InterviewReportModel.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select('-resume -selfDescription -jobDescription -__v');
        
        return res.status(200).json({
            message: 'Interview Reports fetched successfully !!',
            success: true,
            interviewReports
        });
    } catch (error) {
        console.error("Error in getAllInterviewReportsController:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export { 
    generateInterViewReportController, 
    getInterviewReportByIdController, 
    getAllInterviewReportsController 
};