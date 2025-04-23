import React, { createContext, useCallback, useEffect, useReducer } from 'react';

import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import axios from 'axios';
import { initialLoginContextProps, KeyedObject, ModelType } from 'types';
import { JWTContextType } from 'types/auth';
import { useNavigate } from 'react-router-dom';

const API = axios.create({
    baseURL: 'http://localhost:5001',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});

// constant
const initialState: initialLoginContextProps = {
    isLoggedIn: false
};

const verifyToken: (st: string) => boolean = (serviceToken) => {
    if (!serviceToken) {
        return false;
    }
    const decoded: KeyedObject = jwtDecode(serviceToken);
    /**
     * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
     */
    return decoded.exp > Date.now() / 1000;
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(accountReducer, initialState);
    const login = async (id: string, phone: string) => {
        const response = await API.post(`auth/login`, { id, phone });
        const { access_token } = response.data;

        localStorage.setItem('token', access_token);
        dispatch({
            type: LOGIN,
            payload: {
                isLoggedIn: true
            }
        });
    };

    const logout = useCallback(() => {
        dispatch({ type: LOGOUT });
        localStorage.clear();
        navigate('/login');
    }, [dispatch, navigate]);

    useEffect(() => {
        const init = () => {
            try {
                const token = window.localStorage.getItem('token');
                if (token?.length) {
                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: true
                        }
                    });
                    navigate(`/${ModelType.student}`);
                } else {
                    logout();
                }
            } catch (err) {
                console.error(err);
                logout();
            }
        };

        init();
    }, [logout, navigate]);

    return <JWTContext.Provider value={{ ...state, login, logout }}>{children}</JWTContext.Provider>;
};

export default JWTContext;
