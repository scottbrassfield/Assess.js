const request = require('request')
const { expect } = require('chai')
const neo4j = require('node-neo4j')
const makeApp = require('../app')
const data = require('./test-data')
const async = require('async')

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
      async.each(data.seed, (node, cb) => {
        db.insertNode(node, node.label, (err, res) => {
          if (err) { cb(err) }
          else { cb() }
        }) }, () => {
          done()
        })
    })
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

  describe('POST /relationships', () => {
    it('inserts relationship between nodes into database', done => {

      let root_node, other_node

      db.cypherQuery("MATCH (n) RETURN n", (err, res) => {
        if (err) throw err
        root_node = res.data[0]._id
        other_node = res.data[1]._id
        request.post({
          uri: TEST_URI + '/relationships',
          json: true,
          body: {root_node: root_node, other_node: other_node, link: 'RELATED_TO' }
        }, (err, res, body) => {
          expect(err).to.be.null
          expect(body).to.have.property('_type', 'RELATED_TO')
          done()
        })
      })
    })
  })

  describe('GET /problems', () => {
    it('retrieves all problem nodes in database', done => {
      request.get(TEST_URI + '/problems', {json: true}, (err, res, body) => {
        expect(err).to.be.null
        expect(body).to.have.length(1)
        done()
      })
    })
  })

  describe('GET /problems by id', () => {
    it('retrieves a problem based on supplied id', done => {
      db.cypherQuery("MATCH (n) RETURN n", (err, res) => {
        if (err) throw err
        node_id = res.data[0]._id
        request.get(TEST_URI + '/problems/' + node_id, {json: true}, (err, res, body) => {
          expect(err).to.be.null
          expect(body).to.have.property('_id', node_id)
          done()
        })
      })
    })
  })

  describe('GET /concepts', () => {
    it('retrieves all concept nodes in database', done => {
      request.get(TEST_URI + '/concepts', {json: true}, (err, res, body) => {
        expect(err).to.be.null
        expect(body).to.have.length(2)
        done()
      })
    })
  })


})
