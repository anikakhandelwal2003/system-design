import React, { useState, useEffect } from 'react';
import '../styles/progressbar.css';

function ProgressBarComponent() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="progressbar-container">
      <div
        className="progressbar"
        style={{ width: `${progress}%` }} 
      ></div>
    </div>
  );
}

export default ProgressBarComponent;
