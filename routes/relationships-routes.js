const Router = require('express').Router;

module.exports = function(db) {
  const router = new Router();

  router.post('/', ({ body }, res, next) => {
    db.cypherQuery("MATCH (n) RETURN n", (err, res) => {
      if (err) throw err
    })
    db.insertRelationship(body.root_node, body.other_node, body.link, {}, (err, relationship) => {
      if (err) throw err;
      res.json(relationship);
    })
  })

  return router;
}


// db.cypherQuery("MATCH (a),(b) WHERE a._id =" + body.root_node + " AND b._id=" + body.other_node + " CREATE (a)-[r:RELATED_TO]->(b) RETURN r"
