import React, { useState } from "react";
import "./roadmap.css"; // ✅ Import updated CSS

//
// ==========================================
//  SETUP STAGE COMPONENT (MOVED OUTSIDE)
// ==========================================
//
const SetupStage = ({
  course,
  setCourse,
  duration,
  setDuration,
  loading,
  error,
  foundCourses,
  findCourses,
  selectCourse
}) => {
  
  const handleCourseChange = (e) => {
    setCourse(e.target.value);
  };
  
  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    findCourses();
  };

  return (
    <div className="setup-wrapper">
      <div className="container">
        <h1>AI Roadmap Generator 🚀</h1>
        <p>Enter a topic and duration to find the perfect course for you.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="course" 
              id="course"   
              placeholder="e.g., Python, JavaScript, SQL"
              value={course}
              onChange={handleCourseChange}
              autoComplete="off"
              spellCheck="false"
            />
            <input
              type="number"
              name="duration" 
              id="duration"   
              placeholder="Duration in days, e.g., 30"
              value={duration}
              onChange={handleDurationChange}
              min="1"
              autoComplete="off"
            />
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="loader"></span> Finding Courses...
              </>
            ) : (
              'Find Courses'
            )}
          </button>
        </form> 
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="course-selection-container">
          {foundCourses.map((course, index) => (
            <div key={index} className="course-card">
              <h3>{course.title}</h3>
              <div className="meta">
                <span className={`source ${course.source.toLowerCase()}`}>
                  {course.source}
                </span>
                <span className="author">{course.author}</span>
              </div>
              <div className="rating">{'★'.repeat(course.rating)}</div>
              <button 
                className="select-course-btn" 
                onClick={() => selectCourse(index)}
              >
                Select this Course
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

//
// ==========================================
//  LEARNING INTERFACE COMPONENT (MOVED OUTSIDE)
// ==========================================
//
const LearningInterface = ({
  course,
  currentCourse,
  activeModule,
  activeTab,
  setActiveTab,
  roadmap,
  selectModule,
  generateQuiz,
  suggestProject
}) => {

  // This function is now inside LearningInterface
  const renderVideoPlayer = () => {
    if (!currentCourse) return null;
    
    const hasVideoIds = currentCourse.videoIds && currentCourse.videoIds[activeModule];
    
    if (hasVideoIds) {
      return (
        <iframe 
          src={`https://www.youtube.com/embed/${currentCourse.videoIds[activeModule]}`}
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      );
    } else {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#8b949e' }}>
          <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '80px', height: '80px' }}>
            <path d="M8 5v14l11-7z"></path>
          </svg>
        </div>
      );
    }
  };

  return (
    <div className="learning-interface">
      <main className="main-content">
        <h1>
          {currentCourse ? `Module ${activeModule + 1}: ${currentCourse.modules[activeModule]}` : 'Welcome to your course!'}
        </h1>
        <div className="video-container">
          {renderVideoPlayer()}
        </div>
      </main>
      
      <aside className="right-sidebar">
        <div className="tab-buttons">
          <button 
            className={`tab-btn ${activeTab === 'resource' ? 'active' : ''}`}
            onClick={() => setActiveTab('resource')}
          >
            Resource
          </button>
          <button 
            className={`tab-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
            onClick={() => setActiveTab('roadmap')}
          >
            Roadmap
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'resource' && (
            <div className="tab-panel active">
              <ul className="resource-list">
                {currentCourse?.modules.map((module, index) => (
                  <li 
                    key={index}
                    className={activeModule === index ? 'active' : ''}
                    onClick={() => selectModule(index)}
                  >
                    Module {index + 1}: {module}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {activeTab === 'roadmap' && (
            <div className="tab-panel active">
              {roadmap.map((day, index) => (
                <div key={index} className="roadmap-day">
                  <div className="day-title">{day.title}</div>
                  <div className="day-task" dangerouslySetInnerHTML={{ __html: day.task }}></div>
                  <div className="day-buttons">
                    {day.type === 'review' && day.module && (
                      <button 
                        className="quiz-btn" 
                        onClick={() => generateQuiz(day.module)}
                      >
                        ✨ Generate Quiz
                      </button>
                    )}
                    {day.type === 'project' && (
                      <button 
                        className="project-btn" 
                        onClick={() => suggestProject(day.subject || course)}
                      >
                        💡 Suggest a Project
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};


//
// ==========================================
//  MAIN ROADMAP GENERATOR (PARENT COMPONENT)
// ==========================================
//
export default function RoadmapGenerator() {
  // Stage management
  const [currentStage, setCurrentStage] = useState("setup"); // "setup" or "learning"
  
  // Setup stage states
  const [course, setCourse] = useState("");
  const [duration, setDuration] = useState("");
  const [foundCourses, setFoundCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Learning stage states
  const [currentCourse, setCurrentCourse] = useState(null);
  const [roadmap, setRoadmap] = useState([]);
  const [activeTab, setActiveTab] = useState("resource");
  const [activeModule, setActiveModule] = useState(0);
  
  // Quiz states
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizResults, setQuizResults] = useState(null);

  // IMPORTANT: Make sure you have VITE_GEMINI_API_KEY in your .env.local file
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  // // Enhanced database of curated courses with video IDs
  // const curatedCoursesDB = {
  //   'python': [
  //     { 
  //       title: "CS50's Intro to Python", 
  //       source: "YouTube", 
  //       author: "freeCodeCamp.org", 
  //       rating: 5, 
  //       modules: ["Intro", "Functions, Variables", "Conditionals", "Loops", "Exceptions", "Libraries", "Unit Tests", "File I/O", "Regular Expressions", "OOP"],
  //       videoIds: ["nLRL_NcnK-4", "t5sDFvOgAbM", "5_sV_p-a_yU", "_w5n2s-3nSg", "s_Kt6i21y-8", "1x6a53-D4-I", "xv24X45so2k", "1Scm19ITt_A", "r-Alj55tW4g", "tHYi3S0OW_U"] 
  //     },
  //     { 
  //       title: "Python for Everybody", 
  //       source: "Coursera", 
  //       author: "University of Michigan", 
  //       rating: 5, 
  //       modules: ["Getting Started", "Data Structures", "Accessing Web Data", "Databases with Python", "Capstone"] 
  //       // No videoIds, will show placeholder
  //     }
  //   ],
  //   'javascript': [
  //     { 
  //       title: "JS Tutorial for Beginners", 
  //       source: "YouTube", 
  //       author: "Mosh Hamedani", 
  //       rating: 5, 
  //       modules: ["Intro", "Basics", "Control Flow", "Objects", "Arrays", "Functions", "ES6"],
  //       videoIds: ["W6NZfCO5SIk", "hdI2bqOjy3c", "IsG4Xd6LlsM", "7PGPCjcgNCE", "vEROU2XtPR8", "N8ap4k_1QEQ", "NCwa_xi0Uuc"]
  //     }
  //   ],
  //   'sql': [
  //     { 
  //       title: "SQL for Data Science", 
  //       source: "Coursera", 
  //       author: "UC Davis", 
  //       rating: 5, 
  //       modules: ["Intro to SQL", "Data Wrangling", "SQL for Data Analysis", "Advanced SQL", "BI Tools"] 
  //     }
  //   ]
  // };

  // // Gemini API call function
  // const callGeminiAPI = async (prompt) => {
  //   try {
  //     const payload = {
  //       contents: [{ parts: [{ text: prompt }] }],
  //     };
  //     const response = await fetch(
  //       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`,
  //       {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(payload)
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error(`API Error: ${response.statusText}`);
  //     }
  //     const result = await response.json();
  //     return result.candidates[0].content.parts[0].text;
  //   } catch (error) {
  //     console.error("Gemini API call failed:", error);
  //     return null;
  //   }
  // };

  // const findCourses = () => {
  //   const subject = course.toLowerCase().trim();
  //   const durationDays = parseInt(duration);
    
  //   if (!subject || !durationDays || durationDays <= 0) {
  //     setError("Please enter a valid subject and a duration greater than 0.");
  //     return;
  //   }

  //   setError("");
  //   setFoundCourses([]);
    
  //   const courses = curatedCoursesDB[subject];
  //   if (!courses) {
  //     setError(`No curated courses for "${subject}" yet. Try: ${Object.keys(curatedCoursesDB).join(", ")}`);
  //     return;
  //   }
    
  //   setFoundCourses(courses);
  // };

  const selectCourse = (courseIndex) => {
    const subject = course.toLowerCase().trim();
    const durationDays = parseInt(duration);
    const selectedCourse = curatedCoursesDB[subject][courseIndex];
    
    setCurrentCourse(selectedCourse);
    setActiveModule(0);
    generateRoadmapFromCourse(selectedCourse, durationDays);
    setCurrentStage("learning");
  };

  const exitCourse = () => {
    setCurrentStage("setup");
    setCurrentCourse(null);
    setFoundCourses([]);
    setCourse("");
    setDuration("");
    setError("");
    setRoadmap([]);
    setActiveModule(0);
  };

  const generateRoadmapFromCourse = (courseData, durationDays) => {
    const modules = courseData.modules;
    const numModules = modules.length;
    
    if (durationDays < numModules) {
      setError(`This course has ${numModules} modules. Please provide a duration of at least ${numModules} days.`);
      return;
    }

    const roadmapDays = [];
    let dayCounter = 1;
    let moduleIndex = 0;

    while (dayCounter <= durationDays && moduleIndex < numModules) {
      const moduleTitle = modules[moduleIndex];
      
      // Study day
      roadmapDays.push({
        day: dayCounter,
        title: `Day ${dayCounter}: Study`,
        task: `Learn: <strong>${moduleTitle}</strong>`,
        module: null,
        type: 'study'
      });
      dayCounter++;

      // Review day with quiz option
      if (dayCounter <= durationDays) {
        roadmapDays.push({
          day: dayCounter,
          title: `Day ${dayCounter}: Review`,
          task: `Review "${moduleTitle}".`,
          module: moduleTitle,
          type: 'review'
        });
        dayCounter++;
      }
      moduleIndex++;
    }

    // Fill remaining days with project work
    while (dayCounter <= durationDays) {
      roadmapDays.push({
        day: dayCounter,
        title: `Day ${dayCounter}: Project Work`,
        task: `Apply your skills.`,
        module: null,
        type: 'project',
        subject: course
      });
      dayCounter++;
    }

    setRoadmap(roadmapDays);
  };

  const selectModule = (moduleIndex) => {
    setActiveModule(moduleIndex);
  };

  const suggestProject = async (subject) => {
    const prompt = `Suggest a beginner-friendly project for someone learning ${subject}. Provide just the project name and a brief description in 1-2 sentences.`;
    const projectIdea = await callGeminiAPI(prompt);
    alert(projectIdea || "Try building a simple calculator or todo list!");
  };

  // renderVideoPlayer was here, but has been moved into LearningInterface

  const generateQuiz = async (moduleTitle) => {
    setQuizTitle(`AI Quiz: ${moduleTitle}`);
    setQuizData([]);
    setQuizResults(null);
    setShowQuiz(true);

    const prompt = `Create a simple 5-question multiple-choice quiz for a beginner learning about "${moduleTitle}". For each question, provide the question text, three incorrect options, and one correct option. Format the output as a simple JSON array of objects. Each object should have keys "question", "options" (an array of 4 strings), and "answer" (the correct option string).`;
    
    const responseText = await callGeminiAPI(prompt);
    if (responseText) {
      try {
        const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const quiz = JSON.parse(cleanJson);
        // Shuffle options for each question
        quiz.forEach(item => {
          item.options.sort(() => Math.random() - 0.5);
        });
        setQuizData(quiz);
      } catch(e) {
        console.error("Failed to parse quiz JSON:", e);
        setQuizData([]);
      }
    }
  };

  const submitQuiz = () => {
    let score = 0;
    const formData = new FormData(document.getElementById('quiz-form'));
    
    quizData.forEach((item, index) => {
      const selectedAnswer = formData.get(`question${index}`);
      if (selectedAnswer === item.answer) {
        score++;
      }
    });

    setQuizResults({ score, total: quizData.length });
  };

  return (
    <div className="roadmap-container">
      {/* This is the main change. We now render the components
        and pass them all the state and functions they need as props.
      */}
      {currentStage === "setup" ? (
        <SetupStage 
          course={course}
          setCourse={setCourse}
          duration={duration}
          setDuration={setDuration}
          loading={loading}
          error={error}
          foundCourses={foundCourses}
          findCourses={findCourses}
          selectCourse={selectCourse}
        />
      ) : (
        <LearningInterface 
          course={course}
          currentCourse={currentCourse}
          activeModule={activeModule}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          roadmap={roadmap}
          selectModule={selectModule}
          generateQuiz={generateQuiz}
          suggestProject={suggestProject}
        />
      )}
      
      {/* Quiz Modal */}
      {showQuiz && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setShowQuiz(false)}>&times;</span>
            <h2>{quizTitle}</h2>
            
            {quizData.length === 0 ? (
              <div style={{textAlign: 'center'}}>
                <span className="loader"></span>
                <p>Generating your quiz...</p>
              </div>
            ) : (
              <form id="quiz-form">
                {quizData.map((item, index) => (
                  <div key={index} className="quiz-question">
                    <p><strong>{index + 1}. {item.question}</strong></p>
                    <div className="quiz-options">
                      {item.options.map((option, optIndex) => (
                        <label key={optIndex} className={
                          quizResults ? (
                            option === item.answer ? 'correct' : 
                            (document.querySelector(`input[name="question${index}"]:checked`)?.value === option && option !== item.answer) ? 'incorrect' : ''
                          ) : ''
                        }>
                          <input 
                            type="radio" 
                            name={`question${index}`} 
                            value={option}
                            disabled={quizResults !== null}
                          /> {option}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                
                {!quizResults ? (
                  <button type="button" onClick={submitQuiz} className="submit-quiz-btn">
                    Check Answers
                  </button>
                ) : (
                  <div className="quiz-results">
                    Your Score: {quizResults.score} out of {quizResults.total}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}