import {browser} from '$app/environment'
import {Word} from "$lib/utils/idb/models/index.js"


/** @type {import('./$types').PageLoad} */
export async function load() {
  let wordList = []

  if (browser) {
    wordList = await Word.getAllSaved()
  }

  return {
    wordList,
  }
}
