import mongoose from 'mongoose';

/**
 * - job description
 * -resume text
 * - self description
 * 
 * -technical questions
 * - behavioral questions
 * - skill gaps
 * - preparation plans
 * -match score
 * 
 */
const technicalQuestionSchema = new mongoose.Schema({
    question: { type: String, required: [true, ' Technical question is required'] },
    intention: { type: String, required: [true, 'Intention is required'] },
    answer: { type: String, required: [true, 'Answer is required'] }
},
{ _id: false }
);

const behavioralQuestionSchema = new mongoose.Schema({
    question: { type: String, required: [true, 'Behavioral question is required'] },
    intention: { type: String, required: [true, 'Intention is required'] },
    answer: { type: String, required: [true, 'Answer is required'] }
},
{ _id: false }
);   
const skillGapSchema = new mongoose.Schema({
    skill: { type: String, required: [true, 'Skill gap is required'] },
    importance: { type: String, enum: ['Low', 'Medium', 'High'], required: [true, 'Importance is required'] }
},
{ _id: false }
);   
const preparationPlanSchema = new mongoose.Schema({
    day: { type: String, required: [true, 'Day is required'] },
    focus: { type: String, required: [true, 'Focus is required'] },
    tasks: [{ type: String, required: [true, 'At least one task is required'] }]
},
{ _id: false }
);
const interviewReportSchema = new mongoose.Schema({
    jobDescription: { type: String, required: [true, 'Job description is required'] },
    resume: { type: String },
    selfDescription: { type: String },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlans: [preparationPlanSchema],
    matchScore: { type: Number, required: true, min: 0, max: 100 },
    user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
        },
    
}, 

{ timestamps: true });

const InterviewReportModel = mongoose.model('InterviewReport', interviewReportSchema);

export default InterviewReportModel; 