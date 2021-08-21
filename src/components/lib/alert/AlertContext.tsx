import React, { useState, useContext } from "react";
import { TAlertsContext, TAlertsState, TContextProps } from "./AlertTypes";

const AlertContext = React.createContext<TAlertsContext>({
    messages: [],
    setAlerts: (e) => e,
});
// const AlertContext = React.createContext<TAlertsContext>(null);

export const useAlerts = () => {
    return useContext(AlertContext);
};

export const AlertProvider = ({ children }: TContextProps) => {
    const [alerts, setAlerts] = useState<TAlertsState>({ messages: [] });
    const setInner = (msgs: any): void => {
        setAlerts({ messages: msgs });
        // console.log("AlertProvider.setAlerts.messages", alerts);
    };
    //console.log('AlertProvider.alerts', messages);
    return (
        <AlertContext.Provider value={{ messages: alerts.messages, setAlerts: setInner }}>
            {children}
        </AlertContext.Provider>
    );
};
