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
}
