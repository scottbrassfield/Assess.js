const request = require('request')
const { expect } = require('chai')
const neo4j = require('node-neo4j')
const makeApp = require('../app')

const TEST_PORT = 3002
const TEST_URI = 'http://localhost:' + TEST_PORT

const TEST_DB_URL = process.env.GRAPHENEDB_URL
const testPost = {problem: 'keyword for a constant'}


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

  describe('POST /problems', () => {
    it('inserts node into database', done => {
      request.post({
        uri: TEST_URI + '/problems',
        json: true,
        body: testPost
      }, (err, res, body) => {
        expect(err).to.be.null
        expect(body).to.have.property('problem')
        done()
      })
    })
  })
})
