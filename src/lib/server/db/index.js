import pg from 'pg'

const port = process.env.PGPORT || 5432

const client = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  port,
  database: 'postgres',
  password: 'weed'
})

async function connectAndQuery() {
  await client.connect()
  const res = await client.query('SELECT $1::text as message', ['Hello world!'])
  console.log(res.rows[0].message) // Hello world!
  await client.end()
}

connectAndQuery()

export default client
