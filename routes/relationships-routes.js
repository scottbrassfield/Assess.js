const Router = require('express').Router;
const async = require('async')

module.exports = function(db) {
  const router = new Router();

  router.post('/titles', ({ body }, res) => {
    let relationships = []

    async.each(body, ({ root_node, other_node, link }, cb) => {

      db.cypherQuery(`MATCH (n {title: {root_node}}) RETURN n`, { root_node }, (err, result) => {
        if (err) throw err
        let root_node_id = result.data[0]._id

        db.cypherQuery(`MATCH (n {title: {other_node}}) RETURN n`, { other_node }, (err, result) => {
          if (err) throw err
          let other_node_id = result.data[0]._id

          db.insertRelationship(root_node_id, other_node_id, link, {}, (err, relationship) => {
            if (err) {
              cb(err)
            } else {
              relationships.push(relationship)
              cb()
            }
          })
        })
      })
    }, (err) => {
      if (err) throw err
      res.json(relationships)
    })
  })

  router.post('/ids', ({ body }, res) => {
    let relationships = []
    async.each(body, (rel, cb) => {

      db.insertRelationship(rel.root_node, rel.other_node, rel.link, {}, (err, relationship) => {
        if (err) { cb(err) }
        else {
          relationships.push(relationship)
          cb()
        }
      })
    }, (err) => {
      if (err) throw err
      res.json(relationships)
    })
  })

  return router;
}
