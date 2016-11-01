/*eslint no-console: 0 */

const neo4j = require('node-neo4j')
const makeApp = require('./app')

const DB_URL = process.env.GRAPHENEDB_URL
const db = new neo4j(DB_URL)

const PORT = process.env.PORT || 1337

const app = makeApp(db);

app.listen(PORT, () => {
  console.log('Listening on ' + PORT)
})
