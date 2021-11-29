import {config as conf} from './config';

class ApiService {

  rootPath!: string;
  conf:any;

  constructor() {
    this._init();
  }

  async get(key:any, params:any={}, config={}, useCache=true, isJson=true) {
    const endpoint  = this.conf.endpoints[key];

    let sessionKey = this.conf.sessionPrefix ? this.conf.sessionPrefix  + '-' : '';
    sessionKey += params.id ? key + '-' + params.id : key;

    const inSession  = endpoint.isCached && useCache && this._getSession(sessionKey);
    if (inSession) {
      return inSession;
    }

    const path   = this._endpointPath(endpoint, params);
    const result = await fetch(path, { method: 'GET', ...config});
 
    if (result.status > 200) {
      console.error('Api call returned an error', result);
      throw result;
    }
    const value  = isJson ? result.json() : result;
    
    if (endpoint.isCached) {
      this._setSession(sessionKey, value);
    }
    return value;
  }

  async post(key:any, params={}, body:any, config:any) {
    const endpoint  = this.conf.endpoints[key];

    const path   = this._endpointPath(endpoint, params);
    const result = await fetch(path, { method: 'POST', body, ...config});

    return result.json();
  }

  async put(key:any, params={}, body:any, config:any) {
    const endpoint  = this.conf.endpoints[key];

    const path   = this._endpointPath(endpoint, params);
    const result = await fetch(path, { method: 'PUT', body, ...config});

    return result.json();
  }

  async delete(key:any, params={}) {
    const endpoint  = this.conf.endpoints[key];

    const path   = this._endpointPath(endpoint, params);
    const result = await fetch(path, { method: 'DELETE'});

    return result.json();
  }

  _init() {
    this.conf = conf;
    this.rootPath = conf.apiUrl.replace(new RegExp('/$'), '');
    if (!this.rootPath) {
      console.error('Unable to set the API root path', process.env);
    }
  }

  _endpointPath(endpoint:any, params:any) {
    const paramsKeys  = Object.keys(params);
    const queryParams:Array<string> = [];
    let   path        = endpoint.path;

    paramsKeys.forEach(key => {
      const value  = params[key];
      const regExp = new RegExp(':' + key + '?(?=/|$)');

      if (regExp.test(path) && value) {
        path = path.replace(regExp, value);

      } else if (regExp.test(path)) {
        const regExpWithSlash = new RegExp('/:' + key + '?(?=/|$)');
        path = path.replace(regExpWithSlash, '');
        
      } else {
        queryParams.push(key + '=' + value);
      }
    });

    let finalPath = this.rootPath + '/' + path;
    if (queryParams.length) {
      finalPath += '?' + queryParams.join('&');
    }

    return finalPath;
  }

  _getSession(key:any) {
    const encoded = sessionStorage.getItem(key) || false;
    return encoded && JSON.parse(encoded);
  }

  _setSession(key:any, value:any) {
    const encoded = JSON.stringify(value);
    return sessionStorage.setItem(key, encoded);
  }
}

const apiService = new ApiService();
export default apiService;