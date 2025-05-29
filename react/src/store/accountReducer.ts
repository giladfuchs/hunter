import { LOGIN, LOGOUT } from './actions';
import { initialLoginContextProps } from 'types';

const initialState: initialLoginContextProps = {
    isLoggedIn: false,
    isInitialized: false
};

export interface AccountReducerActionProps {
    type: string;
    payload?: initialLoginContextProps;
}

const accountReducer = (state = initialState, action: AccountReducerActionProps) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                isLoggedIn: true
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isLoggedIn: false
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
