// @flow
import { createAction } from 'redux-actions';
import {
  ACCOUNT_LOGIN_ERROR,
  ACCOUNT_LOGIN_SUCCESS,
  ACCOUNT_LOGIN_LOADING,
  ACCOUNT_LOGOUT_ERROR,
  ACCOUNT_LOGOUT_LOADING,
  ACCOUNT_LOGOUT_SUCCESS,
  ACCOUNT_RESET_PASSWORD_SUCCESS,
  ACCOUNT_RESET_PASSWORD_LOADING,
  ACCOUNT_RESET_PASSWORD_ERROR,
  ACCOUNT_RESET,
} from './account.constants';
import { getAccountDetails, accountDetailsReset } from '../accountDetails/accountDetails.actions';
import { accountFeedReset } from '../accountFeed/accountFeed.actions';
import { accountFollowersReset } from '../accountFollowers/accountFollowers.actions';
import { accountFollowingsReset } from '../accountFollowings/accountFollowings.actions';
import { accountGroupsReset } from '../accountGroups/accountGroups.actions';
import { accountPostsReset } from '../accountPosts/accountPosts.actions';
import { accountProfileReset } from '../accountProfile/accountProfile.actions';
import { accountProfileUpdateReset } from '../accountProfileUpdate/accountProfileUpdate.actions';
import { instance as rorApiProvider } from '../../../services/RoRApiProvider';
import type { PostLoginPayload } from '../../../services/RoRApiProvider';

export const accountLoginError = createAction(ACCOUNT_LOGIN_ERROR);

export const accountLoginLoading = createAction(ACCOUNT_LOGIN_LOADING);

export const accountLoginSuccess = createAction(ACCOUNT_LOGIN_SUCCESS);

export const accountLogoutError = createAction(ACCOUNT_LOGOUT_ERROR);

export const accountLogoutLoading = createAction(ACCOUNT_LOGOUT_LOADING);

export const accountLogoutSuccess = createAction(ACCOUNT_LOGOUT_SUCCESS);

export const accountResetPasswordSuccess = createAction(ACCOUNT_RESET_PASSWORD_SUCCESS);

export const accountResetPasswordLoading = createAction(ACCOUNT_RESET_PASSWORD_LOADING);

export const accountResetPasswordError = createAction(ACCOUNT_RESET_PASSWORD_ERROR);

export const accountReset = createAction(ACCOUNT_RESET);

export const accountLogin = ({ email, password, rememberMe }: PostLoginPayload) => {
  return async (dispatch: Function) => {
    // TODO: Improve security: should save the token on the react server.
    try {
      dispatch(accountLoginLoading());

      const response = await rorApiProvider.login({ email, password });

      dispatch(accountLoginSuccess(response));
      dispatch(getAccountDetails());
    } catch (error) {
      dispatch(accountLoginError(error));
    }
  };
};

export const accountLogout = () => {
  return async (dispatch: Function) => {
    try {
      dispatch(accountLogoutLoading());

      await rorApiProvider.logout();

      dispatch(accountLogoutSuccess());
      dispatch(accountDetailsReset());
      dispatch(accountFeedReset());
      dispatch(accountFollowersReset());
      dispatch(accountFollowingsReset());
      dispatch(accountGroupsReset());
      dispatch(accountPostsReset());
      dispatch(accountProfileReset());
      dispatch(accountProfileUpdateReset());
    } catch (error) {
      dispatch(accountLogoutError(error));
    }

  };
};

export const accountResetPassword = (payload: { user: { email: string } }) => {
  return async (dispatch: Function) => {
    try {
      dispatch(accountResetPasswordLoading());

      await rorApiProvider.resetPassword(payload);

      dispatch(accountResetPasswordSuccess());
    } catch (error) {
      dispatch(accountResetPasswordError(error));
    }
  };
};
