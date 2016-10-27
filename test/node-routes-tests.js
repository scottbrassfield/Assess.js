const request = require('request')
const { expect } = require('chai')
const neo4j = require('node-neo4j')
const makeApp = require('../app')
const data = require('./test-data')

const TEST_PORT = 3002
const TEST_URI = 'http://localhost:' + TEST_PORT

const TEST_DB_URL = 'http://assess:kLOh9xQLloypT0PbvbOS@hobby-dpmlbgdaojekgbkedmpofgol.dbs.graphenedb.com:24789'

describe('Database Connection', () => {

  let db = new neo4j(TEST_DB_URL)

  before(done => {
    const app = makeApp(db)
    server = app.listen(TEST_PORT, () => {
      done()
    })
  })

  after(done => {
    server.close()
    done()
  })

  beforeEach(done => {
    db.cypherQuery("MATCH (n) DETACH DELETE n", (err, res) => {
      if (err) throw err
    })
    data.seed.forEach(n => {
      db.insertNode(n, (err, node) => {
        if (err) throw err
        console.log(node)
      })
    })
    done()
  })

  describe('POST /problems', () => {
    it('inserts problem node into database', done => {
      request.post({
        uri: TEST_URI + '/problems',
        json: true,
        body: data.postProblem
      }, (err, res, body) => {
        expect(err).to.be.null
        expect(body).to.have.property('question')
        done()
      })
    })
  })

  describe('POST /concepts', () => {
    it('inserts concept node into database', done => {
      request.post({
        uri: TEST_URI + '/concepts',
        json: true,
        body: data.postConcept
      }, (err, res, body) => {
        expect(err).to.be.null
        expect(body).to.have.property('concept')
        done()
      })
    })
  })

  // describe('POST /relationships', () => {
  //   it('inserts relationship between nodes into database', done => {
  //     request.post({
  //       uri: TEST_URI + 'relationships',
  //       json: true,
  //       body: data.postRelationship
  //     }, (err, res, body) => {
  //       expect(err).to.be.null
  //       expect(body).to.have.property('link')
  //       done()
  //     })
  //   })
  // })

})
