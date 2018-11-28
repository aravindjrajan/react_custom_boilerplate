import {
  accountLogout as logout,
  accountLogin as login,
  accountReset as reset,
  accountResetPassword,
} from './account.actions';
import type { PostLoginPayload, PostLoginResponse } from '../../../services/RoRApiProvider';

export const mapStateToProps = state => {
  return {
    accountData: state.account.data,
    accountError: state.account.error,
    accountIsLoading: state.account.isLoading,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    accountLogin(payload: PostLoginPayload) {
      dispatch(login(payload));
    },
    accountLogout() {
      dispatch(logout());
    },
    accountReset() {
      dispatch(reset());
    },
    accountResetPassword(payload: { user: { email: string } }) {
      dispatch(accountResetPassword(payload));
    },
  };
};

export type AccountMapStateToProps = {
  accountData: PostLoginResponse,
  accountDataError: any,
  accountDataIsLoading: boolean,
}

export type AccountMapDispatchToProps = {
  accountLogin: (payload: PostLoginPayload) => void;
  accountLogout: () => void;
  accountReset: () => void;
  accountResetPassword: (payload: { user: { email: string } }) => void;
}

export default {
  mapStateToProps,
  mapDispatchToProps,
};
