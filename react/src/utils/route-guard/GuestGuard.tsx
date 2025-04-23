import { useNavigate } from 'react-router-dom';

// project imports
import useAuth from 'hooks/useAuth';
import config from 'config';
import { GuardProps } from 'types';
import { useEffect } from 'react';

// ==============================|| GUEST GUARD ||============================== //

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
