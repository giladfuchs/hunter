import { useEffect, useContext, ReactNode } from 'react';
import AuthContext from './UseAuth';
import API from '../utils/axios';
import { AxiosError, AxiosResponse } from 'axios';

interface AxiosInterceptorProps {
    children: ReactNode;
}

const AxiosInterceptor = ({ children }: AxiosInterceptorProps) => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        const responseInterceptor = API.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error: AxiosError) => {
                if (error.response?.status === 401) {
                    authContext!.logout();
                }

                return Promise.reject(error);
            }
        );

        return () => {
            API.interceptors.response.eject(responseInterceptor);
        };
    }, [authContext]);

    return <>{children}</>;
};

export default AxiosInterceptor;
