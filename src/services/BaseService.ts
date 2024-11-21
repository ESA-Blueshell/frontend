import {AxiosError, type AxiosInstance, type AxiosResponse} from 'axios';
import {Store} from 'vuex';
import store, {type State} from "../plugins/store";
import api from "../plugins/api";
import {$handleNetworkError} from "../plugins/handleNetworkError";
import type Model from "../models/Model";

export default class BaseService {
  protected axios: AxiosInstance = api;
  protected store: Store<State> = store;
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Helper function to get token and attach headers
  protected authHeader() {
    const login = this.store.getters.getLogin;

    if (login) {
      return {headers: {Authorization: `Bearer ${login.token}`}};
    } else {
      return {};
    }
  }

  // Basic GET method with optional ID or action
  protected async get({id, action, params = {}}: {
    id?: number, action?: string, params?: object
  }): Promise<AxiosResponse> {
    let path = this.baseUrl;
    if (id) {
      path += `/${id}`;
    }
    if (action) {
      path += `/${action}`;
    }
    try {
      return await this.axios.get(path, {
        ...params,
        ...this.authHeader(),
      });
    } catch (e) {
      if (e instanceof AxiosError && e.response?.data?.message) {
        store.commit('setStatusSnackbarMessage', e.response.data.message);
      } else {
        $handleNetworkError(e);
      }
      throw e;
    }
  }

  // Basic POST method for creation or actions
  protected async post({model, action, id, params = {}}: {
    model: Model;
    action?: string,
    id?: number;
    params?: object
  }): Promise<AxiosResponse> {
    let path = this.baseUrl;
    if (id) {
      path += `/${id}`;
    }
    if (action) {
      path += `/${action}`;
    }
    try {
      return await this.axios.post(path, model, {
        params,
        ...this.authHeader()
      });
    } catch (e) {
      if (e instanceof AxiosError && e.response?.data?.message) {
        store.commit('setStatusSnackbarMessage', e.response.data.message);
      } else {
        $handleNetworkError(e);
      }
      throw e;
    }
  }

  // Basic PUT method for updates with optional action
  protected async put({model, action, params = {}}: {
    model: Model; action?: string, params?: object
  }): Promise<AxiosResponse> {
    let path = `${this.baseUrl}/${model.id}`;
    if (action) {
      path += `/${action}`;
    }
    try {
      return await this.axios.put(path, model, {
        params,
        ...this.authHeader()
      });
    } catch (e) {
      if (e instanceof AxiosError && e.response?.data) {
        if (e.response?.data?.message) {
          store.commit('setStatusSnackbarMessage', e.response.data.message);
        }  else {
          store.commit('setStatusSnackbarMessage', e.response.data);
        }
      } else {
        $handleNetworkError(e);
      }
      throw e;
    }
  }

  // Basic DELETE method
  public async delete(model: Model): Promise<AxiosResponse> {
    try {
      return await this.axios.delete(`${this.baseUrl}/${model.id}`, this.authHeader());
    } catch (e) {
      if (e instanceof AxiosError && e.response?.data?.message) {
        store.commit('setStatusSnackbarMessage', e.response.data.message);
      } else {
        $handleNetworkError(e);
      }
      throw e;
    }
  }
}
