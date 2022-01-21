import { ChangeEvent, useContext, useState } from 'react';
import { useRouter } from 'next/router';
// import { AlertContext } from "../lib/alert/AlertContext";
import { TBaseItem, TItemsProps, TDetailUtils } from './DetailTypes';
import { getErrors, redirect } from '../lib/utils/utils';
import api from '../../pages/api/api';
import { useAlerts } from '../lib/alert/AlertContext';

export const useItemFunctions = <T extends TBaseItem>({ itemInfo }: TItemsProps<T>): TDetailUtils<T> => {
    const context = useAlerts();
    const history = useRouter();
    const [item, setItem] = useState<T>(itemInfo.getNewItem() as T);

    const getItemFromData = (data: any): T => {
        //console.log('getItemFromData', data);
        return data.id ? (data as T) : itemInfo.getNewItem();
    };

    const getChangedItem = (item: T, name: string, value: string) => {
        return {
            ...item,
            [name]: value,
        };
    };

    return {
        getItem: async () => {
            const item_pk = sessionStorage.getItem(itemInfo.idKey) ?? -1;
            console.log('getItem.item_pk: ', item_pk);
            try {
                const res = await api.queryServer(itemInfo.url, { [itemInfo.idKey]: item_pk });
                // console.log("DetailOfItem.getItem.data", res.data);
                redirect(history, res.data.redirect);

                const data = getItemFromData(res.data);
                console.log('DetailOfItem.getItem.data', data);
                setItem(data);
            } catch (err: any) {
                context.setAlerts({ messages: getErrors(err.response?.data) });
            }
        },

        saveItem: async () => {
            try {
                const vitem = itemInfo.verifyItem(item);
                const res = await api.queryServer(itemInfo.url, {
                    owner_pk: sessionStorage.get('owner_pk', -1),
                    [itemInfo.idKey]: vitem?.id,
                    item: vitem,
                });
                //console.log("saveItem", res.data);

                context.setAlerts({
                    messages: [{ type: 'success', message: 'Информация сохранена' }],
                });
                setItem(getItemFromData(res.data));
                // redirect(history, res.data.redirect, "back");
                history.back();
            } catch (err: any) {
                // console.log("saveItem", err);

                let messages;
                if (typeof err.response?.data == 'string') {
                    console.log('saveItem', err.response.data);

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
