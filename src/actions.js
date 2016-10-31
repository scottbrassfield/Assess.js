export const ADD_CONCEPT = 'ADD_CONCEPT'
export const LOAD_CONCEPTS = 'LOAD_CONCEPTS'

export const addConcept = ({title, description, related}) => {
  return {
    type: ADD_CONCEPT,
    title,
    description,
    related
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
    return fetch('/concepts')
      .then( res => {
        return res.json()
      })
      .then( concepts => {
        dispatch(loadConcepts(concepts))
      })
  }
}
