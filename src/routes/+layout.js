import {browser} from "$app/environment"
import IdbManager from '$lib/utils/idb'
import {Dictionary, Word} from '$lib/utils/idb/models'

const IDB_VERSION = 1
const IDB_NAME = "v4i-movi"

export async function load() {
  if (browser) {
    await IdbManager.createClient({
      name: IDB_NAME,
      version: IDB_VERSION,
      objStoresConfig: new Map([
        [Word.objectStoreName, Word.objectStoreConfig],
        [Dictionary.objectStoreName, Dictionary.objectStoreConfig],
        ['card', {keyPath: 'name'}],
      ]),
    })
  }

  return {}
}
