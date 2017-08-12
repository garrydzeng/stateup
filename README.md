# Docs

- [https://segmentfault.com/a/1190000008569588](https://segmentfault.com/a/1190000008569588)
- [https://facebook.github.io/react/docs/lifting-state-up.html](https://facebook.github.io/react/docs/lifting-state-up.html)
- [https://segmentfault.com/a/1190000008592692](https://segmentfault.com/a/1190000008592692)

# Example

```jsx
const stateup = require("stateup")
const React = require("react")
const ReactDOM = require("react-dom")

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

class Toy1 extends stateup(React.Component) {
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

class Toy2 extends stateup(React.Component) {
  constructor() {
    super(...arguments)
    this.state = {
      item: [
        { label: "B" },
        { label: ""  }
      ]
    }
  }
  render() {
    return (
      <div className="list">
        <Toy {...this.bind("item", 0)} />
        <Toy {...this.bind("item", 1)} />
      </div>
    )
  }
}

ReactDOM.render(<Toy1 />, document.getElementById("toy1"))
ReactDOM.render(<Toy2 />, document.getElementById("toy2"))
```
