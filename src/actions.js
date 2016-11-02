/* eslint-disable no-console */

export const ADD_CONCEPT = 'ADD_CONCEPT'
export const LOAD_CONCEPTS = 'LOAD_CONCEPTS'
export const ADD_PROBLEM = 'ADD_PROBLEM'

export const loadConcepts = (concepts) => {
  return {
    type: LOAD_CONCEPTS,
    concepts
  }
}

export const getAllConcepts = () => {
  return dispatch => {
    return fetch('/api/concepts')
      .then( res => res.json())
      .then( concepts => {
        dispatch(loadConcepts(concepts))
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const addConcept = ({conceptDescr, conceptName, relatedConcepts}) => {
  let relationships = relatedConcepts.map(rel => {
    if (rel.relationship === 'precedes') {
      return { root_node: conceptName, other_node: rel.concept, link: 'PRECEDES'}
    } else {
      return { root_node: rel.concept, other_node: conceptName, link: 'PRECEDES'}
    }
  })

  return dispatch => {
    return fetch('/api/concepts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({description: conceptDescr, title: conceptName})
    })
    .then(res => res.json())
    .then(res => {
      console.log(`Added Concept: ${res.title}`)

      fetch('/api/relationships/titles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(relationships)
      })
      .then(res => res.json())
      .then(res => {
        console.log(`Added ${res.length} relationship(s)`)
        dispatch(getAllConcepts())
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const addProblem = ({concept, topic, question, answer}) => {

  return (dispatch, getState) => {

    return fetch('/api/problems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({topic, question, answer})
    })
    .then(res => res.json())
    .then(res => {
      let root_node = res._id
      let other_node
      let concepts = getState().concepts.byId
      for (var prop in concepts) {
        if (concepts[prop].title === concept) {
          other_node = concepts[prop]._id
        }
      }

      let relationship = { root_node, other_node, link: 'TESTS'}

      fetch('api/relationships/ids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([relationship])
      })
      .then(res => res.json())
      .then(() => { console.log('Added to related concept') })
      .catch(err => {
        console.log(err)
      })
    })
  }
}
