import { ChangeEvent, useContext, useState } from 'react';
import { useRouter } from 'next/router';
// import { AlertContext } from "../lib/alert/AlertContext";
import {
    TBaseItem,
    TItemsProps,
    TItemFunctions,
    TOwnerItem,
    E_DETAIL,
    TItemType,
    TGender,
    E_GENDER
} from './DetailTypes';
import { getErrors, redirect } from '../lib/utils/utils';
import api from '../../pages/api/api';
import { useAlerts } from '../lib/alert/AlertContext';
import useItemStore from "../../store/useItemStore";

export const useItemFunctions = <T extends TBaseItem>(itemType: TItemType): TItemFunctions<T> => {
    const context = useAlerts();
    const history = useRouter();
    const itemStore = useItemStore<T>(itemType);

    const stringToGender = (value: string): TGender => {
        if (value.startsWith(E_GENDER.FEMALE)) return E_GENDER.FEMALE;
        return E_GENDER.MALE;
    };


    return {
        loadItem: async () => {
            try {
                await itemStore.loadItem();
            } catch (err: any) {
                context.setAlerts(err);
            }
        },

        saveItem: async (back= false) => {
            try {
                // console.log('useItemFunctions', back)
                await itemStore.saveItem()

                context.setAlerts({ type: 'success', message: 'Информация сохранена' });
                if (back) history.back();
            } catch (err: any) {
                context.setAlerts(err);
            }
        },
        changeItem : (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>): void =>
            itemStore.changeItemData(e.target.name, e.target.value),

        changeGender : (e: ChangeEvent<HTMLInputElement>) => {
            itemStore.changeItemData('gender', stringToGender(e.target.value));
            // console.log('OwnerDetail.changeGender.item', e.target.value, item);
        },
        changeItemData: itemStore.changeItemData,
        item: itemStore.item,

    };
};
