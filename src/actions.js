/* eslint-disable no-console */

export const ADD_CONCEPT = 'ADD_CONCEPT'
export const LOAD_CONCEPTS = 'LOAD_CONCEPTS'
export const ADD_PROBLEM = 'ADD_PROBLEM'
export const NEW_CONCEPT = 'NEW_CONCEPT'
export const START_ASSESSMENT = 'START_ASSESSMENT'
export const END_ASSESSMENT = 'END_ASSESSMENT'
export const UPDATE_CURRENT_PROBLEM = 'UPDATE_CURRENT_PROBLEM'
export const UPDATE_CURRENT_CONCEPT = 'UPDATE_CURRENT_CONCEPT'
export const UPDATE_TESTED_CONCEPTS = 'UPDATE_TESTED_CONCEPTS'
export const UPDATE_TESTED_PROBLEMS = 'UPDATE_TESTED_PROBLEMS'
export const LOAD_CURRENT_CONCEPT = 'LOAD_CURRENT_CONCEPT'
export const LOAD_CURRENT_PROBLEM = 'LOAD_CURRENT_PROBLEM'

export const NEXT_PROBLEM = 'NEXT_PROBLEM'

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
          problem: res.data[0]
        })
      })
      .catch(err => { console.log(err) })
  }
}

export const updateCurrent = (type, value, status) => {

  return dispatch => {

    if (type === 'problem') {

      let updatedProblem = {...value, status}
      console.log(updatedProblem)

      dispatch(updateTested(type, updatedProblem))

    } else if (type === 'concept') {

      dispatch(updateTested(type, status))

    }
  }
}

export const updateTested = (type, value, status) => {

  return dispatch => {

    let updated = {...value, status}

    if (type === 'problem') {

      dispatch({
        type: UPDATE_TESTED_PROBLEMS,
        problem: updated
      })
    }

    else if (type === 'concept') {

      dispatch({
        type: UPDATE_TESTED_CONCEPTS,
        concept: updated
      })
    }
  }
}

export const nextProblem = (concept, nextIndex) => {

  return dispatch => {
    let nextProblem = concept.problems[nextIndex]

    dispatch({
      type: LOAD_CURRENT_PROBLEM,
      problem: nextProblem
    })
  }
}

export const checkAnswer = ({ answer } , problem) => {

  return (dispatch, getState) => {

    let threshold = 60/100
    let concept = getState().assessment.currentConcept
    let problems = concept.problems
    let testedProblems = getState().assessment.tested.problems

    let problemIndex = problems.reduce((initial, prob, i) => {
      return prob._id === problem._id ? initial + i : initial
    }, 0)

    if (answer.toLowerCase() === problem.answer.toLowerCase()) {

      dispatch(updateTested('problem', problem, 'correct'))

      let totalCorrect = countProblems(testedProblems, 'correct')

      if (totalCorrect / problems.length >= threshold) {

        dispatch(updateTested('concept', concept, 'understood'))

        fetch('/api/concepts/relationship/subsequent?concept=' + concept.details._id, {
          headers: {'Content-Type': 'application/json'},
        })
        .then(res => res.json())
        .then(res => {
          console.log(res.data)
          if (res.data.length !== 0) {
            dispatch(setCurrentValues(res.data[0]))
          } else {
            fetch('/api/concepts/relationship/parallel?concept=' + concept.details._id, {
              headers: {'Content-Type': 'application/json'},
            })
            .then(res => res.json())
            .then(res => {
              console.log(res.data);
              if (res.data.length !== 0) {
                dispatch(setCurrentValues(res.data[0]))
              } else {
                dispatch({type: END_ASSESSMENT})
              }
            })
          }
        })
      } else {
        dispatch(nextProblem(concept, problemIndex + 1))
      }
    } else {

      dispatch(updateTested('problem', problem, 'incorrect'))

      let totalIncorrect = countProblems(testedProblems, 'incorrect')

      if (totalIncorrect / problems.length >= (1 - threshold)) {

        dispatch(updateTested('concept', concept, 'developing'))

        fetch('/api/concepts/relationship/preceding?concept=' + concept._id, {
          headers: {'Content-Type': 'application/json'},
        })
        .then(res => res.json())
        .then(res => {

          if (res.data.length !== 0) {

            let testedConcepts = getState().assessment.tested.concepts
            let notTested = res.data.filter((prob) => {
              return testedConcepts.reduce((initial, testedConcept) => {
                return prob._id === testedConcept._id ? initial + 1 : initial
              }, 0)
            })
            dispatch(setCurrentValues(notTested[0]))
          } else {
            fetch('/api/concepts/relationship/parallel?concept=' + concept._id, {
              headers: {'Content-Type': 'application/json'},
            })
            .then(res => res.json())
            .then(res => {
              if (res.data.length !== 0) {
                dispatch(setCurrentValues(res.data[0]))
              } else {
                dispatch({type: END_ASSESSMENT})
              }
            })
          }
        })
      } else {
        dispatch(nextProblem(concept, problemIndex + 1))
      }
    }

    function countProblems(problems, status) {
      return problems.reduce((initial, prob) => {
        return prob.status === status ? ++initial : initial
      }, 0)
    }
  }
}
