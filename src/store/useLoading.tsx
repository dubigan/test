import { useMemo } from 'react';
import Loading from './Loading';

const useLoading = () => {
    return useMemo(() => new Loading(), []);
};

export default useLoading;
