import React, { useState } from 'react';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import logoImg from '../assets/images/eden-logo-no-bg.png';
import StepOne from './steps/StepOne.js';
import StepTwo from './steps/StepTwo.js';
import StepThree from './steps/StepThree.js';
import StepFour from './steps/StepFour.js';

const getSteps = () => {
   return ["", "", "", ""]
};

const getStepContent = (step) => {
   switch (step) {
     case 0:
       return <StepOne />;
     case 1:
       return <StepTwo />;
     case 2:
       return <StepThree />;
     case 3:
       return <StepFour />;
     default:
       return "unknown step";
   }
};

const Layout = () => {
   const [activeStep, setActiveStep] = useState(0);
   const [completed, setCompleted] = useState({});
   const steps = getSteps();
   const totalSteps = () => {
      return steps.length;
   };
   const completedSteps = () => {
      return Object.keys(completed).length;
   };
   const isLastStep = () => {
      return activeStep === totalSteps() - 1;
   };
   const allStepsCompleted = () => {
      return completedSteps() === totalSteps();
   };
   const handleNext = () => {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
   };
   const handleStep = step => () => {
      setActiveStep(step);
   };
   const handleReset = () => {
      setActiveStep(0);
      setCompleted({});
   };

   return (
      <div className="container-md d-flex flex-column justify-content-center align-items-center layout">
         <section className="row mt-1 mb-4">
            <img src={logoImg} alt="logo" />
         </section>
         <section className="row my-4">
            <Stepper alternativeLabel activeStep={activeStep}>
               {steps.map((label, index) => (
                  <Step key={label}>
                     <StepButton
                        onClick={handleStep(index)}
                        completed={completed[index]}
                     >
                        {label}
                     </StepButton>
                  </Step>
               ))}
            </Stepper>
            <div>
               {allStepsCompleted() ? (
                  <div>
                     <button className="button-accent border-0 rounded" onClick={handleReset}>
                        Reset
                     </button>
                  </div>
               ) : (
                  <div>
                     {getStepContent(activeStep)}
                     {
                        activeStep !== 3 ? (
                           <div>
                              <button className="button-accent border-0 rounded" onClick={handleNext}>
                                 Create Workspace
                              </button>
                           </div>
                        ) : (
                           null
                        )
                     }
                  </div>
               )}
            </div>
         </section>
      </div>
  )
};

export default Layout;