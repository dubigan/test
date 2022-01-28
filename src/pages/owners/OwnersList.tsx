import React from 'react';
import ListOfItems from '../../components/List/ListOfItems';
import { E_LIST, TItemFunctions, TListOfItemsProps } from '../../components/List/ListTypes';
import { TOwnerItem } from '../../components/Detail/DetailTypes';
import { useListFunctions } from '../../components/List/useListFunctions';
import Header from '../../components/Header/Header';

const Owners = (props: TListOfItemsProps<TOwnerItem>) => {
    const functions = useListFunctions(E_LIST.OWNERS);

    return (
        <>
            <ListOfItems<TOwnerItem> functions={functions as TItemFunctions<TOwnerItem>} />
        </>
    );
};

export default Owners;
