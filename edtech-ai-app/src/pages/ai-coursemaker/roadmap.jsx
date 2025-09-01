import React, { useState } from "react";
import "./roadmap.css"; // ✅ Import updated CSS

export default function RoadmapGenerator() {
  const [course, setCourse] = useState("");
  const [duration, setDuration] = useState("");
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizResults, setQuizResults] = useState(null);

  // IMPORTANT: Make sure you have VITE_GEMINI_API_KEY in your .env.local file
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  // Mock database of curated courses
  const curatedCourses = {
    'python': {
      name: "CS50's Introduction to Programming with Python",
      type: "YouTube Playlist",
      modules: ["Functions, Variables", "Conditionals", "Loops", "Exceptions", "Libraries", "Unit Tests", "File I/O", "Regular Expressions", "Object-Oriented Programming"]
    },
    'javascript': {
      name: "Full JavaScript Course for Beginners by freeCodeCamp",
      type: "YouTube Video",
      modules: ["Introduction to JavaScript", "Variables and Data Types", "Arrays and Objects", "Operators", "Conditional Statements", "Loops (For, While)", "Functions", "Scope", "DOM Manipulation", "Events", "JSON", "Async JS (Promises, async/await)"]
    },
    'ux design': {
      name: "Google UX Design Professional Certificate",
      type: "Coursera Course",
      modules: ["Foundations of UX Design", "Start the UX Design Process: Empathize, Define, and Ideate", "Build Wireframes and Low-Fidelity Prototypes", "Conduct UX Research and Test Early Concepts", "Create High-Fidelity Designs and Prototypes in Figma", "Responsive Web Design in Adobe XD", "Design a User Experience for Social Good & Prepare for Jobs"]
    }
  };

  // Gemini API call function
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
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      const result = await response.json();
      return result.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Gemini API call failed:", error);
      return null;
    }
  };

  const generateRoadmap = async () => {
    const subject = course.toLowerCase().trim();
    const durationDays = parseInt(duration);
    
    if (!subject || !durationDays || durationDays <= 0) {
      alert("Please enter a valid subject and a duration greater than 0.");
      return;
    }

    setLoading(true);
    setRoadmap([]);

    try {
      const curatedCourse = curatedCourses[subject];
      if (curatedCourse) {
        // Use curated course
        generateRoadmapFromCourse(curatedCourse, durationDays);
      } else {
        // Generate with AI
        const prompt = `You are an expert curriculum designer. Create a beginner-friendly, 10-module learning roadmap for the topic "${subject}". Provide the output as a clean JSON array of strings, where each string is a module title. Do not include any text before or after the JSON array. Example for "Python": ["Introduction to Python", "Variables and Data Types", "Control Flow", ...].`;
        
        const responseText = await callGeminiAPI(prompt);

        if (responseText) {
          try {
            const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            const modules = JSON.parse(cleanJson);
            const aiCourse = {
              name: `AI-Generated Plan for ${subject.charAt(0).toUpperCase() + subject.slice(1)}`,
              modules: modules
            };
            generateRoadmapFromCourse(aiCourse, durationDays);
          } catch (e) {
            console.error("Failed to parse AI-generated roadmap:", e);
            alert("The AI couldn't create a roadmap for this topic. Please try another one.");
          }
        } else {
          alert("There was an error generating the AI roadmap. Please check your connection and try again.");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Error generating roadmap. Check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  const generateRoadmapFromCourse = (courseData, durationDays) => {
    const modules = courseData.modules;
    const numModules = modules.length;
    
    if (durationDays < numModules) {
      alert(`This course has ${numModules} modules. Please provide a duration of at least ${numModules} days.`);
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
        task: `Watch/Read Module: ${moduleTitle}`,
        module: null,
        type: 'study'
      });
      dayCounter++;

      // Review day with quiz option
      if (dayCounter <= durationDays) {
        roadmapDays.push({
          day: dayCounter,
          title: `Day ${dayCounter}: Review & Practice`,
          task: `Review notes and take a practice quiz on "${moduleTitle}".`,
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
        title: `Day ${dayCounter}: Project Work / Catch-up`,
        task: `Work on a personal project applying what you've learned or review past topics.`,
        module: null,
        type: 'project'
      });
      dayCounter++;
    }

    setRoadmap(roadmapDays);
  };

  const suggestTopic = async () => {
    setLoading(true);
    const prompt = "You are a helpful academic advisor. Suggest one popular and specific topic for a beginner to self-study. For example: Python, JavaScript, UX Design. Return only the name of the topic.";
    const topic = await callGeminiAPI(prompt);
    setCourse(topic ? topic.trim() : "");
    setLoading(false);
  };

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
      <h1 className="roadmap-title">AI Roadmap Generator 🚀</h1>
      <p className="roadmap-subtitle">Enter a topic and duration to create your personalized learning plan.</p>
      
      <div className="input-group">
        <input
          type="text"
          placeholder="Try: Python, SQL, or any topic!"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="roadmap-input"
        />
        <input
          type="number"
          placeholder="Duration in days, e.g., 30"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="roadmap-input"
        />
      </div>
      
      <div className="button-group">
        <button onClick={generateRoadmap} disabled={loading} className="roadmap-button generate-btn">
          {loading ? (
            <>
              <span className="loader"></span> Generating AI Roadmap...
            </>
          ) : (
            'Generate My Roadmap'
          )}
        </button>
        <button onClick={suggestTopic} disabled={loading} className="roadmap-button suggest-btn">
          {loading ? (
            <>
              <span className="loader"></span> Thinking...
            </>
          ) : (
            '✨ Suggest a Topic'
          )}
        </button>
      </div>

      <div className="roadmap-display">
        {roadmap.map((day, index) => (
          <div key={index} className="roadmap-day">
            <div className="day-title">{day.title}</div>
            <div className="day-task" dangerouslySetInnerHTML={{ __html: day.task }}></div>
            {day.module && (
              <button 
                className="quiz-btn" 
                onClick={() => generateQuiz(day.module)}
              >
                ✨ Generate Quiz
              </button>
            )}
          </div>
        ))}
      </div>

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