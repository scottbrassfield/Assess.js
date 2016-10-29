const request = require('request')
const { expect } = require('chai')
const neo4j = require('node-neo4j')
const async = require('async')
const makeApp = require('../app')
const data = require('./test-data')

const TEST_PORT = 3002
const TEST_URI = 'http://localhost:' + TEST_PORT
const TEST_DB = process.env.NEO4J_LOCAL_DB || 'http://localhost:7474'

describe('Database Connection', () => {

  let db = new neo4j(TEST_DB)

  before(done => {
    const app = makeApp(db)
    server = app.listen(TEST_PORT, () => {
      done()
    })
  })

  after(done => {
    db.cypherQuery("MATCH (n) DETACH DELETE n", (err, res) => {
      if (err) throw err
      console.log('clear')
    })
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
        let node_id
        res.data.forEach(node => {
          if (!node_id && node.label === 'Problem') {
            node_id = node._id
          }
        })
        request.get(TEST_URI + '/problems/node/' + node_id, {json: true}, (err, res, body) => {
          expect(err).to.be.null
          expect(body).to.have.property('_id', node_id)
          expect(body).to.have.property('label', 'Problem')
          done()
        })
      })
    })
  })

  describe ('GET /problems related to specific concept', () => {
    it('retrieves all problems related to supplied concept', done => {
      db.cypherQuery("MATCH (n) RETURN n", (err, result) => {
        if (err) throw err;
        let problem_id, concept_id
        result.data.forEach(node => {
          if (!problem_id && node.label === 'Problem') {
            problem_id = node._id
          }
          if (!concept_id && node.label === 'Concept') {
            concept_id = node._id
          }
        })
        db.insertRelationship(problem_id, concept_id, 'RELATED_TO', {}, (err, result) => {
          if (err) throw err;
          const query = {concept: concept_id}
          request.get(TEST_URI + '/problems/relationship', {json: true, qs: query}, (err, res, body) => {
            expect(err).to.be.null
            expect(body.data).to.have.length(1)
            expect(body.data[0]).to.have.property('label', 'Problem')
            done()
          })
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

  describe('GET /concepts by id', () => {
    it('retrieves a concept based on supplied id', done => {
      db.cypherQuery("MATCH (n) RETURN n", (err, res) => {
        if (err) throw err
        let node_id
        res.data.forEach(node => {
          if (!node_id && node.label === 'Concept') {
            node_id = node._id
          }
        })
        request.get(TEST_URI + '/concepts/node/' + node_id, {json: true}, (err, res, body) => {
          expect(err).to.be.null
          expect(body).to.have.property('_id', node_id)
          expect(body).to.have.property('label', 'Concept')
          done()
        })
      })
    })
  })

  describe ('GET /concepts - preceding', () => {
    it('retrieves all concepts that precede a supplied concept', done => {
      db.cypherQuery("MATCH (n) RETURN n", (err, result) => {
        if (err) throw err;
        let root_concept_id, related_concept_id
        result.data.forEach(node => {
          if (!root_concept_id && node.label === 'Concept') {
            root_concept_id = node._id
          }
          if (!related_concept_id && node.label === 'Concept') {
            related_concept_id = node._id
          }
        })
        db.insertRelationship(root_concept_id, related_concept_id, 'RELATED_TO', {}, (err, result) => {
          if (err) throw err;
          const query = {concept: root_concept_id}
          request.get(TEST_URI + '/concepts/relationship/preceding', {json: true, qs: query}, (err, res, body) => {
            expect(err).to.be.null
            expect(body.data).to.have.length(1)
            expect(body.data[0]).to.have.property('label', 'Concept')
            expect(body.data[0]).to.have.property('_id', result._start)
            done()
          })
        })
      })
    })
  })

  describe ('GET /concepts - subsequent', () => {
    it('retrieves all concepts that are subsequent to a supplied concept', done => {
      db.cypherQuery("MATCH (n) RETURN n", (err, result) => {
        if (err) throw err;
        let root_concept_id, related_concept_id
        result.data.forEach(node => {
          if (!root_concept_id && node.label === 'Concept') {
            root_concept_id = node._id
          }
          if (!related_concept_id && node.label === 'Concept') {
            related_concept_id = node._id
          }
        })
        db.insertRelationship(root_concept_id, related_concept_id, 'RELATED_TO', {}, (err, result) => {
          if (err) throw err;
          const query = {concept: root_concept_id}
          request.get(TEST_URI + '/concepts/relationship/subsequent', {json: true, qs: query}, (err, res, body) => {
            expect(err).to.be.null
            expect(body.data).to.have.length(1)
            expect(body.data[0]).to.have.property('label', 'Concept')
            expect(body.data[0]).to.have.property('_id', result._end)
            done()
          })
        })
      })
    })
  })

})
