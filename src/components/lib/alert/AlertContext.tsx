import React, { useState, useContext } from 'react';
import { TAlertsContext, TAlertsState, TContextProps } from './AlertTypes';

export const AlertContext = React.createContext<TAlertsContext>({
  messages: [],
  setAlerts: e => e,
});

export const useAlerts = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }: TContextProps) => {
  const [messages, setMessages] = useState<TAlertsState>({
    messages: [],
    //show: false,
  });
  const setAlerts = (messages: any): any => {
    // console.log('AlertProvider.setAlerts', messages);
    setMessages(messages);
  };
  //console.log('AlertProvider.alerts', messages);
  return (
    <AlertContext.Provider value={{ messages: messages.messages, setAlerts: setAlerts }}>
      {children}
    </AlertContext.Provider>
  );
};
