import React, { useState } from "react";
import "./roadmap.css";

//
// ==========================================
//  SETUP STAGE COMPONENT
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
  findCourses, // <--- This receives the function from the parent
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
    findCourses(); // <--- This calls the function in the parent
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
                <span className={`source ${course.source ? course.source.toLowerCase() : 'web'}`}>
                  {course.source}
                </span>
                <span className="author">{course.author}</span>
              </div>
              <div className="rating">{'★'.repeat(course.rating || 5)}</div>
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
//  LEARNING INTERFACE COMPONENT
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
  // Auth & User State
  const [authStage, setAuthStage] = useState("login"); // 'login', 'signup', 'loggedin'
  const [userId, setUserId] = useState(localStorage.getItem("preppal_user_id") || "");

  // App State
  const [currentStage, setCurrentStage] = useState("setup");
  const [course, setCourse] = useState("");
  const [duration, setDuration] = useState("");
  const [foundCourses, setFoundCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Learning states
  const [currentCourse, setCurrentCourse] = useState(null);
  const [roadmap, setRoadmap] = useState([]);
  const [activeTab, setActiveTab] = useState("resource");
  const [activeModule, setActiveModule] = useState(0);
  
  // Quiz states
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizResults, setQuizResults] = useState(null);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  // --- AUTH CHECK ON LOAD ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedId = localStorage.getItem('preppal_user_id');
    
    if (token && savedId) {
      setUserId(savedId);
      setAuthStage("loggedin");
      // Load user progress if they have any!
      fetchUserProgress(savedId);
    }
  }, []);

  // --- API FUNCTIONS ---

  const callGeminiAPI = async (prompt) => {
    try {
      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
      };
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );
      if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
      const result = await response.json();
      return result.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Gemini API call failed:", error);
      return null;
    }
  };

  // 1. FETCH COURSES FROM BACKEND
  const findCourses = async () => {
    const subject = course.toLowerCase().trim();
    const durationDays = parseInt(duration);
    
    if (!subject || !durationDays || durationDays <= 0) {
      setError("Please enter a valid subject and a duration greater than 0.");
      return;
    }

    setError("");
    setLoading(true);
    setFoundCourses([]);

    try {
      // Connects to your Node.js server
      const response = await fetch(`http://localhost:5000/api/courses/${subject}`);
      
      if (!response.ok) {
        throw new Error("Failed to connect to the server.");
      }

      const data = await response.json();

      if (data && data.length > 0) {
        setFoundCourses(data);
      } else {
        setError(`No curated courses found for "${subject}". Try: Python, JavaScript, or SQL.`);
      }
    } catch (err) {
      console.error(err);
      setError("Error connecting to the database. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  // 2. FETCH SAVED USER PROGRESS
  const fetchUserProgress = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/progress/${id}`);
      const data = await res.json();
      
      if (data && data.activeCourseSlug) {
        // Fetch course details to restore the UI
        const courseRes = await fetch(`http://localhost:5000/api/courses/${data.activeCourseSlug}`);
        const courseData = await courseRes.json();
        
        if (courseData.length > 0) {
           setCurrentCourse(courseData[0]);
           setRoadmap(data.roadmap || []);
           setActiveModule(data.currentModule || 0);
           setCourse(data.activeCourseSlug);
           setCurrentStage("learning");
        }
      }
    } catch (err) {
      console.log("No previous progress found or server error.");
    }
  };

  // 3. SELECT COURSE & SAVE TO DB
  const selectCourse = async (courseIndex) => {
    const subject = course.toLowerCase().trim();
    const durationDays = parseInt(duration);
    const selectedCourse = foundCourses[courseIndex];
    
    setCurrentCourse(selectedCourse);
    setActiveModule(0);
    
    // Generate roadmap locally and capture the returned array
    const newRoadmap = generateRoadmapFromCourse(selectedCourse, durationDays);
    
    setRoadmap(newRoadmap);
    setCurrentStage("learning");

    // Save to Backend
    if (userId) {
      try {
        await fetch('http://localhost:5000/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: userId,
            courseSlug: subject,
            roadmap: newRoadmap,
            currentModule: 0
          })
        });
      } catch (err) {
        console.error("Failed to save progress to DB", err);
      }
    }
  };

  const generateRoadmapFromCourse = (courseData, durationDays) => {
    const modules = courseData.modules || [];
    const numModules = modules.length;
    
    if (durationDays < numModules) {
      setError(`This course has ${numModules} modules. Please provide a duration of at least ${numModules} days.`);
      return [];
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

      // Review day
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

    // Project days
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

    // setRoadmap(roadmapDays); // Don't set state here, just return
    return roadmapDays; 
  };

  const selectModule = (moduleIndex) => {
    setActiveModule(moduleIndex);
    // Optional: Save module progress to DB here if you want
  };

  const suggestProject = async (subject) => {
    const prompt = `Suggest a beginner-friendly project for someone learning ${subject}. Provide just the project name and a brief description in 1-2 sentences.`;
    const projectIdea = await callGeminiAPI(prompt);
    alert(projectIdea || "Try building a simple calculator or todo list!");
  };

  const generateQuiz = async (moduleTitle) => {
    setQuizTitle(`AI Quiz: ${moduleTitle}`);
    setQuizData([]);
    setQuizResults(null);
    setShowQuiz(true);

    const prompt = `Create a simple 5-question multiple-choice quiz for a beginner learning about "${moduleTitle}". For each question, provide the question text, three incorrect options, and one correct option. Format the output as a simple JSON array of objects.`;
    
    const responseText = await callGeminiAPI(prompt);
    if (responseText) {
      try {
        const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const quiz = JSON.parse(cleanJson);
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

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  // --- RENDER LOGIC ---

  if (authStage === "login") {
    return (
      <Login 
        onLogin={(id) => { 
          setUserId(id); 
          setAuthStage("loggedin"); 
          fetchUserProgress(id);
        }} 
        switchToSignup={() => setAuthStage("signup")} 
      />
    );
  }

  if (authStage === "signup") {
    return <Signup switchToLogin={() => setAuthStage("login")} />;
  }

  // Logged In View
  return (
    <div className="roadmap-container">
      <button 
        onClick={handleLogout} 
        style={{
          position: 'absolute', 
          top: 20, 
          right: 20, 
          zIndex: 100,
          background: '#dc3545',
          color: 'white',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>

      {currentStage === "setup" ? (
        <SetupStage 
          course={course}
          setCourse={setCourse}
          duration={duration}
          setDuration={setDuration}
          loading={loading}
          error={error}
          foundCourses={foundCourses}
          // IMPORTANT: Passing the function down
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