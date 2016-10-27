const express = require('express')
const bodyParser = require('body-parser')
const problemsRoutes = require('./routes/problems-routes')
const conceptsRoutes = require('./routes/concepts-routes')
const relationshipsRoutes = require('./routes/relationships-routes')

module.exports = function makeApp(db) {

  const app = express()
    .use(express.static('public'))
    .use(bodyParser.json())
    .use('/problems', problemsRoutes(db))
    .use('/concepts', conceptsRoutes(db))
    .use('/relationships', relationshipsRoutes(db))

  return app

}
