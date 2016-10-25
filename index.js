const express = require('express')
const neo4j = require('node-neo4j')
const makeApp = require('./app')

const DB_URL = process.env.GRAPHENEDB_BOLT_URL || 'http://localhost:7474'
const PORT = process.env.PORT || 1337
const db = new neo4j(DB_URL)


const app = makeApp(db);

app.listen(PORT, () => {
  console.log('Listening')
})
