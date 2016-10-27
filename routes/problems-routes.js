const Router = require('express').Router;

module.exports = function(db) {
  const router = new Router();

  router.post('/', (req, res, next) => {
    db.insertNode(req.body, (err, node) => {
      if (err) throw err;
      res.json(node);
    })
  })

  router.get('/', (req, res, next) => {
    db.readNodesWithLabel('Problem', (err, result) => {
      if (err) throw err
      res.json(result)
    })
  })

  return router;
}
