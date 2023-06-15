import httpClient from '$lib/utils/http-client'

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const wordData = httpClient.get(`/words/${params.word ?? ''}`)
    .then(res => res.json())

  return {
    wordData,
  }
}
