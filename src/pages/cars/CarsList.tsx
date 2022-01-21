import React from 'react';
import ListOfItems from '../../components/List/ListOfItems';
import { TListOfItemsProps, TItemFunctions, E_LIST } from '../../components/List/ListTypes';
import { TCarItem } from '../../components/Detail/DetailTypes';
import { useListFunctions } from '../../components/List/useListFunctions';
import Header from '../../components/Header/Header';
import { GetServerSideProps } from 'next';
import api from '../../pages/api/api';

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { req } = context;
//   console.log('getServerSideProps', req);
//   // const res = await api.queryServer(req.url ?? '', {});

//   return { props: {} };
// };

const Cars = (props: TListOfItemsProps<TCarItem>) => {
    const functions = useListFunctions(E_LIST.CARS);
    // console.log('Cars.owner', props.owner);

    return (
        <>
            <ListOfItems<TCarItem>
                owner={props.owner}
                withAlerts={props.withAlerts}
                functions={functions as TItemFunctions<TCarItem>}
            />
        </>
    );
};

export default Cars;
