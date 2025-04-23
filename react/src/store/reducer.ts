import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import snackbarReducer from './snackbarReducer';
import modelReducer from './modelSlice';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    snackbar: snackbarReducer,
    models: modelReducer
});

export default reducer;
