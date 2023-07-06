import IdbManager from '../index.js'

export default class Dictionary {
  static objectStoreName = 'dictionary'
  static objectStoreConfig = {
    keyPath: "name"
  }

  constructor({name, description, words = []}) {
    this.name = name
    this.description = description
    this.words = words
  }

  static create(dict) {
    return IdbManager.insert(Dictionary.objectStoreName, dict)
  }

  static getAllDicts() {
    return IdbManager.getAll(this.objectStoreName)
  }

  static async getAllDictsNames() {
    const dicts = await this.getAllDicts()
    return dicts.map(dict => dict.name)
  }
}
