import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./roadmap.css";

// Store API key in a Vite-compatible env variable
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export default function Roadmap() {
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!subject || !duration) {
      setError("Please enter both subject and duration.");
      return;
    }
    setError("");
    setLoading(true);
    setRoadmap(null);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
        Create a detailed study roadmap for learning "${subject}" in "${duration}".
        Format your response strictly as a JSON object like this:
        {
          "weeks": [
            {
              "week": 1,
              "tasks": ["task 1", "task 2"]
            },
            ...
          ]
        }
        Do NOT include any extra text outside the JSON.
      `;

      const result = await model.generateContent(prompt);
      let text = result.response.text();

      // Extract JSON safely
      const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error("No valid JSON found in AI response.");
      }

      let data;
      try {
        data = JSON.parse(jsonMatch[0]);
      } catch (err) {
        throw new Error("Invalid JSON format.");
      }

      setRoadmap(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to generate roadmap.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="roadmap-container">
      <h2>AI Study Roadmap Generator</h2>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter subject (e.g. Python)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter duration (e.g. 1 month)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <button className="card-action" onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate Roadmap"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {roadmap && roadmap.weeks && (
        <div className="roadmap-output">
          {roadmap.weeks.map((week, index) => (
            <div key={index} className="week-section">
              <h3>Week {week.week}</h3>
              <ul>
                {week.tasks.map((task, idx) => (
                  <li key={idx}>
                    <input type="checkbox" /> {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}