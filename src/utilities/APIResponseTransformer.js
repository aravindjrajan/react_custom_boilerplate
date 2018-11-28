// @flow
import {} from 'lodash';
import { AxiosResponse, AxiosError } from 'axios';


export const ROR_ERROR_CODE_INVALID_CREDENTIALS = 'INVALID_CREDENTIALS';
export const ROR_ERROR_CODE_NOT_FOUND = 'NOT_FOUND';
export const ROR_ERROR_CODE_USER_ROLE = 'USER_ROLE';
export const ROR_ERROR_CODE_INVALID_REQUEST = 'INVALID_REQUEST';


class RoRApiResponseTransformer {
  // TODO: camel case response
  static parseResponse(response: AxiosResponse, getFullResponse: boolean = false) {
    const { data } = response;

    if (data.success === false) {
      throw RoRApiResponseTransformer.parseError({ response });
    }

    if (getFullResponse) {
      return data;
    }

    if (data.data) {
      return data.data;
    }

    return data;
  }

  static parseError(error: AxiosError | { response: AxiosResponse }) {
    if (error.__RoRApiResponseTransformerError) {
      return error;
    }

    const { response } = error;
    const defaultCode = 'INTERNAL_SERVER_ERROR';
    const defaultLocalMessage = 'Something went wrong with our server, try again. If the problem persist, contact support.';
    let parsedError: any = new Error();

    if (process.env.NODE_ENV === 'production' && parsedError.stack) {
      delete parsedError.stack;
    }

    if (response) {
      const { data } = response;

      parsedError.httpCode = response.status;
      parsedError.httpText = response.statusText;

      if (response.status === 200 || response.status === 422) {
        parsedError.code = 'VALIDATION_ERRORS';
        parsedError.localMessage = data && data.message ?
          data.message :
          error.message || 'Some of the fields you\'ve submitted are invalid';

      } else if (response.status === 400) {
        parsedError.code = ROR_ERROR_CODE_INVALID_REQUEST;
        parsedError.localMessage = 'Some of the fields you\'ve submitted are invalid';
      } else if (response.status === 401) {
        parsedError.code = ROR_ERROR_CODE_INVALID_CREDENTIALS;
        parsedError.localMessage = 'You must be logged-in to access this content';
      } else if (response.status === 403) {
        parsedError.code = ROR_ERROR_CODE_USER_ROLE;
        parsedError.localMessage = 'You don\'t have enough privileges to access this content';
      } else if (response.status === 404) {
        parsedError.code = ROR_ERROR_CODE_NOT_FOUND;
        parsedError.localMessage = 'Unable to find resource';
      } else {
        parsedError.code = defaultCode;
        parsedError.localMessage = defaultLocalMessage;
      }

      parsedError.serverMessage = data && data.message ? data.message : error.message || '';
    } else {
      parsedError.code = defaultCode;
      parsedError.localMessage = defaultLocalMessage;
      parsedError.serverMessage = error.message || '';
    }

    parsedError.__RoRApiResponseTransformerError = true;

    return parsedError;
  }
}

export default RoRApiResponseTransformer;

