/** @type {import('../../../../.svelte-kit/types/src/routes').PageServerLoad}*/
export async function load() {
  console.log('page server load')
  const data = fetch('http://localhost:3000/api/words', {
    credentials: "include",
    headers: {
      // Accept: 'application/json'
    }
  }).then(res => res.text())
    .catch(
      err => {
        console.info(`%c${err.message}`, 'color: red; font-size: 48px;')
      }
    )

  return {
    res: data,
  }
}
