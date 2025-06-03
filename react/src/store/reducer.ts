import { combineReducers } from 'redux';

import customizationReducer from './customizationReducer';
import modelReducer from './modelSlice';

const reducer = combineReducers({
    customization: customizationReducer,
    models: modelReducer
});

export default reducer;
