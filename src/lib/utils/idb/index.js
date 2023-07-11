class IdbClient {
  static LOG_PREFIX = '[IDB_CLIENT]'
  // make private #db
  // make error handling (the key already exist)

  // create db
  constructor({ name, objStoresConfig, onErrorCb, version }) {
    this.dbName = name
    this.objStoresConfig = objStoresConfig
    this._onErrorCb = onErrorCb || (e => {
      console.error (`${IdbClient.LOG_PREFIX}`, e.target.error)
    })
    this._ver = version || 1
    this._db = null

    // 1 open connection
    // 2 create object store
    // 3 setup error handlers
    // 5 create indexes ???
  }

  get db() {
    return this._db
  }

  set db(db) {
    if (!this._db) {
      this._db = db
    }
  }

  get version() {
    return this._ver
  }

  get onError() {
    return this._onErrorCb
  }

  set onError(cb) {
    this._onErrorCb = cb
  }

  #createObjectStores() {
    return new Promise((resolve, reject) => {
      const arrMap = Array.from(this.objStoresConfig.entries())
      for (let i = 0; i < arrMap.length; i++) {
        const [name, config] = arrMap[i]
        const objStore = this.db.createObjectStore(name, config)
        objStore.transaction.onerror = event => {
          this.onError(event.target.error)
          reject(event)
        }
        objStore.transaction.oncomplete = e => {
          const index = i
          if (index >= arrMap.length - 1) {
            resolve(this.db)
          }
        }
      }
    })
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.dbName, this.version)

      request.onerror = e => {
        this.onError(e)
        reject(e.target.error)
      }

      request.onsuccess = e => {
        console.log(`${IdbClient.LOG_PREFIX} Database's connection opened successfully`)
        this.db = e.target.result
        console.log(this.db)
        resolve(this.db)
      }

      request.onupgradeneeded = e => {
        console.log(`${IdbClient.LOG_PREFIX} Database's connection opened successfully and UPGRADE NEEDED event fired`)
        this.db = e.target.result
        return this.#createObjectStores()
          .then(() => {
            resolve(this.db)
          })
      }
    })
  }
}


export default class IdbManager {
  static LOG_PREFIX = '[IDB_MANAGER]'
  static ERROR_NAMES = {
    CONSTRAINT_ERR: 'ConstraintError',
  }
  static #client = null

  static #getIdbClient() {
    if (this.#client && this.#client.db) {
      return this.#client
    }

    const ts = performance.now()

    const check = (res, rej, _ts) => {
      console.log("check",ts, _ts)
      try {
        if (this.#client && this.#client.db) {
          res(this.#client)
        } else {
          requestAnimationFrame(check.bind(null, res, rej))
        }
      } catch (e) {
        rej(e)
      }
    }

    return new Promise((resolve, reject) => {
      requestAnimationFrame(check.bind(null, resolve, reject))
    })
  }

  static #onConstrainedError(objStoreName, data, keyPath) {
    console.error(
      "%s %s store: %s, data: %O, keyPath: %s",
      this.LOG_PREFIX,
      this.ERROR_NAMES.CONSTRAINT_ERR,
      objStoreName,
      data,
      keyPath
    )
  }

  static async createClient(config) {
    console.log("create indexeddb client")
    if (!this.#client) {
      this.#client = new IdbClient(config)
      try {
        await this.#client.init()
      } catch (e) {
        console.error(`${this.LOG_PREFIX} Error on init client`)
      }
    }
    return this.#client
  }

  static async insert(objStoreName, data) {
    // aray of data handling
    const client = await this.#getIdbClient()
    const trx = client.db.transaction(objStoreName, 'readwrite')
    const store = trx.objectStore(objStoreName)

    const req = store.add(data)

    req.onsuccess = e => {
      console.log(`insertion success store: ${objStoreName}`, e)
    }

    return new Promise((resolve, reject) => {
      trx.oncomplete = e => {
        console.log(`${this.LOG_PREFIX}insertion completed store: ${objStoreName}`, req.result)
        resolve(req.result)
      }
      trx.onerror = e => {
        if (e.target.error.name === this.ERROR_NAMES.CONSTRAINT_ERR) {
          const keyPath = e.target.source.keyPath
          this.#onConstrainedError(objStoreName, data, keyPath)
        }
        reject(e.target.error)
      }
    })
  }

  static get(objStoreName, key) {

  }

  static update(objStoreName, data) {

  }

  static delete(objStoreName, key) {

  }

  static async getAll(objStoreName, options = {}) {
    console.log("getAll", objStoreName, options)
    const { query, count } = options
    const client = await this.#getIdbClient()
    console.log('client', client)
    console.log('client.db', client.db)
    const trx = client.db.transaction(objStoreName, 'readonly')
    const store = trx.objectStore(objStoreName)
    const req = store.getAll(query, count)

    req.onsuccess = e => {
      console.log (`${this.LOG_PREFIX} get all success store: ${objStoreName}`)
    }

    return new Promise((resolve, reject) => {
      trx.onerror = e => {
        reject(e.target.error)
      }
      trx.oncomplete = () => {
        console.log (`${this.LOG_PREFIX} get all completed:`, req.result)
        resolve(req.result)
      }
    })
  }
}
