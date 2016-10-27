const Router = require('express').Router;

module.exports = function(db) {
  const router = new Router();

  router.post('/', (req, res, next) => {
    db.insertRelationship(req.body.root_node, req.body.other_node, 'RELATIONSHIP_TYPE', {
      link: req.body.link
    }, (err, relationship) => {
      if (err) throw err;
      res.json(relationship);
    })
  })

  return router;
}
