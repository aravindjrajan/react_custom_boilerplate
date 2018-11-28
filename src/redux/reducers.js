// @flow
import { combineReducers } from 'redux';
import { reducer as accountReducer } from './modules/account/account.reducers';

export const makeRootReducer = (asyncReducers: any) => {
  return combineReducers({
    account: accountReducer,
    ...asyncReducers,
  });
};

export const injectReducer = (store: any) => ({ key, reducer }: { key: string, reducer: any }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
