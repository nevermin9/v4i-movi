export async function load() {
  const res = await fetch('https://cat-fact.herokuapp.com/facts')
    .then(r => r.json())

  console.log('res is=', res)
  return {
    facts: res
  }
}
