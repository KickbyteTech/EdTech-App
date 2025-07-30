import react from 'react';
import { useState } from 'react';

import React, { useEffect } from 'react';

const ParticleBackground = () => {
  useEffect(() => {
    const container = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      container.appendChild(particle);
    }
  }, []);

  return (
    <>
      <style>{`
        .particleBackground {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(64, 224, 255, 0.3);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
      `}</style>

      <div className="particleBackground" id="particles"></div>
    </>
  );
};

export default ParticleBackground;