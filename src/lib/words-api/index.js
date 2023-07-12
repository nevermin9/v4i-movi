import httpClient from '$lib/utils/http-client'

const wordsApi = {
  searchForTheWords: (search, options = {}) => {
    const params = {
      letterPattern: `^${search}`
    }

    return httpClient.get('/words', {...options, params})
      .then(res => res.json())
      .then(json => json.results.data)
      .catch(err => {
        // handle error
        throw err
      })
  }
}

export default wordsApi
