const Router = require('express').Router;

module.exports = function(db) {
  const router = new Router();

  router.post('/', ({ body }, res, next) => {
    db.insertRelationship(body.root_node, body.other_node, body.link, {}, (err, relationship) => {
      if (err) throw err;
      res.json(relationship);
    })
  })

  return router;
}
