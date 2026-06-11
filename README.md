# 🎯 GenAI Interview Preparation Platform

An intelligent interview preparation platform that leverages Google's Gemini AI to analyze resumes and job descriptions, generating personalized interview questions, skill gap analysis, and structured preparation plans.

## ✨ Features

- **AI-Powered Analysis**: Uses Google Gemini AI to analyze resumes against job descriptions
- **Personalized Questions**: Generates technical and behavioral interview questions tailored to the candidate's profile
- **Skill Gap Analysis**: Identifies missing skills and their importance levels (High/Medium/Low)
- **Custom Preparation Plans**: Creates day-by-day study plans based on identified gaps
- **Match Score**: Calculates compatibility score between candidate and job requirements
- **Resume Parsing**: Extracts text from PDF/DOCX resumes
- **User Dashboard**: View all generated interview reports
- **Download Reports**: Export interview reports for offline access

## 🏗️ Tech Stack

### Frontend
- **React 18** - UI framework
- **React Router** - Navigation
- **Sass** - Styling with dark theme
- **Tabler Icons** - Icon library
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File upload handling

### AI Integration
- **Google Gemini AI** - Content generation
- **pdf-parse** - PDF text extraction

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Google Gemini API Key

## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/genai-interview-prep.git
cd genai-interview-prep

2. Install Backend Dependencies
cd backend
npm install

3. Install Frontend Dependencies
cd ../frontend
npm install
cd ../frontend

4. Environment Setup
Create .env file in the backend directory:

env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/interview_prep
JWT_SECRET=your_jwt_secret_key_here
GOOGLE_API_KEY=your_gemini_api_key_here
CLIENT_URL=http://localhost:5173
5. Create .env file in frontend directory:
env
VITE_API_URL=http://localhost:3000
6. Start the Application
Backend:

bash
cd backend
npm run dev
Frontend:

bash
cd frontend
npm run dev
The application will be available at:

Frontend: http://localhost:5173

Backend: http://localhost:3000

📁 Project Structure
text
genai-interview-prep/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   └── interviewController.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   └── interviewReportModel.js
│   │   ├── routes/
│   │   │   └── interviewRoutes.js
│   │   ├── services/
│   │   │   └── aiServices.js
│   │   └── app.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── Interview.jsx
│   │   ├── styles/
│   │   │   ├── Home.scss
│   │   │   └── Interview.scss
│   │   ├── hooks/
│   │   │   └── useInterview.js
│   │   ├── context/
│   │   │   └── InterviewContext.js
│   │   └── App.jsx
│   ├── .env
│   └── package.json
└── README.md
🔧 API Endpoints
Interview Reports
Method	Endpoint	Description
POST	/api/interview/	Generate new interview report
GET	/api/interview/	Get all user reports
GET	/api/interview/report/:id	Get specific report
GET	/api/interview/:id/resume	Download resume PDF
Authentication
Method	Endpoint	Description
POST	/api/auth/register	User registration
POST	/api/auth/login	User login
GET	/api/auth/me	Get current user
🎯 Usage Guide
1. Create an Account
Register with email and password

Login to access the dashboard

2. Generate Interview Report
Paste the job description

Upload your resume (PDF/DOCX) OR add self-description

Click "Generate My Interview Strategy"

Wait for AI analysis (approx 30 seconds)

3. Review Your Report
Technical Questions: Practice questions with model answers

Behavioral Questions: Common behavioral questions with STAR method guidance

Match Score: See how well you match the role

Skill Gaps: Identify areas for improvement

Preparation Plan: Follow day-by-day study plan

4. Access Previous Reports
View all generated reports on the home page

Click any report to review it again

Download resumes from previous reports

🤖 AI Prompt Engineering
The system uses carefully crafted prompts to generate:

Technical Questions
Role-specific technical questions

Problem-solving scenarios

System design questions

Behavioral Questions
STAR method responses

Team collaboration scenarios

Leadership and initiative examples

Skill Gap Analysis
Identifies missing technologies

Ranks importance (High/Medium/Low)

Suggests learning priorities

Preparation Plans
Day-by-day study schedules

Practical coding tasks

Interview simulation activities

🎨 UI Features
Dark Theme: Eye-friendly dark interface

Responsive Design: Works on desktop, tablet, and mobile

Interactive Cards: Expandable question cards

Real-time Loading States: Visual feedback during generation

Match Score Ring: Visual indicator of compatibility

Skill Tags: Color-coded importance levels

⚡ Performance Optimizations
Text Truncation: Limits input size for faster AI responses

Retry Logic: Automatic retry on API timeout

Mock Data Fallback: Returns mock data if AI fails

Lazy Loading: Components load as needed

Debounced Inputs: Prevents excessive API calls

🔒 Security Features
JWT authentication

Password hashing with bcrypt

Protected API routes

User-specific data isolation

File type validation

Input sanitization

🐛 Troubleshooting
Common Issues
Gemini API Timeout

Solution: The system automatically retries and falls back to mock data

Reduce resume/job description length for faster processing

MongoDB Connection Error

Verify MongoDB is running

Check connection string in .env file

File Upload Failed

Ensure file is PDF or DOCX

Check file size (max 5MB)

Loading Screen Stuck

Refresh the page

Check browser console for errors

Verify backend is running

🚀 Deployment
Backend Deployment (Render/Heroku)
bash
# Build for production
npm run build

# Set environment variables
# Add MongoDB URI, JWT Secret, Google API Key
Frontend Deployment (Vercel/Netlify)
bash
# Build frontend
npm run build

# Deploy dist folder to hosting service
# Set VITE_API_URL to production backend URL
🤝 Contributing
Fork the repository

Create feature branch (git checkout -b feature/AmazingFeature)

Commit changes (git commit -m 'Add AmazingFeature')

Push to branch (git push origin feature/AmazingFeature)

Open Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Google Gemini AI for providing the generative AI capabilities

MongoDB Atlas for database hosting

React community for excellent documentation

All open-source contributors

📧 Contact
Your Name - @yourtwitter - email@example.com

Project Link: https://github.com/yourusername/genai-interview-prep

🌟 Star History
If you find this project useful, please give it a star ⭐

Built with ❤️ using React, Node.js, and Google Gemini AI



