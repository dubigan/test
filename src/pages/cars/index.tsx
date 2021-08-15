import React from "react";
import ListOfItems from "../../components/List/ListOfItems";
import { TListOfItemsProps, TItemFunctions } from "../../components/List/ListTypes";
import { TCarItem } from "../../components/Detail/DetailTypes";
import { useListFunctions } from "../../components/List/useListFunctions";

const Cars = (props: TListOfItemsProps<TCarItem>) => {
    // componentDidUpdate(prevProps: TListOfItemsProps, prevState: TListOfItemsState<TCarItem>) {
    //   super.componentDidUpdate(prevProps, prevState);
    //   if (prevProps.owner !== this.props.owner) this.getItems();
    // }
    const functions = useListFunctions("cars");
    // console.log('Cars.owner', props.owner);

    return (
        <ListOfItems<TCarItem>
            owner={props.owner}
            withAlerts={props.withAlerts}
            functions={functions as TItemFunctions<TCarItem>}
        />
    );
};

export default Cars;
