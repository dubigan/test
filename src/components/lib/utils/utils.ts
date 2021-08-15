import { KeyboardEvent } from "react";
import { TError, TAlertsState } from "../alert/AlertTypes";

const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];

export const getErrors = (data: Object): TError[] => {
    if (!data) return [{ type: "error", message: "Unknown error" }];
    return Object.keys(data).map((key: any) => {
        return { type: "error", message: getKeyValue(data, key) };
    });
};

export const redirect = (history: any, redirect: string, dir = "") =>
    redirect && dir === "back" ? history.back() : history.push(redirect);

export const digitsOnly = (e: KeyboardEvent<Element>) => {
    let charCode = e.code;
    //console.log(charCode);
    if (+charCode < 48 || +charCode > 57) {
        // digits only
        e.preventDefault();
    }
};
