// @flow
import { applyMiddleware, createStore as createReduxStore } from 'redux';
import thunk from 'redux-thunk';

import makeRootReducer from './reducers';

const createServerStore = (initialState) => {
  const middleware = [thunk];

  return createReduxStore(
    makeRootReducer(),
    initialState || {},
    applyMiddleware(...middleware)
  );
};

const serverStore = createServerStore();

export default serverStore;
