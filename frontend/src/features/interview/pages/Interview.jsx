import React, { useState } from 'react';
import "../styles/Interview.scss";

const Interview = () => {
  const [activeTab, setActiveTab] = useState('technical');
  const [openQuestions, setOpenQuestions] = useState({});
  
  // Strictly following the provided data structure
  const reportData = {
    _id: "685f9d4a8b2c7e1a4f123456",
    userId: "685f9c8d8b2c7e1a4f654321",
    technicalQuestions: [
      {
        question: "What is the difference between state and props in React?",
        intention: "To evaluate understanding of React's data flow and component architecture.",
        answer: "Explain that props are read-only data passed from parent to child components, while state is managed within a component and can change over time."
      },
      {
        question: "How does useEffect work in React?",
        intention: "To assess knowledge of side effects and component lifecycle management.",
        answer: "Describe that useEffect runs after render and is used for API calls, subscriptions, and DOM updates. Explain dependency arrays and cleanup functions."
      }
    ],
    behavioralQuestions: [
      {
        question: "Tell me about a challenging bug you encountered and how you resolved it.",
        intention: "To evaluate problem-solving and debugging skills.",
        answer: "Use the STAR method and explain the issue, investigation process, solution implemented, and final outcome."
      },
      {
        question: "Describe a time when you had to learn a new technology quickly.",
        intention: "To assess adaptability and learning ability.",
        answer: "Provide a real example showing initiative, learning resources used, and successful application of the technology."
      }
    ],
    skillGaps: [
      {
        skill: "TypeScript",
        importance: "High"
      },
      {
        skill: "React Testing Library",
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
        focus: "React Fundamentals",
        tasks: [
          "Review component lifecycle",
          "Practice useState and useEffect",
          "Build a small React project"
        ]
      },
      {
        day: "Day 2",
        focus: "API Integration",
        tasks: [
          "Learn Fetch API",
          "Handle loading and error states",
          "Connect a React app to a public API"
        ]
      },
      {
        day: "Day 3",
        focus: "Interview Practice",
        tasks: [
          "Answer common React questions",
          "Conduct a mock interview",
          "Review behavioral responses"
        ]
      }
    ],
    matchScore: 85,
    createdAt: "2026-06-10T14:30:25.123Z",
    updatedAt: "2026-06-10T14:30:25.123Z"
  };

  const tabs = [
    { id: 'technical', label: 'Technical Questions', icon: 'fas fa-code', count: reportData.technicalQuestions.length },
    { id: 'behavioral', label: 'Behavioral Questions', icon: 'fas fa-comments', count: reportData.behavioralQuestions.length },
    { id: 'roadmap', label: 'Road Map', icon: 'fas fa-map', count: reportData.preparationPlans.length }
  ];

  const toggleQuestion = (questionId) => {
    setOpenQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };
  
  // Format date if needed
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="interview">
      {/* Main Two-Column Layout */}
      <div className="interview__layout">
        {/* Left Column - Questions */}
        <div className="interview__left">
          {/* Tabs Navigation */}
          <div className="interview__tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`interview__tab ${activeTab === tab.id ? 'interview__tab--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <i className={tab.icon}></i>
                <span>{tab.label}</span>
                <span className="interview__tab-count">{tab.count} questions</span>
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="interview__content">
            {/* Technical Questions */}
            {activeTab === 'technical' && (
              <div className="questions-section">
                {reportData.technicalQuestions.map((item, index) => (
                  <div key={index} className="question-item">
                    <div 
                      className="question-item__header"
                      onClick={() => toggleQuestion(`tech-${index}`)}
                    >
                      <span className="question-item__number">Q{index + 1}</span>
                      <h4 className="question-item__title">{item.question}</h4>
                      <i className={`fas fa-chevron-down question-item__toggle ${openQuestions[`tech-${index}`] ? 'rotated' : ''}`}></i>
                    </div>
                    {openQuestions[`tech-${index}`] && (
                      <div className="question-item__details">
                        <div className="question-item__intention">
                          <i className="fas fa-bullseye"></i>
                          <strong>Intention:</strong> {item.intention}
                        </div>
                        <div className="question-item__answer">
                          <i className="fas fa-lightbulb"></i>
                          <strong>How to Answer:</strong> {item.answer}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Behavioral Questions */}
            {activeTab === 'behavioral' && (
              <div className="questions-section">
                {reportData.behavioralQuestions.map((item, index) => (
                  <div key={index} className="question-item">
                    <div 
                      className="question-item__header"
                      onClick={() => toggleQuestion(`behavioral-${index}`)}
                    >
                      <span className="question-item__number">Q{index + 1}</span>
                      <h4 className="question-item__title">{item.question}</h4>
                      <i className={`fas fa-chevron-down question-item__toggle ${openQuestions[`behavioral-${index}`] ? 'rotated' : ''}`}></i>
                    </div>
                    {openQuestions[`behavioral-${index}`] && (
                      <div className="question-item__details">
                        <div className="question-item__intention">
                          <i className="fas fa-bullseye"></i>
                          <strong>Intention:</strong> {item.intention}
                        </div>
                        <div className="question-item__answer">
                          <i className="fas fa-lightbulb"></i>
                          <strong>How to Answer:</strong> {item.answer}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Road Map */}
            {activeTab === 'roadmap' && (
              <div className="roadmap-section">
                {reportData.preparationPlans.map((plan, index) => (
                  <div key={index} className="plan-item">
                    <div className="plan-item__header">
                      <span className="plan-item__week">{plan.day}</span>
                      <h4 className="plan-item__focus">{plan.focus}</h4>
                    </div>
                    <ul className="plan-item__tasks">
                      {plan.tasks.map((task, taskIndex) => (
                        <li key={taskIndex}>
                          <i className="fas fa-check-circle"></i>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Right Column - Match Score & Skill Gaps */}
        <div className="interview__right">
          {/* Match Score Card */}
          <div className="match-score-card">
            <div className="match-score-card__header">
              <i className="fas fa-chart-line"></i>
              <h3>MATCH SCORE</h3>
            </div>
            <div className="match-score-card__score">
              <span className="match-score-card__percentage">{reportData.matchScore}%</span>
            </div>
            <p className="match-score-card__description">
              {reportData.matchScore >= 80 ? "Strong match for this role" : 
               reportData.matchScore >= 60 ? "Good match with some gaps" : 
               "Consider addressing key skill gaps"}
            </p>
          </div>
          
          {/* Skill Gaps Card */}
          <div className="skill-gaps-card">
            <div className="skill-gaps-card__header">
              <i className="fas fa-exclamation-triangle"></i>
              <h3>SKILL GAPS</h3>
            </div>
            <ul className="skill-gaps-card__list">
              {reportData.skillGaps.map((gap, index) => (
                <li key={index}>
                  <i className="fas fa-chevron-right"></i>
                  <span className="skill-gaps-card__skill">{gap.skill}</span>
                  <span className={`skill-gaps-card__importance skill-gaps-card__importance--${gap.importance.toLowerCase()}`}>
                    {gap.importance}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;