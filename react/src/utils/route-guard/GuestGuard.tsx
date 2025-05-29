import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/UseAuth';
import config from 'config';
import { GuardProps } from 'types';
import { useEffect } from 'react';

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const GuestGuard = ({ children }: GuardProps) => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate(config.defaultPath, { replace: true });
        }
    }, [isLoggedIn, navigate]);

    return children;
};

export default GuestGuard;
