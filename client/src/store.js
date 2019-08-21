import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { listOrderMiddleware } from "./middleware";

const initialState = {};

const middleware = [thunk, listOrderMiddleware];

const store = createStore(
    rootReducer, 
    initialState, 
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;