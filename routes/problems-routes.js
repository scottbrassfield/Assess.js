const Router = require('express').Router;

module.exports = function(db) {
  const router = new Router();

  router.post('/', (req, res) => {
    db.insertNode(req.body, 'Problem', (err, result) => {
      if (err) throw err;
      res.json(result);
    })
  })

  router.get('/', (req, res) => {
    db.readNodesWithLabel('Problem', (err, result) => {
      if (err) throw err
      res.json(result)
    })
  })

  router.get('/node/:node_id', (req, res) => {
    const id = req.params.node_id
    db.readNode(id, (err, result) => {
      if (err) throw err;
      res.json(result)
    })
  })

  router.get('/relationship', (req, res) => {
    console.log(req.query.concept)
    const concept = parseInt(req.query.concept)
    db.cypherQuery("START concept = node({id}) MATCH (concept)<-[:TESTS]-(problem) RETURN problem", {id: concept}, (err, result) => {
      if (err) throw err;
      res.json(result)
    })
  })

  return router;
}
