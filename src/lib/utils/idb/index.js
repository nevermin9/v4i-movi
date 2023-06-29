export default class IdbClient {
  static LOG_PREFIX = '[IDB]'
  // make private #db
  // make error handling (the key already exist)

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

  #openConnection() {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.dbName)

      request.onerror = e => {
        this.onError(e.target.error)
        reject(e.target.error)
      }
      resolve(request)
    })
  }

  async init(v = 1) {
    return this.#openConnection()
      .then(request => {
        return new Promise(resolve => {
          // on success
          request.onsuccess = e => {
            console.log(`${IdbClient.LOG_PREFIX} Database's connection opened successfully`)

            if (!this._db) {
              this._db = e.target.result
              resolve(this)
            }
          }

          request.onupgradeneeded = async event => {
            this._db = event.target.result

            const arrMap = Array.from(this.objStoresConfig.entries())
            for (let i = 0; i < arrMap.length; i++) {
              const [name, config] = arrMap[i]
              const objStore = this._db.createObjectStore(name, config)
              objStore.transaction.oncomplete = e => {
                console.log('object store created', name)
                const index = i
                console.log('object store oncomplete index', index)
                if (index >= arrMap.length - 1) {
                  console.log('all object store created')
                  resolve(this)
                }
              }
            }
          }
        })
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
        resolve(this)
      }
      if (Array.isArray(data)) {
        return Promise.allSettled(
          data.map(d => {
            return new Promise((resolve, reject) => {
              const req = transaction.objectStore(objStoreName).add(d)
              req.onerror = e => {
                reject(e.target.error)
              }
              req.onsuccess = () => {
                resolve(this)
              }
            })
          })
        ).then(results => {
            const rejected = results.filter(p => p.status === 'rejected')
            if (rejected.length > 0) {
              reject(rejected[0].reason)
            }
          })
      } else {
        const req = transaction.objectStore(objStoreName).add(data)

        req.onerror = e => {
          console.log("erriror occured", e.target.error)
          // reject(e.target.error)
        }
        req.onsuccess = () => {
          console.log("add single data", data)
          // resolve(this)
        }
      }
    })
  }
}
