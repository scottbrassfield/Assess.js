/* eslint-disable no-console */

export const ADD_CONCEPT = 'ADD_CONCEPT'
export const LOAD_CONCEPTS = 'LOAD_CONCEPTS'

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
    .then(res => {
      return res.json()
    })
    .then(res => {
      console.log(`Added Concept: ${res.title}`)
      fetch('/api/relationships/titles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(relationships)
      })
      .then(res => {
        return res.json()
      })
      .then(res => {
        console.log(`Added ${res.length} relationships`)
        dispatch(getConcepts())
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const loadConcepts = (concepts) => {
  return {
    type: LOAD_CONCEPTS,
    concepts
  }
}

export const getConcepts = () => {
  return dispatch => {
    return fetch('/api/concepts')
      .then( res => {
        return res.json()
      })
      .then( concepts => {
        dispatch(loadConcepts(concepts))
      })
      .catch(err => {
        console.log(err)
      })
  }
}
