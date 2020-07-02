import request from 'superagent';

const backendBaseUrl = process.env.REACT_APP_API_BASE_URL || '';

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

class Client {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async request(
    method: Method,
    endpoint: string,
    data: Record<string, unknown> | null = null,
  ) {
    const agent = request.agent();

    const url = /^https?:\/\//.test(endpoint)
      ? endpoint
      : [this.baseUrl, endpoint].join('');
    let promise = agent[method](url);

    if (['post', 'put', 'patch'].includes(method) && data) {
      promise = promise.send(data);
    }

    const { body } = await promise;
    return body;
  }

  async fetch(endpoint: string) {
    return this.request('get', endpoint);
  }
}

const client = new Client(backendBaseUrl);

export default client;
