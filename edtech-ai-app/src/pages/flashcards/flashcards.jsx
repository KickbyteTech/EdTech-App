import React from "react"
import { useState } from 'react';
import './flashcards.css';

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([
    { front: "What is the capital of France?", back: "Paris" },
    { front: "What is 2 + 2?", back: "4" }
  ]);

  const [currentCard, setCurrentCard] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [frontInput, setFrontInput] = useState("");
  const [backInput, setBackInput] = useState("");

  const updateDisplayText = () => {
    if (flashcards.length === 0) return "No cards yet. Add one below!";
    const card = flashcards[currentCard];
    return showBack ? card.back : card.front;
  };

  const addFlashcard = () => {
    if (!frontInput.trim() || !backInput.trim()) {
      alert("Both front and back are required!");
      return;
    }
    setFlashcards([...flashcards, { front: frontInput.trim(), back: backInput.trim() }]);
    setFrontInput("");
    setBackInput("");
    setCurrentCard(flashcards.length); // new card index
    setShowBack(false);
  };

  const nextFlashcard = () => {
    if (flashcards.length === 0) return;
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
    setShowBack(false);
  };

  const prevFlashcard = () => {
    if (flashcards.length === 0) return;
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setShowBack(false);
  };

  const flipFlashcard = () => {
    if (flashcards.length === 0) return;
    setShowBack((prev) => !prev);
  };

  return (
    <div className="feature-section" id="flashcardsSection">
      <div className="feature-card">
        <div className="card-icon">🃏</div>
        <h3>Smart Flashcards</h3>

        {/* Card Display */}
        <div
          className="flashcard-view"
          onClick={flipFlashcard}
          style={{ cursor: "pointer" }}
        >
          {updateDisplayText()}
        </div>

        {/* Controls */}
        <div className="flashcard-controls">
          <button className="card-action" onClick={prevFlashcard}>
            Previous
          </button>
          <button className="card-action" onClick={nextFlashcard}>
            Next
          </button>
        </div>

        <hr style={{ margin: "20px 0", border: "1px solid rgba(64,224,255,0.1)" }} />

        {/* Add Card */}
        <div>
          <input
            type="text"
            value={frontInput}
            onChange={(e) => setFrontInput(e.target.value)}
            placeholder="Front of card (Question)"
            style={{ marginBottom: "10px" }}
          />
          <input
            type="text"
            value={backInput}
            onChange={(e) => setBackInput(e.target.value)}
            placeholder="Back of card (Answer)"
          />
          <button className="card-action" onClick={addFlashcard}>
            Add Flashcard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;