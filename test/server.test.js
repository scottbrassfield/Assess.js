const makeApp = require('../app')
const request = require('request')
const { expect } = require('chai')

const TEST_PORT = 3002
const TEST_URI = 'http://localhost:' + TEST_PORT

describe('Express Server', () => {

  let server

  before(done => {
    const app = makeApp()
    server = app.listen(TEST_PORT, () => {
      done()
    })
  })

  after(done => {
    server.close()
    done()
  })

  describe('Simple GET request', () => {
    it('returns static assets', done => {
      request.get(TEST_URI, (err, res, body) => {
        expect(body).to.exist
        done()
      })
    })
  })
})
