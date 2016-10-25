const express = require('express')
const bodyParser = require('body-parser')
const problemsRoutes = require('./problems-routes')

module.exports = function makeApp(db) {

  const app = express()
    .use(express.static('public'))
    .use(bodyParser.json())
    .use('/problems', problemsRoutes(db))

  return app

}
