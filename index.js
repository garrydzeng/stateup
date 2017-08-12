
function setState(property, index, state) {

  let data = this.props
  let currentState = (data.state || this.state)[property]
  let nextState = undefined

  if (index == -1) {
    nextState = {
      [property]: Object.assign(
        new currentState.constructor(),
        currentState,
        state
      )
    }
  }
  else {

    const previous = currentState[index]
    
    // replace as newly
    currentState[index] = Object.assign(
      new previous.constructor(),
      previous,
      state
    )

    nextState = {
      [property]: currentState
    }
  }

  data.setState ? 
    data.setState(nextState) :
    this.setState(nextState)
  //
}

module.exports = function(Component) {
  return class StateupComponent extends Component {
    bind(property, index = -1) {
      const props = this.props, state = (props.state || this.state)[property]
      return {
        setState: setState.bind(this, property, index),
        state: index > -1 ?
          state[index] :
          state
        //
      }
    }
  }
}