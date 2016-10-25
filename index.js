const express = require('express')
const neo4j = require('node-neo4j')
const makeApp = require('./app')

const DB_URL = process.env.GRAPHENEDB_URL || 'http://app58406399-TryVsz:YQ32mf5SEv18v65k1520@hobby-gpccabodoeaggbkebocofgol.dbs.graphenedb.com:24789'
const PORT = process.env.PORT || 1337
const db = new neo4j(DB_URL)


const app = makeApp(db);

app.listen(PORT, () => {
  console.log('Listening')
})
