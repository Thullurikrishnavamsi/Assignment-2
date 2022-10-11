const _ = require('lodash');

// The initial state is filled with some dummy data for debugging purposes


// Action type constant for inserting a new task
const INCREMENT = 'counter/increment';
const DECREMENT = 'counter/decrement';

const initialState = {
       n : 0
};

// The reducer function takes the current state and an action, and returns
// the new state after applying the action.
function reducer(state, action) {
  // Defaults for when state/action are not defined
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    case INCREMENT: {
        return {n : state.n + 1};
    }
    case DECREMENT: {
        return {n : state.n - 1};
    }
    // If we don't recognise the action type, just return the store
    // state unchanged
    default: return state;
  }

  throw new Error('Reducer switch statement should always return');
}

// Action creator for incrementing counter
reducer.incrementCounter = () => {
  return { type: INCREMENT } ;
};

// Action creator for decrementing counter
reducer.decrementCounter = () => {
  return { type: DECREMENT } ;
};


// Export the reducer function along with the action creators attached
// to it.
module.exports = reducer;
