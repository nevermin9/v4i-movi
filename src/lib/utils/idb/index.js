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
          console.log(`${IdbClient.LOG_PREFIX} Error on transaction creating ${name} object store`)
          this.onError(event.target.error)
          reject(event)
        }
        objStore.transaction.oncomplete = e => {
          console.log('object store created', name)
          const index = i
          console.log('object store oncomplete index', index)
          if (index >= arrMap.length - 1) {
            console.log('all object store created')
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

  // insert(objStoreName, data) {
  //   return new Promise((resolve, reject) => {
  //     const transaction = this._db.transaction(objStoreName, 'readwrite')
  //     transaction.onerror = event => {
  //       console.log(`${IdbClient.LOG_PREFIX} Error on transaction inserting in ${objStoreName}`)
  //       this.onError(event)
  //       reject(event)
  //     }
  //     transaction.oncomplete = event => {
  //       console.log(`${IdbClient.LOG_PREFIX} Insertion in ${objStoreName} completed`)
  //       resolve(this)
  //     }
  //     if (Array.isArray(data)) {
  //       return Promise.allSettled(
  //         data.map(d => {
  //           return new Promise((resolve, reject) => {
  //             const req = transaction.objectStore(objStoreName).add(d)
  //             req.onerror = e => {
  //               reject(e.target.error)
  //             }
  //             req.onsuccess = () => {
  //               resolve(this)
  //             }
  //           })
  //         })
  //       ).then(results => {
  //           const rejected = results.filter(p => p.status === 'rejected')
  //           if (rejected.length > 0) {
  //             reject(rejected[0].reason)
  //           }
  //         })
  //     } else {
  //       const req = transaction.objectStore(objStoreName).add(data)
  //
  //       req.onerror = e => {
  //         console.log("erriror occured", e.target.error)
  //         // reject(e.target.error)
  //       }
  //       req.onsuccess = () => {
  //         console.log("add single data", data)
  //         // resolve(this)
  //       }
  //     }
  //   })
  // }
}


export default class IdbManager {
  static LOG_PREFIX = '[IDB_MANAGER]'
  static _client = null
  static ERROR_NAMES = {
    CONSTRAINT_ERR: 'ConstraintError',
  }

  static async createClient(config) {
    if (!this._client) {
      this._client = new IdbClient(config)
      try {
        await this._client.init()
      } catch (e) {
        console.error(`${this.LOG_PREFIX} Error on init client`)
      }
    }
    return this._client
  }

  static _onConstrainedError(objStoreName, data, keyPath) {
    console.error(
      "%s %s store: %s, data: %O, keyPath: %s",
      this.LOG_PREFIX,
      this.ERROR_NAMES.CONSTRAINT_ERR,
      objStoreName,
      data,
      keyPath
    )
  }

  static insert(objStoreName, data) {
    const trx = this._client.db.transaction(objStoreName, 'readwrite')
    const store = trx.objectStore(objStoreName)

    const req = store.add(data)

    req.onsuccess = e => {
      console.log(`insertion success store: ${objStoreName}`, e)
    }

    return new Promise((resolve, reject) => {
      trx.oncomplete = e => {
        console.log(`${this.LOG_PREFIX}insertion completed store: ${objStoreName}`, e)
        resolve(e)
      }
      trx.onerror = e => {
        if (e.target.error.name === this.ERROR_NAMES.CONSTRAINT_ERR) {
          const keyPath = e.target.source.keyPath
          this._onConstrainedError(objStoreName, data, keyPath)
        }
        reject(e)
      }
    })
  }

  static get(objStoreName, key) {

  }

  static update(objStoreName, data) {

  }

  static delete(objStoreName, key) {

  }

  // static getAll(objStoreName) {
  //
  // }
}
