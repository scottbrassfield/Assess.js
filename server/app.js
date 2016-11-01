const express = require('express')
const bodyParser = require('body-parser')
const problemsRoutes = require('../routes/problems-routes')
const conceptsRoutes = require('../routes/concepts-routes')
const relationshipsRoutes = require('../routes/relationships-routes')

module.exports = function makeApp(db) {

  const app = express() 
    .use(express.static('dist/public'))
    .use(bodyParser.json())
    .use('/api/problems', problemsRoutes(db))
    .use('/api/concepts', conceptsRoutes(db))
    .use('/api/relationships', relationshipsRoutes(db))

  return app

}
