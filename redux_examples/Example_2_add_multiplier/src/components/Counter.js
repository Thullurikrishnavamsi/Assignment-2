const React = require('react');
const ReactRedux = require('react-redux');
const _ = require('lodash');

const actionCreators = require('../state/reducer');


/**
 * The Counter component renders a view for a list
 * of tasks.
 */
const Counter = (props) => {
   const onChangeMultiplier = (e) => {
      props.changeMultiplier(parseInt(e.target.value));
   }
   return (
      <div>
    	<h1>{props.counter.n * props.counter.multiplier}</h1>
		  <button onClick={props.incrementCounter}>+</button>
      <button onClick={props.decrementCounter}>-</button>
      <input type="number" value = {props.counter.multiplier}
        onChange={onChangeMultiplier}/>
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
    changeMultiplier: _.flow(actionCreators.changeMultiplier , dispatch),
  })
)(Counter);

module.exports = ConnectedCounter;
