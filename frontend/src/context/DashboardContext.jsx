import { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export function DashboardProvider ({children}){

    const [primaryAction, setPrimaryAction] = useState( null);

    return (
        <DashboardContext.Provider value={{primaryAction, setPrimaryAction}}>
            {children}
        </DashboardContext.Provider>
    )
}

export function useDashboard(){
    return useContext(DashboardContext);
}