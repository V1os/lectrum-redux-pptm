// Core
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';

// Instruments
import rootReducer from 'reducers';
import { saga } from 'sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = [
    (store) => (next) => (action) => {
        next(action);
        localStorage.setItem(
            '__@preloadedState',
            JSON.stringify(store.getState().toJS())
        );
    },
    sagaMiddleware
];
// Environment check
const dev = process.env.NODE_ENV === 'development'; // eslint-disable-line
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = dev && devtools ? devtools : compose;
const logger = createLogger({
    duration:  true,
    collapsed: true,
    diff:      true,
    colors:    {
        title:     () => '#139BFE',
        prevState: () => '#1C5FAF',
        action:    () => '#149945',
        nextState: () => '#A47104',
        error:     () => '#ff0005',
    },
});

if (dev) {
    middleware.push(logger);
}

const preloadedState = localStorage.getItem('__@preloadedState');

// Init store
export default createStore(
    rootReducer,
    fromJS(JSON.parse(preloadedState)) || undefined,
    composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(saga);
