// import { GoogleGenAI } from "@google/genai";
// import { z } from "zod";
// import { zodToJsonSchema } from "zod-to-json-schema";

// const ai = new GoogleGenAI({
//     apiKey: process.env.GOOGLE_API_KEY,
// });



// const interviewReportSchema = z.object({
//     technicalQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in  the interview"),
//         intention: z.string().describe("The intention behind asking the technical question, such as assessing problem-solving skills, coding ability, or understanding of specific technologies"),
//         answer: z.string().describe("How to answer this question effectively,what points to cover,what approach to take, and any specific details that should be included in the answer")
//     })).describe("List of technical questions that may be asked in the interview along with their intentions and guidance on how to answer them"),
//     behavioralQuestions: z.array(z.object({
//         question: z.string().describe("The behavioral question that can be asked in the interview"),
//         intention: z.string().describe("The intention behind asking the behavioral question, such as assessing cultural fit, teamwork, or leadership skills"),
//         answer: z.string().describe("How to answer this question effectively, what points to cover, what approach to take, and any specific details that should be included in the answer")
//     })).describe("List of behavioral questions that may be asked in the interview along with their intentions and guidance on how to answer them"),
//     skillGaps: z.array(z.object({
//         skill: z.string().describe("The specific skill gap identified for the candidate based on the job requirements and the candidate's profile"),
//         importance: z.enum(['Low', 'Medium', 'High']).describe("The importance of addressing this skill gap for the candidate's success in the role")
//     })).describe("List of identified skill gaps for the candidate along with their importance"),    
//     preparationPlans: z.array(z.object({
//         day: z.string().describe("The specific day in the preparation plan, such as 'Day 1', 'Day 2', etc."),
//         focus: z.string().describe("The main focus or theme for that day, such as 'Data Structures and Algorithms', 'System Design', 'Behavioral Interview Preparation', etc."),
//         tasks: z.array(z.string()).describe("A list of specific tasks or activities that the candidate should complete on that day to prepare effectively for the interview")
//     })).describe("A structured preparation plan for the candidate, outlining daily focuses and specific tasks to complete in order to prepare effectively for the interview"),  
//     matchScore: z.number().describe("A score  between 0 and 100 indicating how well the candidate matches the job requirements")
    
// });
// export async function generateInterviewReport({resume, selfDescription, jobDescription}) {
//     const prompt = `You are an expert career coach and interviewer. Based on the following information, generate a comprehensive interview report for the candidate applying for the job.

// Candidate's Resume:
// ${resume}

// Candidate's Self Description:
// ${selfDescription}

// Job Description:
// ${jobDescription}

// The interview report should include:
// 1. A list of potential technical questions that may be asked in the interview, along with the intention behind each question and guidance on how to answer them effectively.
// 2. A list of potential behavioral questions that may be asked in the interview, along with the intention behind each question and guidance on how to answer them effectively.
// 3. An analysis of any skill gaps for the candidate based on the job requirements and the candidate's profile, along with the importance of addressing each skill gap.
// 4. A structured preparation plan for the candidate, outlining daily focuses and specific tasks to complete in order to prepare effectively for the interview.
// 5. A match score between 0 and 100 indicating how well the candidate matches the job requirements, along with a brief explanation of the score.`;
//     const response = await  ai.models.generateContent({
//         model: "gemini-3-flash-preview",
//         contents: prompt,
//         config: {
//             responseMimeType: "application/json",
//             jsonSchema: zodToJsonSchema(interviewReportSchema)
//         }
//     });
   
//     return JSON.parse(response.text)

    
// }

// export default generateInterviewReport;


import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
});

const interviewReportSchema = z.object({
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention behind asking the technical question"),
        answer: z.string().describe("How to answer this question effectively")
    })),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question that can be asked in the interview"),
        intention: z.string().describe("The intention behind asking the behavioral question"),
        answer: z.string().describe("How to answer this question effectively")
    })),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The specific skill gap identified for the candidate"),
        // Fix: Ensure importance is strictly one of these exact strings
        importance: z.enum(['Low', 'Medium', 'High']).describe("Importance level: Low, Medium, or High only")
    })),
    preparationPlans: z.array(z.object({
        day: z.string().describe("The specific day in the preparation plan"),
        focus: z.string().describe("The main focus or theme for that day"),
        tasks: z.array(z.string()).describe("List of specific tasks for that day")
    })),
    // Fix: matchScore should be just a number, not an object
    matchScore: z.number().min(0).max(100).describe("A score between 0 and 100 indicating how well the candidate matches the job requirements"),
    title:z.string().describe('The title the job for which the interview is generated')
});

export async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `You are an expert career coach and interviewer. Based on the following information, generate a comprehensive interview report for the candidate applying for the job.

CRITICAL INSTRUCTIONS:
1. For matchScore: Return ONLY a number between 0-100. Do NOT wrap it in an object. Example: 85
2. For skillGaps.importance: Use ONLY the exact strings: "Low", "Medium", or "High". Do NOT add explanations.
3. All other fields should follow the schema exactly.

Candidate's Resume:
${resume}

Candidate's Self Description:
${selfDescription}

Job Description:
${jobDescription}

The interview report should include:
1. Technical questions with intentions and answers
2. Behavioral questions with intentions and answers  
3. Skill gaps with skill name and importance (ONLY "Low"/"Medium"/"High")
4. Preparation plan with days, focus areas, and tasks
5. A simple numeric match score (0-100)`;

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            jsonSchema: zodToJsonSchema(interviewReportSchema)
        }
    });

    return JSON.parse(response.text);
}

export default generateInterviewReport;


// model: "gemini-3-flash-preview",