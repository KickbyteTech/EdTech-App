import React, { useState } from "react";

export default function Roadmap() {
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState("");
  const [roadmap, setRoadmap] = useState([]);

  const generateRoadmap = () => {
    if (!subject || !duration) return alert("Please fill in both fields");

    const totalDays = parseInt(duration) * 30; // rough days
    const tasks = [];

    for (let i = 1; i <= totalDays; i++) {
      tasks.push({
        day: i,
        task: `Study ${subject} - Day ${i}`,
        completed: false,
      });
    }

    setRoadmap(tasks);
  };

  const toggleComplete = (day) => {
    setRoadmap((prev) =>
      prev.map((task) =>
        task.day === day ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div style={styles.container}>
      <h2>📅 AI Course Roadmap</h2>

      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          type="text"
          placeholder="Enter subject (e.g., Python)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          style={styles.input}
          type="number"
          placeholder="Duration in months"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <button style={styles.button} onClick={generateRoadmap}>
          Generate
        </button>
      </div>

      {roadmap.length > 0 && (
        <div style={styles.roadmapList}>
          {roadmap.map((task) => (
            <div
              key={task.day}
              style={{
                ...styles.task,
                textDecoration: task.completed ? "line-through" : "none",
                background: task.completed ? "#d4edda" : "#fff",
              }}
              onClick={() => toggleComplete(task.day)}
            >
              {task.task}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "sans-serif",
    maxWidth: "600px",
    margin: "auto",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  input: {
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    flex: "1",
  },
  button: {
    padding: "8px 16px",
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  roadmapList: {
    display: "grid",
    gap: "8px",
  },
  task: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    cursor: "pointer",
    transition: "0.2s",
  },
};
