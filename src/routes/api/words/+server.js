// import db from '$lib/server/db/index.js'
// import {json} from '@sveltejs/kit'
// console.log ('db', db)

/** @type {import('../../../../../.svelte-kit/types/src/routes').RequestHandler} */
export function GET(req) {
  // console.log('[GET on /dict]', req)
  console.log('server middleware' , req.url)

  return new Response(String('example'))
}
