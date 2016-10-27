const Router = require('express').Router;

module.exports = function(db) {
  const router = new Router();

  router.post('/', (req, res, next) => {
    db.insertNode(req.body, (err, node) => {
      if (err) throw err;
      res.json(node);
    })
  })

  return router;
}
