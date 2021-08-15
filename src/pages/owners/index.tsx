import React from "react";
import ListOfItems from "../../components/List/ListOfItems";
import { TItemFunctions, TListOfItemsProps } from "../../components/List/ListTypes";
import { TOwnerItem } from "../../components/Detail/DetailTypes";
import { useListFunctions } from "../../components/List/useListFunctions";

const Owners = (props: TListOfItemsProps<TOwnerItem>) => {
    const functions = useListFunctions("owners");

    return <ListOfItems<TOwnerItem> functions={functions as TItemFunctions<TOwnerItem>} />;
};

export default Owners;
