import { useState } from 'react';
import Stepper from '~/components/stepProgressBar/Stepper';
import StepperControl from '~/components/stepProgressBar/StepperControl';
import Account from '~/components/stepProgressBar/steps/Account';
import ConfirmStep from '~/components/stepProgressBar/steps/ConfirmStep';
import DetailStep from '~/components/stepProgressBar/steps/DetailStep';
import { UseContextProvider } from '~/contexts/StepperContext';

const New = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const steps = ['Account Information', 'Personal Details', 'Confirm', 'Complete'];
    const displayStep = (step: number) => {
        switch (step) {
            case 1:
                return <Account />;
            case 2:
                return <DetailStep />;
            case 3:
                return <ConfirmStep />;
            case 4:
                return <span>Detail</span>;
            default:
        }
    };
    const handleClick = (direction: string) => {
        let newStep = currentStep;

        direction === 'next' ? newStep++ : newStep--;
        // check if steps are within bounds
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    };

    return (
        <div className='rounded-2xl bg-white pb-2 shadow-xl'>
            {/* Stepper */}
            <div className='horizontal container mt-5 '>
                <Stepper steps={steps} currentStep={currentStep} />

                <div className='my-10 p-10 '>
                    <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
                </div>
            </div>

            {/* navigation button */}
            {currentStep !== steps.length && (
                <StepperControl handleClick={handleClick} currentStep={currentStep} steps={steps} />
            )}
        </div>
    );
};

export default New;
