const React = require('react');
const ReactRedux = require('react-redux');
const _ = require('lodash');

const actionCreators = require('../state/reducer');


/**
 * The Counter component renders a view for a list
 * of tasks.
 */
const Counter = (props) => {
    const onIncrementCounter = () => {
      props.onIncrementCounter(props.id);
    }
    const onDecrementCounter = () => {
      props.onDecrementCounter(props.id);
    }
   return (
       <h1>{props.n * props.multiplier}
          <button onClick={onIncrementCounter}>+</button>
          <button onClick={onDecrementCounter}>-</button>
      </h1>
    )
}

const MultiCounter  = (props) => {
   const onChangeMultiplier = (e) => {
      props.changeMultiplier(parseInt(e.target.value));
   }
   const cArray = [];
   for (let i  = 0; i < props.counter.counterArray.length; i++) {
      const currentCounter = props.counter.counterArray[i];
      cArray.push(<Counter key = {currentCounter.id}
                   onIncrementCounter = {props.incrementCounter}
                   onDecrementCounter = {props.decrementCounter}
                   id = {currentCounter.id} n = {currentCounter.n}
                   multiplier = {props.counter.multiplier} />);
    }
    return (
        <div>
           {cArray}
            <input type="number" value = {props.counter.multiplier}
          onChange={onChangeMultiplier}/>
        </div>
    );
}



// Connect Counter component to the Redux store. That is, we will use
// parts of the store to pass props to the Counter component.
const ConnectedMultiCounter = ReactRedux.connect(
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
)(MultiCounter);

module.exports = ConnectedMultiCounter;
