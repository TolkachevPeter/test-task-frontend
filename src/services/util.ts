import axios from 'axios';
import {appConfig} from '../store/config';

export async function apiRequest(method, path, data = {}, extra = {}) {
  const url = appConfig.apiUrl + path;

  const resp = await axios({
    method, url, data,
    withCredentials: true,
    ...extra,
  });

  return resp.data;
}

export async function apiGetRequest(path) {
  return await apiRequest('get', path);
}

export async function apiPostRequest(path, data, extra) {
  return await apiRequest('post', path, data, {
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
    ...extra,
  });
}

export async function apiPostMultipart(path, data) {
  const formData = new FormData();
  for (const key in data) {
    const value = data[key];
    if (value instanceof FileList) {
      for (let idx = 0; idx < value.length; idx++) {
        formData.append(key, value.item(idx));
      }
    } else {
      formData.append(key, value);
    }
  }

  return await apiPostRequest(path, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function testAsyncResponse<M>(data: M): Promise<M> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(data);
    }, 0);
  });
}

export function testResponse(data, key = 'data') {
  return {
    status: 'OK',
    [key]: data,
  };
}

export async function testPostResponse(data, key = 'data', delay = 300) {
  await sleep(delay);
  return {
    status: 'OK',
    [key]: data,
  };
}

export async function testEmptyResponse(delay = 300) {
  return await testPostResponse({}, 'data', delay);
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
