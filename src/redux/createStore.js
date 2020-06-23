import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import createSagaMiddle from "redux-saga";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
// import { app } from "firebase";
const sagaMiddleware = createSagaMiddle();

export const middlewares = [thunk, sagaMiddleware, logger];

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middlewares)
    // other store enhancers if any
  )
);
// export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);

export default store;
