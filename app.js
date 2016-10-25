const express = require('express')
const bodyParser = require('body-parser')

module.exports = function makeApp() {

  const app = express()
    .use(express.static('public'))
    .use(bodyParser.json())

  return app

}
