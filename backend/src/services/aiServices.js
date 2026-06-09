import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
});



const interviewReportSchema = z.object({
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in  the interview"),
        intention: z.string().describe("The intention behind asking the technical question, such as assessing problem-solving skills, coding ability, or understanding of specific technologies"),
        answer: z.string().describe("How to answer this question effectively,what points to cover,what approach to take, and any specific details that should be included in the answer")
    })).describe("List of technical questions that may be asked in the interview along with their intentions and guidance on how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question that can be asked in the interview"),
        intention: z.string().describe("The intention behind asking the behavioral question, such as assessing cultural fit, teamwork, or leadership skills"),
        answer: z.string().describe("How to answer this question effectively, what points to cover, what approach to take, and any specific details that should be included in the answer")
    })).describe("List of behavioral questions that may be asked in the interview along with their intentions and guidance on how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The specific skill gap identified for the candidate based on the job requirements and the candidate's profile"),
        importance: z.enum(['Low', 'Medium', 'High']).describe("The importance of addressing this skill gap for the candidate's success in the role")
    })).describe("List of identified skill gaps for the candidate along with their importance"),    
    preparationPlans: z.array(z.object({
        day: z.string().describe("The specific day in the preparation plan, such as 'Day 1', 'Day 2', etc."),
        focus: z.string().describe("The main focus or theme for that day, such as 'Data Structures and Algorithms', 'System Design', 'Behavioral Interview Preparation', etc."),
        tasks: z.array(z.string()).describe("A list of specific tasks or activities that the candidate should complete on that day to prepare effectively for the interview")
    })).describe("A structured preparation plan for the candidate, outlining daily focuses and specific tasks to complete in order to prepare effectively for the interview"),  
    matchScore: z.number().describe("A score  between 0 and 100 indicating how well the candidate matches the job requirements")
    
});
export async function generateInterviewReport({resume, selfDescription, jobDescription}) {
    const prompt = `You are an expert career coach and interviewer. Based on the following information, generate a comprehensive interview report for the candidate applying for the job.

Candidate's Resume:
${resume}

Candidate's Self Description:
${selfDescription}

Job Description:
${jobDescription}

The interview report should include:
1. A list of potential technical questions that may be asked in the interview, along with the intention behind each question and guidance on how to answer them effectively.
2. A list of potential behavioral questions that may be asked in the interview, along with the intention behind each question and guidance on how to answer them effectively.
3. An analysis of any skill gaps for the candidate based on the job requirements and the candidate's profile, along with the importance of addressing each skill gap.
4. A structured preparation plan for the candidate, outlining daily focuses and specific tasks to complete in order to prepare effectively for the interview.
5. A match score between 0 and 100 indicating how well the candidate matches the job requirements, along with a brief explanation of the score.`;
    const response = await  ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            jsonSchema: zodToJsonSchema(interviewReportSchema)
        }
    });
   
    return JSON.parse(response.text)

    
}

export default generateInterviewReport;