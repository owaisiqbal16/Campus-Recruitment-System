import {createStore , compose, combineReducers , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/authReducer';
import studentReducer from './reducers/studentReducer';
import companyReducer from './reducers/companyReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    auth : authReducer,
    student : studentReducer,
    company : companyReducer
})

const initializeStore = () => createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default initializeStore;