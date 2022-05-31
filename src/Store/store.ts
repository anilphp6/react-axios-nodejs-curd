import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducers from '../Reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootSaga } from '../Saga';

const sagaMiddleware = createSagaMiddleware();

/* const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

export const store = createStore(
    rootReducers,
    {},
    composeEnhancers(applyMiddleware(sagaMiddleware))
); */

export const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(rootSaga);
