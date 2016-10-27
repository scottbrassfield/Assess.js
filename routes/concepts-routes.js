const Router = require('express').Router;

module.exports = function(db) {
  const router = new Router();

  router.post('/', (req, res, next) => {
    db.insertNode(req.body, (err, result) => {
      if (err) throw err;
      res.json(result);
    })
  })

  router.get('/', (req, res, next) => {
    db.readNodesWithLabel('Concept', (err, result) => {
      if (err) throw err
      res.json(result)
    })
  })

  router.get('/:node_id', (req, res) => {
    const id = req.params.node_id
    db.readNode(id, (err, result) => {
      if (err) throw err;
      res.json(result)
    })
  })

  return router;
}
