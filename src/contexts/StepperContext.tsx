import { createContext, useContext, useState } from 'react';
type StepContextProviderProps = {
    children: React.ReactNode;
};

type UserContextType = {
    userData: any;
    setUserData: React.Dispatch<React.SetStateAction<any>>;
};

export const StepperContext = createContext<UserContextType | null | any>(null);

export function UseContextProvider({ children }: StepContextProviderProps) {
    const [userData, setUserData] = useState<any>(null);

    return (
        <StepperContext.Provider value={{ userData, setUserData }}>
            {children}
        </StepperContext.Provider>
    );
}

export function useStepperContext() {
    const { userData, setUserData } = useContext(StepperContext);

    return { userData, setUserData };
}
