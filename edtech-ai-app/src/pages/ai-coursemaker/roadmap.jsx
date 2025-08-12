import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './roadmap.css'; // Create this for styling

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-pro" });

function Roadmap() {

  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState('');
  const [roadmapJson, setRoadmapJson] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const buildPrompt = (subject, duration) => {
    return `
Create a structured JSON roadmap to learn ${subject} in ${duration}. 
Divide it into weekly and daily tasks. Each day should have:
- task_title
- description
- 1-2 learning resources (link or site)
- estimated_time_minutes

Return only JSON structured as:
{
  "course": "${subject}",
  "duration_weeks": number,
  "weeks": [
    {
      "week": number,
      "days": [
        {
          "day": number,
          "task_title": "string",
          "description": "string",
          "resources": ["url1", "url2"],
          "estimated_time_minutes": number
        }
      ]
    }
  ]
}
`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !duration) {
      setError("Please provide both a subject and a duration.");
      return;
    }
    if (isLoading) return;

    setIsLoading(true);
    setError('');
    setRoadmapJson(null);

    try {
      const prompt = buildPrompt(subject, duration);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      try {
        const parsed = JSON.parse(text);
        setRoadmapJson(parsed);
      } catch (jsonError) {
        setError("AI returned invalid JSON. Please try again.");
        console.error("JSON Parse Error:", jsonError);
      }

    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to generate roadmap. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="roadmap-generator">
      <h1>AI Roadmap Generator</h1>
      <p>Enter a subject and duration to get a weekly learning roadmap.</p>

      <form onSubmit={handleSubmit} className="roadmap-form">
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g., Web Development"
          required
        />
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="e.g., 6 Weeks"
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Create Roadmap'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {roadmapJson && (
        <div className="roadmap-output">
          <h2>{roadmapJson.course} Roadmap ({roadmapJson.duration_weeks} weeks)</h2>

          {roadmapJson.weeks.map((week) => (
            <div key={week.week} className="week-section">
              <h3>Week {week.week}</h3>
              <div className="days-grid">
                {week.days.map((day) => (
                  <div key={day.day} className="day-card">
                    <h4>Day {day.day}: {day.task_title}</h4>
                    <p>{day.description}</p>
                    <p><strong>Time:</strong> {day.estimated_time_minutes} mins</p>
                    <ul>
                      {day.resources.map((res, idx) => (
                        <li key={idx}><a href={res} target="_blank" rel="noreferrer">{res}</a></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Roadmap;