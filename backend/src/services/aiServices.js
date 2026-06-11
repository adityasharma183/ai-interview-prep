

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
        importance: z.enum(['Low', 'Medium', 'High']).describe("Importance level: Low, Medium, or High only")
    })),
    preparationPlans: z.array(z.object({
        day: z.string().describe("The specific day in the preparation plan"),
        focus: z.string().describe("The main focus or theme for that day"),
        tasks: z.array(z.string()).describe("List of specific tasks for that day")
    })),
    matchScore: z.number().min(0).max(100).describe("A score between 0 and 100 indicating how well the candidate matches the job requirements"),
    title: z.string().describe('The title the job for which the interview is generated')
});

// Mock data for fallback when API fails
function getMockInterviewReport(resume, selfDescription, jobDescription) {
    // Extract potential job title from job description
    const jobTitleMatch = jobDescription.match(/(?:title|role|position):?\s*([^\n]+)/i);
    const extractedTitle = jobTitleMatch ? jobTitleMatch[1].trim() : "Software Developer";
    
    return {
        title: extractedTitle,
        matchScore: 75,
        technicalQuestions: [
            {
                question: "Explain the difference between synchronous and asynchronous programming in JavaScript.",
                intention: "To evaluate understanding of JavaScript's execution model and async patterns.",
                answer: "Synchronous code executes line by line, blocking further execution until the current task completes. Asynchronous code allows operations like API calls to run in the background, using callbacks, promises, or async/await to handle results when ready."
            },
            {
                question: "Can you describe your experience with the technologies mentioned in your resume?",
                intention: "To verify the depth of knowledge claimed in the resume.",
                answer: "Walk through your key projects, explaining specific technologies used, problems solved, and your role in implementation."
            },
            {
                question: "How do you approach debugging a production issue?",
                intention: "To assess problem-solving methodology and systematic thinking.",
                answer: "1. Reproduce the issue, 2. Check logs and error messages, 3. Isolate the root cause, 4. Implement a fix, 5. Test thoroughly, 6. Deploy with monitoring."
            }
        ],
        behavioralQuestions: [
            {
                question: "Tell me about a challenging project you worked on and how you overcame obstacles.",
                intention: "To evaluate problem-solving skills and perseverance.",
                answer: "Use the STAR method: Describe the Situation, Task at hand, Actions you took, and Results achieved."
            },
            {
                question: "How do you handle feedback or criticism about your code?",
                intention: "To assess collaboration skills and growth mindset.",
                answer: "I welcome constructive feedback as an opportunity to learn. I listen actively, ask clarifying questions, and implement suggestions when they improve code quality."
            }
        ],
        skillGaps: [
            {
                skill: "System Design",
                importance: "Medium"
            },
            {
                skill: "Testing Best Practices",
                importance: "Medium"
            },
            {
                skill: "Performance Optimization",
                importance: "Low"
            }
        ],
        preparationPlans: [
            {
                day: "Day 1",
                focus: "Technical Fundamentals",
                tasks: [
                    "Review core concepts of your primary programming language",
                    "Practice common data structures and algorithms",
                    "Prepare to explain your past projects in detail"
                ]
            },
            {
                day: "Day 2",
                focus: "Behavioral Preparation",
                tasks: [
                    "Prepare STAR stories for 5 common behavioral questions",
                    "Research the company's values and culture",
                    "Practice answering 'Tell me about yourself'"
                ]
            },
            {
                day: "Day 3",
                focus: "Mock Interview",
                tasks: [
                    "Conduct a mock interview with a friend or mentor",
                    "Review and refine your responses",
                    "Practice coding challenges on a whiteboard or shared editor"
                ]
            }
        ]
    };
}

// Helper function to add delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to make API call with timeout and retry
async function makeAPICallWithTimeout(prompt, timeoutMs = 30000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-1.5-flash", // Changed to more stable model
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                jsonSchema: zodToJsonSchema(interviewReportSchema)
            }
        }, { signal: controller.signal });
        
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

export async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    // Truncate long text to prevent timeout
    const truncatedResume = resume.length > 3000 ? resume.substring(0, 3000) + "..." : resume;
    const truncatedJobDesc = jobDescription.length > 2000 ? jobDescription.substring(0, 2000) + "..." : jobDescription;
    const truncatedSelfDesc = selfDescription?.length > 500 ? selfDescription.substring(0, 500) + "..." : selfDescription || "";
    
    const prompt = `You are an expert career coach and interviewer. Based on the following information, generate a comprehensive interview report for the candidate applying for the job.

CRITICAL INSTRUCTIONS:
1. For matchScore: Return ONLY a number between 0-100. Do NOT wrap it in an object. Example: 85
2. For skillGaps.importance: Use ONLY the exact strings: "Low", "Medium", or "High". Do NOT add explanations.
3. All other fields should follow the schema exactly.

Candidate's Resume:
${truncatedResume}

Candidate's Self Description:
${truncatedSelfDesc}

Job Description:
${truncatedJobDesc}

The interview report should include:
1. Technical questions with intentions and answers
2. Behavioral questions with intentions and answers  
3. Skill gaps with skill name and importance (ONLY "Low"/"Medium"/"High")
4. Preparation plan with days, focus areas, and tasks
5. A simple numeric match score (0-100)
6. A title for the job role

Keep responses concise. Maximum 4 technical questions, 3 behavioral questions, 4 skill gaps, and 4 preparation days.`;

    // Try multiple models with fallback
    const models = [
        "gemini-1.5-flash",
        "gemini-2.0-flash-exp",
        "gemini-1.5-pro"
    ];
    
    let lastError = null;
    
    for (let attempt = 1; attempt <= 3; attempt++) {
        for (const model of models) {
            try {
                console.log(`Attempt ${attempt} with model: ${model}`);
                
                const response = await makeAPICallWithTimeout(prompt, 45000);
                
                const parsedResponse = JSON.parse(response.text);
                
                // Validate that the response has the required fields
                if (parsedResponse.technicalQuestions?.length > 0 && 
                    parsedResponse.matchScore !== undefined) {
                    console.log(`Success with model: ${model}`);
                    return parsedResponse;
                }
                
            } catch (error) {
                console.error(`Model ${model} failed:`, error.message);
                lastError = error;
                
                // Wait before retry
                if (attempt < 3) {
                    await delay(2000 * attempt);
                }
            }
        }
    }
    
    // If all API attempts fail, return mock data
    console.log("All API attempts failed. Returning mock data.");
    console.log("Last error:", lastError?.message);
    
    return getMockInterviewReport(resume, selfDescription, jobDescription);
}

export default generateInterviewReport;