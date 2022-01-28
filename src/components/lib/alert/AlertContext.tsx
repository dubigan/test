import React, { useState, useContext } from "react";
import { TAlertsContext, TAlertsState, TContextProps } from "./AlertTypes";
import {getErrors} from "../utils/utils";
import axios, {AxiosError} from "axios";

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
    const setInner = (err: AxiosError): void => {
        // console.log('AlertContext.err', err)
        let msgs;
        if (axios.isAxiosError(err)) {
            if (typeof err.response?.data == 'string') {
                msgs = [err.response.data];
            } else {
                msgs = getErrors(err.response?.data);
            }
        }

        if (Array.isArray(err)) msgs = err;
        if (typeof err === 'object' && Object.keys(err).includes('type')) msgs = [err]

        // console.log('AlertContext.messages', msgs)
        if (msgs) setAlerts({ messages: msgs });
        // console.log("AlertProvider.setAlerts.messages", alerts);
    };
    //console.log('AlertProvider.alerts', messages);
    return (
        <AlertContext.Provider value={{ messages: alerts.messages, setAlerts: setInner }}>
            {children}
        </AlertContext.Provider>
    );
};
