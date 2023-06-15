import HTTPResponseError from './HTTPResponseError';
// const url = 'https://wordsapiv1.p.rapidapi.com/words/hatchback/typeOf';
const options = {
  headers: {
    'X-RapidAPI-Key': '922985cebdmsh116899822948343p1a8c90jsn3e3039ef24b3',
    'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
  }
};

class HttpClient {
  static LOG_PREFIX = '[HttpClient]'

  constructor(baseUrl, options) {
    this.baseUrl = baseUrl;
    this.options = options;
    this.onErrorHandler = options.onErrorHandler || (() => {
    });
  }

  async get(url, options = {}) {
    const queries = options.params ?
      Object.keys (options.params).map (key => `${key}=${encodeURIComponent (options.params[key])}`)
        .join ('&')
      : '';
    const link = `${this.baseUrl}${url}?${queries}`
    console.log('link', link)

    try {
      const res =  await fetch (link, {
        ...this.options,
        ...options,
      })

      if (!res.ok) {
        throw new HTTPResponseError (res);
      }

      return res
    } catch (error) {
      this.onErrorHandler (error)
      // if (isDev) {

        console.error (`${HttpClient.LOG_PREFIX}`, error)
      // }
      throw error;
    }
  }
}

export default new HttpClient ('https://wordsapiv1.p.rapidapi.com', options);
