import httpClient from '$lib/utils/http-client/index.js'

/** @type {import('./$types').PageLoad} */
export async function load({url}) {
  const search = url.searchParams.get ('search')
  const wordData = httpClient.get(`/words/${search ?? ''}`)
    .then(res => res.json())

  return {
    wordData,
  }
}
