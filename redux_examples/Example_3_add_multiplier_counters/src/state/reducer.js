const _ = require('lodash');

// The initial state is filled with some dummy data for debugging purposes
const initialState = {
       counterArray : [{id: 0, n: 10},{id : 1, n: 20}, {id: 2, n : 30}],
       multiplier : 1
};

// Action type constant for inserting a new task
const INCREMENT = 'counter/increment';
const DECREMENT = 'counter/decrement';
const CHANGEMULTIPLIER = 'counter/changemultiplier';

// The reducer function takes the current state and an action, and returns
// the new state after applying the action.
function reducer(state, action) {
  // Defaults for when state/action are not defined
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    case INCREMENT: {
        const counterIndex = _.findIndex(state.counterArray, {id: action.id});
        const oldCounter = state.counterArray[counterIndex];
        const counter = _.assign({}, oldCounter, {n: oldCounter.n + 1});
        const counterArray = _.assign([], state.counterArray, {[counterIndex]: counter});
        const newState = _.assign({}, state, {counterArray});
        return newState;
    }
   case DECREMENT: {
       const counterIndex = _.findIndex(state.counterArray, {id: action.id});
        const oldCounter = state.counterArray[counterIndex];
        const counter = _.assign({}, oldCounter, {n: oldCounter.n - 1});
        const counterArray = _.assign([], state.counterArray, {[counterIndex]: counter});
        const newState = _.assign({}, state, {counterArray});
        return newState;
    }
    case CHANGEMULTIPLIER : {
        return {counterArray : state.counterArray, multiplier : action.multiplier}
    }
        // If we don't recognise the action type, just return the store
    // state unchanged
    default: return state;
  }

  throw new Error('Reducer switch statement should always return');
}

// Action creator for incrementing counter
reducer.incrementCounter = (n) => {
  return { type: INCREMENT, id : n  };
};

// Action creator for decrementing counter
reducer.decrementCounter = (n) => {
  return { type: DECREMENT, id : n  };
};


reducer.changeMultiplier = (m) => {
  return { type: CHANGEMULTIPLIER, multiplier : m};
};


// Export the reducer function along with the action creators attached
// to it.
module.exports = reducer;
