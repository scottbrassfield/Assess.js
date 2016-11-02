/* eslint-disable no-console */

export const ADD_CONCEPT = 'ADD_CONCEPT'
export const LOAD_CONCEPTS = 'LOAD_CONCEPTS'
export const ADD_PROBLEM = 'ADD_PROBLEM'
export const ADD_CONCEPT_GROUP = 'ADD_CONCEPT_GROUP'
export const START_ASSESSMENT = 'START_ASSESSMENT'
export const END_ASSESSMENT = 'END_ASSESSMENT'
export const CORRECT_ANSWER = 'CORRECT_ANSWER'
export const INCORRECT_ANSWER = 'INCORRECT_ANSWER'
export const UNDERSTOOD_CONCEPT = 'UNDERSTOOD_CONCEPT'
export const DEVELOPING_CONCEPT = 'DEVELOPING_CONCEPT'
export const NEW_CONCEPT = 'NEW_CONCEPT'
export const LOAD_CURRENT_CONCEPT = 'LOAD_CURRENT_CONCEPT'
export const LOAD_CURRENT_PROBLEM = 'LOAD_CURRENT_PROBLEM'
export const UPDATE_CURRENT_CONCEPT = 'UPDATE_CURRENT_CONCEPT'

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

    let precedes = rel.relationship === 'precedes'

    let root_node = precedes ? conceptName : rel.concept
    let other_node = precedes ? rel.concept : conceptName

    return { root_node, other_node, link: 'PRECEDES'}
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

export const startAssessment = () => {

  return dispatch => {

    return fetch('/api/concepts/initial', {
        headers: { 'Content-Type': 'application/json'}
      })
      .then(res => res.json())
      .then(res => {
        dispatch({ type: START_ASSESSMENT })
        dispatch({ type: ADD_CONCEPT_GROUP, concepts: res.data })
        dispatch(setCurrentValues(res.data[0]))
      })
      .catch(err => { console.log(err) })
    }
  }

export const setCurrentValues = (concept) => {

  return dispatch => {

    return fetch('api/problems/relationship?concept=' + concept._id)
      .then(res => res.json())
      .then(res => {
        dispatch({
          type: LOAD_CURRENT_CONCEPT,
          details: concept,
          problems: res.data
        })
        dispatch({
          type: LOAD_CURRENT_PROBLEM,
          details: res.data[0]
        })
      })
      .catch(err => { console.log(err) })
  }
}
