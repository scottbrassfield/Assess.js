const neo4j = require('node-neo4j')

  let db = new neo4j(process.env.GRAPHENEDB_URL)
  console.log(db)

  //Delete all nodes in database
  db.cypherQuery("MATCH (n) DETACH DELETE n", (err, result) => {

    if (err) throw err

    //Create and return concept nodes
    db.cypherQuery("WITH ['data types', 'operators', 'variables', 'expressions', 'functions', 'objects', 'conditionals', 'loops'] AS concepts FOREACH (c IN range(0, length(concepts) - 1) | CREATE (:Concept {id:c, title:concepts[c]}))", (err, result) => {

      if (err) throw err

      //For each concept, create 5 problem nodes and create a "Tests" relationship from the problem to the concept
      db.cypherQuery("MATCH (c:Concept) WITH collect(c) as concepts FOREACH (x in concepts | FOREACH (r in range(0,4) | MERGE (p:Problem {title:'problem'+r, question:'question', answer:'answer'})-[:TESTS]->(x)))", (err, result) => {

        if (err) throw err

        //Connect all concepts except objects
        db.cypherQuery("MATCH (x:Concept {title: 'expressions'}) WITH x MATCH (y) WHERE y.title IN ['data types', 'operators', 'variables'] WITH x,y MERGE (y)-[:PRECEDES]->(x) WITH x MATCH (z) WHERE z.title IN ['functions', 'conditionals', 'loops'] WITH x,z MERGE (x)-[:PRECEDES]->(z) RETURN x,z", (err, result) => {

          if (err) throw err

          //Connect objects to data types
          db.cypherQuery("MATCH (x:Concept {title: 'data types'}) WITH x MATCH (y:Concept {title: 'objects'}) WITH x,y MERGE (x)-[:PRECEDES]-(y)", (err, result) => {
            if (err) throw err
          })
        })
      })
    })
  })
