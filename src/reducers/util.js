export const loadConcepts = (state = {}, action) => {
  action.concepts.forEach((concept, index) => {
    state[index] = { id:index, ...concept}
  })
  return state
}
