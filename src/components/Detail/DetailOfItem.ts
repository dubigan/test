import { ChangeEvent, useContext, useState } from "react";
import { useRouter } from "next/router";
// import { AlertContext } from "../lib/alert/AlertContext";
import { TBaseItem, TDetailOfItemsProps, TDetailUtils } from "./DetailTypes";
import { getErrors, redirect } from "../lib/utils/utils";
import api from "../../pages/api/api";
import { useAlerts } from "../lib/alert/AlertContext";

export const useDetailOfItem = <TItem extends TBaseItem>({
    functions,
}: TDetailOfItemsProps<TItem>): TDetailUtils<TItem> => {
    const context = useAlerts();
    const history = useRouter();
    const [item, setItem] = useState<TItem>(functions.getNewItem() as TItem);

    const getItemFromData = (data: any): TItem => {
        //console.log('getItemFromData', data);
        return data.id ? (data as TItem) : functions.getNewItem();
    };

    const getChangedItem = (item: TItem, name: string, value: string) => {
        return {
            ...item,
            [name]: value,
        };
    };

    return {
        getItem: async () => {
            const item_pk = sessionStorage.getItem(functions.idKey) ?? -1;
            console.log("getItem.item_pk: ", item_pk);
            try {
                const res = await api.queryServer(functions.url, { [functions.idKey]: item_pk });
                // console.log("DetailOfItem.getItem.data", res.data);
                redirect(history, res.data.redirect);

                const data = getItemFromData(res.data);
                console.log("DetailOfItem.getItem.data", data);
                setItem(data);
            } catch (err) {
                context.setAlerts({ messages: getErrors(err.response?.data) });
            }
        },

        saveItem: async () => {
            try {
                const vitem = functions.verifyItem(item);
                const res = await api.queryServer(functions.url, {
                    [functions.idKey]: vitem.id,
                    item: vitem,
                });
                //console.log("saveItem", res.data);

                context.setAlerts({
                    messages: [{ type: "success", message: "Информация сохранена" }],
                });
                setItem(getItemFromData(res.data));
                // redirect(history, res.data.redirect, "back");
                history.back();
            } catch (err) {
                // console.log("saveItem", err);

                let messages;
                if (typeof err.response?.data == "string") {
                    console.log("saveItem", err.response.data);

                    messages = [err.response.data];
                } else {
                    messages = getErrors(err.response?.data);
                }
                // console.log("DeatilOfItem.saveItem.messages", messages);
                context.setAlerts(messages);
            }
        },

        changeItem: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>): void => {
            setItem(getChangedItem(item, e.target.name, e.target.value));
        },
        item,
        setItem,
    };
};
