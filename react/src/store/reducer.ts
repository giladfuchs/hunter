import { combineReducers } from 'redux';

import customizationReducer from './customizationReducer';
import modelReducer from './modelSlice';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    models: modelReducer
});

export default reducer;
