import IdbManager from '../index.js'

export default class Word {
  static objectStoreName = "word"
  static objectStoreConfig = {
    keyPath: "word"
  }

  constructor({word, data, dicts = [], cards = []}) {
    this.word = word
    this.data = data
    this.dicts = dicts
    this.cards = cards
  }

  static async save(word) {
    return IdbManager.insert(this.objectStoreName, word)
  }

  static async getAllSaved() {
    return IdbManager.getAll(this.objectStoreName)
  }
}
