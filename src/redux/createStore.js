import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import createSagaMiddle from "redux-saga";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
const sagaMiddleware = createSagaMiddle();

export const middlewares = [thunk, sagaMiddleware, logger];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);

export default store;

// import { createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
// import thunk from "redux-thunk";
// import createSagaMiddle from "redux-saga";

// import rootReducer from "./rootReducer";
// import rootSaga from "./rootSaga";

// const sagaMiddleware = createSagaMiddle();
// export const middlewares = [thunk, sagaMiddleware, logger];

// export const store = createStore(rootReducer, applyMiddleware(...middlewares));
// sagaMiddleware.run(rootSaga);

// export default store;
