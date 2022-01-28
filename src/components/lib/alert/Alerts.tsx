import React, { useState, useEffect } from "react";
import { useAlerts } from "./AlertContext";
import { TAlertsProps } from "./AlertTypes";
import * as Styled from "./Alerts.elements";

const Alerts = ({ timeout = 5000, withAlerts = true }: TAlertsProps) => {
    const [visible, setVisible] = useState(false);
    const alerts = useAlerts();

    let timerId : ReturnType<typeof setTimeout>;

    useEffect(() => {
    // console.log("Alerts.messages", alerts.messages);
        if (alerts.messages && alerts.messages.length > 0) {
            setVisible(true);
            timerId = setTimeout(() => {
                setVisible(false);
                alerts.setAlerts([]);
            }, timeout);
        }
        return () => clearTimeout(timerId)
    }, [alerts.messages]);

    return (
        <>
            {visible && withAlerts && (
                <Styled.Container>
                    {alerts.messages.map((e, index) => {
                        return (
                            <Styled.Alert shadow={true} type={e.type} key={index}>
                                {e.message}
                            </Styled.Alert>
                        );
                    })}
                </Styled.Container>
            )}
        </>
    );
};

export default Alerts;
