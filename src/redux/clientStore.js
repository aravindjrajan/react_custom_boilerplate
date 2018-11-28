// @flow
import { applyMiddleware, createStore as createReduxStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import { createLogger } from 'redux-logger';
// import { persistStore, persistReducer } from 'redux-persist';
// import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
// import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import makeRootReducer from './reducers';
import credentialsMiddleware from './middleware/credentialsMiddleware';

// const persistConfig = {
//   key: 'root',
//   storage,
//   stateReconciler: autoMergeLevel1,
//   whitelist: [
//     'account', 'accountDetails', 'accountGroups', 'accountFeed', 'accountFollowers', 'accountFollowings',
//     'accountPosts', 'accountProfile', 'listStates',
//   ],
// };

const createClientStore = (initialState) => {
  const middleware = [thunk, credentialsMiddleware];

  // Logger should be the last middleware in chain
  // if (process.env.NODE_ENV === 'development') {
  //   middleware.push(createLogger({
  //     collapsed: true,
  //     diff: true,
  //   }));
  // }

  // const composeMiddlewares = (process.env.NODE_ENV === 'development') ?
  //   composeWithDevTools(applyMiddleware(...middleware)) :
  //   applyMiddleware(...middleware);

  const composeMiddlewares = applyMiddleware(...middleware);

  const store = createReduxStore(persistReducer(persistConfig, makeRootReducer()),
    initialState || {},
    composeMiddlewares,
  );

  const persistor = persistStore(store);

  return { persistor, store };
};

const clientStoreAndPersistor = createClientStore(typeof window !== 'undefined' ? window.__STORE_INITIAL_STATE : {});

export const clientStore = clientStoreAndPersistor.store;
export const clientPersistor = clientStoreAndPersistor.persistor;
export default clientStoreAndPersistor;
