import React, { useState } from 'react';
import '../styles/stepper.css';

const Stepper = () => {
  const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };


  return (
    <div className="stepper-container">
      <div className="stepper">
      {steps.map((step, index) => {
      return (
        <div key={index} className={`step ${index <= currentStep ? 'active' : ''}`}>
          <div className="step-number">{index + 1}</div>
          <div className="step-label">{step}</div>
        </div>
      )})}
      </div>
      <div className="stepper-actions">
        <button onClick={prevStep} disabled={currentStep === 0}>
          Previous
        </button>
        <button onClick={nextStep} disabled={currentStep === steps.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Stepper;
