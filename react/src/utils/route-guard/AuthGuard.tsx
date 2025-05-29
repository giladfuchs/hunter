import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/UseAuth';
import { GuardProps } from 'types';
import { useEffect } from 'react';

const AuthGuard = ({ children }: GuardProps) => {
    const { isLoggedIn, isInitialized } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn && isInitialized) {
            navigate('/login', { replace: true });
        }
    }, [isLoggedIn, navigate, isInitialized]);

    return children;
};

export default AuthGuard;
