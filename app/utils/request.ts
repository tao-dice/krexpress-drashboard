import axios from 'axios';
import store from 'store2';
import merge from 'lodash/merge';

export class ResponseError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
  }
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.data;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new ResponseError(response.statusText);
  error.response = response;
  throw error;
}

export function withAuthenticationHeader(headers = {}) {
  const jwtToken = store.get('jwtToken');
  return merge(headers, {
    Authorization: `Bearer ${jwtToken}`,
  });
}

export const fetcher = async url => {
  try {
    const response = await axios.get(url, { headers: { 'Cache-Control': 'no-cache' } });
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const fetcherWithAuthentication = async url => {
  try {
    const response = await axios.get(url, { headers: withAuthenticationHeader({ 'Cache-Control': 'no-cache' }) });
    return response.data;
  } catch (e) {
    // window.location.replace('/login');
    // console.log('e.response.statusCode', e.response.status);
    // if (e.response.status === 401) {
    //   window.location.replace('/login');
    // } else {
    // return e.response;
    // throw new Error(e);
    return Promise.reject(e.response);
    // }
    //   console.error(e.response);
  }
};


/**
 * Requests a URL, returning a promise
 *
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default async function request(options: any): Promise<any | { err: ResponseError }> {
  const fetchResponse = await axios(options);
  const response = await checkStatus(fetchResponse);
  return parseJSON(response);
}
