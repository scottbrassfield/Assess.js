const express = require('express')
const neo4j = require('neo4j')
const makeApp = require('./app')

const DB_URL = process.env.GRAPHENEDB_BOLT_URL || 'http://localhost:7474'
const PORT = process.env.PORT || 1337

const app = makeApp();

app.listen(PORT, () => {
  console.log('Listening')
})
