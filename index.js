module.exports = (Parent) => class extends Parent {

  update(name, index, next) {

    let prop = this.props
    let current = (prop.state || this.state)[name]
    let state = undefined

    if (index == -1) {
      state = {
        [name]: Object.assign(
          new current.constructor(),
          current,
          next
        )
      }
    }
    else {
      current[index] = Object.assign(
        new current[index].constructor(),
        current[index],
        next
      )
      state = {
        [name]: current
      }
    }

    prop.setState
      ? prop.setState(state)
      : this.setState(state)
  }

  setBoundFunction(name, index = -1) {
    return this.update.bind(this, ...arguments)
  }

  bind(name, index = -1) {
    const state = (this.props.state || this.state)[name]
    return {
      setState: this.setBoundFunction(name, index),
      state: index > -1 ?
        state[index] :
        state
    }
  }
}