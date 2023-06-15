export default class IdbClient {
  static LOG_PREFIX = '[IDB]'
  // make private #db

  constructor(dbName, objStoresConfig) {
    this.dbName = dbName
    this.objStoresConfig = objStoresConfig
    this._onErrorCb = e => {
      console.error (`${IdbClient.LOG_PREFIX}`, e)
    }
    this._db = null
  }

  get onError() {
    return this._onErrorCb
  }

  set onError(cb) {
    this._onErrorCb = cb
  }

  async init(v = 1) {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.dbName, v)

      request.onerror = e => {
        this.onError(e.target.error)
        reject(e.target.error)
      }

      request.onsuccess = e => {
        console.log('this db success' ,this._db)
        console.log(`${IdbClient.LOG_PREFIX} Database's connection opened successfully`)

        if (!this._db) {
          this._db = e.target.result
          resolve(this)
        }
      }

      request.onupgradeneeded = async event => {
        this._db = event.target.result
        console.log('this db' ,this._db)
        await Promise.all(
          Array.from(this.objStoresConfig.entries()).map(
            ([name, config]) => {
            return new Promise ((resolve, reject) => {
              console.log('i am creating object store', name)
              const objStore = this._db.createObjectStore (name, config)
              objStore.transaction.oncomplete = e => {
                console.log('object store created', name)
                resolve (this)
              }
            })
          })
        )

        resolve(this)
      }

    })
  }

  insert(objStoreName, data) {
    return new Promise((resolve, reject) => {
      const transaction = this._db.transaction(objStoreName, 'readwrite')
      transaction.onerror = event => {
        console.log(`${IdbClient.LOG_PREFIX} Error on transaction inserting in ${objStoreName}`)
        this.onError(event)
        reject(event)
      }
      transaction.oncomplete = event => {
        console.log(`${IdbClient.LOG_PREFIX} Insertion in ${objStoreName} completed`)
      }
      if (Array.isArray(data)) {
        return Promise.all(
          data.map(d => {
            return new Promise((resolve, reject) => {
              const req = transaction.objectStore(objStoreName).add(d)
              req.onerror = () => {
                reject(this)
              }
              req.onsuccess = () => {
                resolve(this)
              }
            })
          })
        ).then(() => resolve(this)).catch(e => {
          this.onError(e)
          reject(e)
        })
      } else {
        const req = transaction.objectStore(objStoreName).add(data)

        req.onerror = e => {
          console.log("erriror occured", e.target.error)
          reject(e.target.error)
        }
        req.onsuccess = () => {
          console.log("add single data", data)
          resolve(this)
        }
      }
    })
  }
}
