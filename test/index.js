import assert from 'assert'
import TestUtils from 'react-dom/test-utils'
import stateup from '../index'
import ReactDOM from 'react-dom'
import React from 'react'

const {Simulate, scryRenderedDOMComponentsWithTag, renderIntoDocument} = TestUtils

class Toy extends React.PureComponent {
  render() {
    const {state, setState} = this.props
    return (
      <button onClick={() => setState({ label: state.label + "A" })}>
        {state.label}
      </button>
    )
  }
}

class ToyConatiner extends stateup(React.Component) {
  constructor() {
    super(...arguments)
    this.state = {
      item: {
        label: ""
      }
    }
  }
  render() {
    return <Toy {...this.bind('item')} />
  }
}

class ToyArray extends stateup(React.Component) {
  constructor() {
    super(...arguments)
    this.state = {
      item: [
        { label: "B" },
        { label: "" }
      ]
    }
  }
  render() {
    return (
      <div>
        <Toy {...this.bind("item", 0)} />
        <Toy {...this.bind("item", 1)} />
      </div>
    )
  }
}

describe("StateUp Mixin", () => {

  it("Should change textContent to A.", () => {
    const dom = renderIntoDocument(<ToyConatiner />), node = ReactDOM.findDOMNode(dom)
    Simulate.click(node)
    assert.equal('A', node.textContent)
  })

  it("Should bind array.", () => {
    const dom = renderIntoDocument(<ToyArray />), nodes = scryRenderedDOMComponentsWithTag(dom, "button")
    Simulate.click(nodes[1])
    assert.equal("B", nodes[0].textContent)
    assert.equal("A", nodes[1].textContent)
  })
})