const React = require('react');
const ReactRedux = require('react-redux');
const _ = require('lodash');

const actionCreators = require('../state/reducer');


/**
 * The Counter component renders a view for a list
 * of tasks.
 */
const Counter = (props) => {
   // Describes how to render component
   return (
      <div>
    	<h1>{props.counter.n}</h1>
		  <button onClick={props.incrementCounter}>+</button>
       <button onClick={props.decrementCounter}>-</button>
		  </div>
    )
}



// Connect Counter component to the Redux store. That is, we will use
// parts of the store to pass props to the Counter component.
const ConnectedCounter = ReactRedux.connect(
  // Map store state to props
  (state) => ({
    counter: state
  }),
  // Map action dispatchers to props
  // NOTE: _.flow(f, g) returns a function equivalent to g(f(args...))
  (dispatch) => ({
    incrementCounter: _.flow(actionCreators.incrementCounter, dispatch),
    decrementCounter: _.flow(actionCreators.decrementCounter, dispatch),
  })
)(Counter);

module.exports = ConnectedCounter;
