import React, { useState } from "react";
import "./roadmap.css"; // ✅ Import CSS

export default function RoadmapGenerator() {
  const [course, setCourse] = useState("");
  const [duration, setDuration] = useState("");
  const [roadmap, setRoadmap] = useState({});
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const generateRoadmap = async () => {
    if (!course || !duration) return alert("Please enter both fields");

    setLoading(true);
    setRoadmap({});

    try {
      const prompt = `Create a detailed study roadmap for learning ${course} in ${duration}.
      Output format: "Week X: Title" headings followed by bullet points of tasks for that week.`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

      // Parse weeks into an object { "Week 1": [task1, task2], "Week 2": [...] }
      const weekBlocks = text.split(/(?=Week\s+\d+)/i);
      const structuredRoadmap = {};

      weekBlocks.forEach((block) => {
        const lines = block.split("\n").filter((line) => line.trim());
        if (lines.length === 0) return;

        const weekTitle = lines[0].replace(/\*\*/g, "").trim();
        const tasks = lines
          .slice(1)
          .map((line) => ({
            text: line.replace(/^[-*]\s*/, "").replace(/\*\*/g, "").trim(),
            done: false,
          }));

        if (weekTitle && tasks.length) {
          structuredRoadmap[weekTitle] = tasks;
        }
      });

      setRoadmap(structuredRoadmap);
    } catch (err) {
      console.error(err);
      alert("Error generating roadmap");
    } finally {
      setLoading(false);
    }
  };

  const toggleCheckbox = (week, index) => {
    setRoadmap((prev) => ({
      ...prev,
      [week]: prev[week].map((task, i) =>
        i === index ? { ...task, done: !task.done } : task
      ),
    }));
  };

  return (
    <div className="roadmap-container">
      <h2 className="roadmap-title">AI Roadmap Generator</h2>
      <input
        type="text"
        placeholder="e.g. Python"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        className="roadmap-input"
      />
      <input
        type="text"
        placeholder="e.g. 1 month"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="roadmap-input"
      />
      <button onClick={generateRoadmap} className="roadmap-button">
        {loading ? "Generating..." : "Generate"}
      </button>

      <div className="roadmap-board">
        {Object.entries(roadmap).map(([week, tasks]) => (
          <div key={week} className="week-column">
            <h3>{week}</h3>
            {tasks.map((task, index) => (
              <label
                key={index}
                className={`roadmap-task ${task.done ? "done" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleCheckbox(week, index)}
                  className="roadmap-checkbox"
                />
                {task.text}
              </label>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}