import { ReactElement, createContext, useCallback, useEffect, useReducer, useContext } from 'react';
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';
import { initialLoginContextProps } from 'types';
import { AuthContextType } from 'types/auth';
import { useNavigate } from 'react-router-dom';
import API from '../utils/axios';

const initialState: initialLoginContextProps = {
    isLoggedIn: false,
    isInitialized: false
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactElement }) => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(accountReducer, initialState);
    const login = async (id: string, phone: string) => {
        const response = await API.post(`auth/login`, { id, phone });
        const { access_token } = response.data;

        localStorage.setItem('token', access_token);
        dispatch({
            type: LOGIN,
            payload: {
                isLoggedIn: true,
                isInitialized: true
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
                            isLoggedIn: true,
                            isInitialized: true
                        }
                    });
                }
            } catch (err) {
                console.error(err);
            }
        };

        init();
    }, [logout]);

    return <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) throw new Error('context must be use inside provider');

    return context;
};

export default AuthContext;
