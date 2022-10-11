(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

// ## client.js ##
//
// This is the entrypoint for our application in the *web browser*.
// When the web page is loaded, this code will run in the client's web browser.

var React = require('react');
var ReactDOM = require('react-dom');
var Redux = require('redux');

var reducer = require('./state/reducer');
var Root = require('./components/Root');

// Create a Redux store
var store = Redux.createStore(reducer);

// Mount our React root component in the DOM
var mountPoint = document.getElementById('root');
var rootComponent = React.createElement(Root, { store: store });
ReactDOM.render(rootComponent, mountPoint);

},{"./components/Root":3,"./state/reducer":4,"react":"react","react-dom":"react-dom","redux":"redux"}],2:[function(require,module,exports){
'use strict';

var React = require('react');
var ReactRedux = require('react-redux');
var _ = require('lodash');

var actionCreators = require('../state/reducer');

/**
 * The Counter component renders a view for a list
 * of tasks.
 */
var Counter = function Counter(props) {
  // Describes how to render component
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      props.counter.n
    ),
    React.createElement(
      'button',
      { onClick: props.incrementCounter },
      '+'
    ),
    React.createElement(
      'button',
      { onClick: props.decrementCounter },
      '-'
    )
  );
};

// Connect Counter component to the Redux store. That is, we will use
// parts of the store to pass props to the Counter component.
var ConnectedCounter = ReactRedux.connect(
// Map store state to props
function (state) {
  return {
    counter: state
  };
},
// Map action dispatchers to props
// NOTE: _.flow(f, g) returns a function equivalent to g(f(args...))
function (dispatch) {
  return {
    incrementCounter: _.flow(actionCreators.incrementCounter, dispatch),
    decrementCounter: _.flow(actionCreators.decrementCounter, dispatch)
  };
})(Counter);

module.exports = ConnectedCounter;

},{"../state/reducer":4,"lodash":"lodash","react":"react","react-redux":"react-redux"}],3:[function(require,module,exports){
'use strict';

// ## Root.js ##
//
// This is our top-level React component which contains all of our other
// components in a tree-like hierarchy. This component is mounted into the
// DOM in "client.js".


var React = require('react');
var ReactRedux = require('react-redux');

var Provider = ReactRedux.Provider;
var Counter = require('./Counter');

/**
 * The root React component from which all other components
 * on the page are descended.
 */
var Root = function Root(props) {
  return (
    /* The Provider gives descendants the ability to
    connect to the Redux store */
    React.createElement(
      Provider,
      { store: props.store },
      React.createElement(Counter, null)
    )
  );
};

module.exports = Root;

},{"./Counter":2,"react":"react","react-redux":"react-redux"}],4:[function(require,module,exports){
'use strict';

var _ = require('lodash');

// The initial state is filled with some dummy data for debugging purposes


// Action type constant for inserting a new task
var INCREMENT = 'counter/increment';
var DECREMENT = 'counter/decrement';

var initialState = {
  n: 0
};

// The reducer function takes the current state and an action, and returns
// the new state after applying the action.
function reducer(state, action) {
  // Defaults for when state/action are not defined
  state = state || initialState;
  action = action || {};

  switch (action.type) {
    case INCREMENT:
      {
        return { n: state.n + 1 };
      }
    case DECREMENT:
      {
        return { n: state.n - 1 };
      }
    // If we don't recognise the action type, just return the store
    // state unchanged
    default:
      return state;
  }

  throw new Error('Reducer switch statement should always return');
}

// Action creator for incrementing counter
reducer.incrementCounter = function () {
  return { type: INCREMENT };
};

// Action creator for decrementing counter
reducer.decrementCounter = function () {
  return { type: DECREMENT };
};

// Export the reducer function along with the action creators attached
// to it.
module.exports = reducer;

},{"lodash":"lodash"}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2RlcHMvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9jbGllbnQuanMiLCJzcmMvY29tcG9uZW50cy9Db3VudGVyLmpzIiwic3JjL2NvbXBvbmVudHMvUm9vdC5qcyIsInNyYy9zdGF0ZS9yZWR1Y2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNLFFBQVEsUUFBUSxPQUFSLENBQWQ7QUFDQSxJQUFNLFdBQVcsUUFBUSxXQUFSLENBQWpCO0FBQ0EsSUFBTSxRQUFRLFFBQVEsT0FBUixDQUFkOztBQUVBLElBQU0sVUFBVSxRQUFRLGlCQUFSLENBQWhCO0FBQ0EsSUFBTSxPQUFPLFFBQVEsbUJBQVIsQ0FBYjs7QUFFQTtBQUNBLElBQU0sUUFBUSxNQUFNLFdBQU4sQ0FBa0IsT0FBbEIsQ0FBZDs7QUFFQTtBQUNBLElBQU0sYUFBYSxTQUFTLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBbkI7QUFDQSxJQUFNLGdCQUFnQixvQkFBQyxJQUFELElBQU0sT0FBTyxLQUFiLEdBQXRCO0FBQ0EsU0FBUyxNQUFULENBQWdCLGFBQWhCLEVBQStCLFVBQS9COzs7OztBQ2xCQSxJQUFNLFFBQVEsUUFBUSxPQUFSLENBQWQ7QUFDQSxJQUFNLGFBQWEsUUFBUSxhQUFSLENBQW5CO0FBQ0EsSUFBTSxJQUFJLFFBQVEsUUFBUixDQUFWOztBQUVBLElBQU0saUJBQWlCLFFBQVEsa0JBQVIsQ0FBdkI7O0FBR0E7Ozs7QUFJQSxJQUFNLFVBQVUsU0FBVixPQUFVLENBQUMsS0FBRCxFQUFXO0FBQ3hCO0FBQ0EsU0FDRztBQUFBO0FBQUE7QUFDRDtBQUFBO0FBQUE7QUFBSyxZQUFNLE9BQU4sQ0FBYztBQUFuQixLQURDO0FBRUY7QUFBQTtBQUFBLFFBQVEsU0FBUyxNQUFNLGdCQUF2QjtBQUFBO0FBQUEsS0FGRTtBQUdDO0FBQUE7QUFBQSxRQUFRLFNBQVMsTUFBTSxnQkFBdkI7QUFBQTtBQUFBO0FBSEQsR0FESDtBQU9GLENBVEQ7O0FBYUE7QUFDQTtBQUNBLElBQU0sbUJBQW1CLFdBQVcsT0FBWDtBQUN2QjtBQUNBLFVBQUMsS0FBRDtBQUFBLFNBQVk7QUFDVixhQUFTO0FBREMsR0FBWjtBQUFBLENBRnVCO0FBS3ZCO0FBQ0E7QUFDQSxVQUFDLFFBQUQ7QUFBQSxTQUFlO0FBQ2Isc0JBQWtCLEVBQUUsSUFBRixDQUFPLGVBQWUsZ0JBQXRCLEVBQXdDLFFBQXhDLENBREw7QUFFYixzQkFBa0IsRUFBRSxJQUFGLENBQU8sZUFBZSxnQkFBdEIsRUFBd0MsUUFBeEM7QUFGTCxHQUFmO0FBQUEsQ0FQdUIsRUFXdkIsT0FYdUIsQ0FBekI7O0FBYUEsT0FBTyxPQUFQLEdBQWlCLGdCQUFqQjs7Ozs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsSUFBTSxRQUFRLFFBQVEsT0FBUixDQUFkO0FBQ0EsSUFBTSxhQUFhLFFBQVEsYUFBUixDQUFuQjs7QUFFQSxJQUFNLFdBQVcsV0FBVyxRQUE1QjtBQUNBLElBQU0sVUFBVSxRQUFRLFdBQVIsQ0FBaEI7O0FBRUE7Ozs7QUFJQSxJQUFNLE9BQU8sU0FBUCxJQUFPLENBQUMsS0FBRCxFQUFXO0FBQ3BCO0FBQ0U7O0FBRUE7QUFBQyxjQUFEO0FBQUEsUUFBVSxPQUFPLE1BQU0sS0FBdkI7QUFDRSwwQkFBQyxPQUFEO0FBREY7QUFIRjtBQU9ILENBUkQ7O0FBV0EsT0FBTyxPQUFQLEdBQWlCLElBQWpCOzs7OztBQzVCQSxJQUFNLElBQUksUUFBUSxRQUFSLENBQVY7O0FBRUE7OztBQUdBO0FBQ0EsSUFBTSxZQUFZLG1CQUFsQjtBQUNBLElBQU0sWUFBWSxtQkFBbEI7O0FBRUEsSUFBTSxlQUFlO0FBQ2QsS0FBSTtBQURVLENBQXJCOztBQUlBO0FBQ0E7QUFDQSxTQUFTLE9BQVQsQ0FBaUIsS0FBakIsRUFBd0IsTUFBeEIsRUFBZ0M7QUFDOUI7QUFDQSxVQUFRLFNBQVMsWUFBakI7QUFDQSxXQUFTLFVBQVUsRUFBbkI7O0FBRUEsVUFBTyxPQUFPLElBQWQ7QUFDRSxTQUFLLFNBQUw7QUFBZ0I7QUFDWixlQUFPLEVBQUMsR0FBSSxNQUFNLENBQU4sR0FBVSxDQUFmLEVBQVA7QUFDSDtBQUNELFNBQUssU0FBTDtBQUFnQjtBQUNaLGVBQU8sRUFBQyxHQUFJLE1BQU0sQ0FBTixHQUFVLENBQWYsRUFBUDtBQUNIO0FBQ0Q7QUFDQTtBQUNBO0FBQVMsYUFBTyxLQUFQO0FBVFg7O0FBWUEsUUFBTSxJQUFJLEtBQUosQ0FBVSwrQ0FBVixDQUFOO0FBQ0Q7O0FBRUQ7QUFDQSxRQUFRLGdCQUFSLEdBQTJCLFlBQU07QUFDL0IsU0FBTyxFQUFFLE1BQU0sU0FBUixFQUFQO0FBQ0QsQ0FGRDs7QUFJQTtBQUNBLFFBQVEsZ0JBQVIsR0FBMkIsWUFBTTtBQUMvQixTQUFPLEVBQUUsTUFBTSxTQUFSLEVBQVA7QUFDRCxDQUZEOztBQUtBO0FBQ0E7QUFDQSxPQUFPLE9BQVAsR0FBaUIsT0FBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyAjIyBjbGllbnQuanMgIyNcbi8vXG4vLyBUaGlzIGlzIHRoZSBlbnRyeXBvaW50IGZvciBvdXIgYXBwbGljYXRpb24gaW4gdGhlICp3ZWIgYnJvd3NlciouXG4vLyBXaGVuIHRoZSB3ZWIgcGFnZSBpcyBsb2FkZWQsIHRoaXMgY29kZSB3aWxsIHJ1biBpbiB0aGUgY2xpZW50J3Mgd2ViIGJyb3dzZXIuXG5cbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbmNvbnN0IFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG5jb25zdCBSZWR1eCA9IHJlcXVpcmUoJ3JlZHV4Jyk7XG5cbmNvbnN0IHJlZHVjZXIgPSByZXF1aXJlKCcuL3N0YXRlL3JlZHVjZXInKTtcbmNvbnN0IFJvb3QgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvUm9vdCcpO1xuXG4vLyBDcmVhdGUgYSBSZWR1eCBzdG9yZVxuY29uc3Qgc3RvcmUgPSBSZWR1eC5jcmVhdGVTdG9yZShyZWR1Y2VyKTtcblxuLy8gTW91bnQgb3VyIFJlYWN0IHJvb3QgY29tcG9uZW50IGluIHRoZSBET01cbmNvbnN0IG1vdW50UG9pbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpO1xuY29uc3Qgcm9vdENvbXBvbmVudCA9IDxSb290IHN0b3JlPXtzdG9yZX0gLz47XG5SZWFjdERPTS5yZW5kZXIocm9vdENvbXBvbmVudCwgbW91bnRQb2ludCk7XG4iLCJjb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5jb25zdCBSZWFjdFJlZHV4ID0gcmVxdWlyZSgncmVhY3QtcmVkdXgnKTtcbmNvbnN0IF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcblxuY29uc3QgYWN0aW9uQ3JlYXRvcnMgPSByZXF1aXJlKCcuLi9zdGF0ZS9yZWR1Y2VyJyk7XG5cblxuLyoqXG4gKiBUaGUgQ291bnRlciBjb21wb25lbnQgcmVuZGVycyBhIHZpZXcgZm9yIGEgbGlzdFxuICogb2YgdGFza3MuXG4gKi9cbmNvbnN0IENvdW50ZXIgPSAocHJvcHMpID0+IHtcbiAgIC8vIERlc2NyaWJlcyBob3cgdG8gcmVuZGVyIGNvbXBvbmVudFxuICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgXHQ8aDE+e3Byb3BzLmNvdW50ZXIubn08L2gxPlxuXHRcdCAgPGJ1dHRvbiBvbkNsaWNrPXtwcm9wcy5pbmNyZW1lbnRDb3VudGVyfT4rPC9idXR0b24+XG4gICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtwcm9wcy5kZWNyZW1lbnRDb3VudGVyfT4tPC9idXR0b24+XG5cdFx0ICA8L2Rpdj5cbiAgICApXG59XG5cblxuXG4vLyBDb25uZWN0IENvdW50ZXIgY29tcG9uZW50IHRvIHRoZSBSZWR1eCBzdG9yZS4gVGhhdCBpcywgd2Ugd2lsbCB1c2Vcbi8vIHBhcnRzIG9mIHRoZSBzdG9yZSB0byBwYXNzIHByb3BzIHRvIHRoZSBDb3VudGVyIGNvbXBvbmVudC5cbmNvbnN0IENvbm5lY3RlZENvdW50ZXIgPSBSZWFjdFJlZHV4LmNvbm5lY3QoXG4gIC8vIE1hcCBzdG9yZSBzdGF0ZSB0byBwcm9wc1xuICAoc3RhdGUpID0+ICh7XG4gICAgY291bnRlcjogc3RhdGVcbiAgfSksXG4gIC8vIE1hcCBhY3Rpb24gZGlzcGF0Y2hlcnMgdG8gcHJvcHNcbiAgLy8gTk9URTogXy5mbG93KGYsIGcpIHJldHVybnMgYSBmdW5jdGlvbiBlcXVpdmFsZW50IHRvIGcoZihhcmdzLi4uKSlcbiAgKGRpc3BhdGNoKSA9PiAoe1xuICAgIGluY3JlbWVudENvdW50ZXI6IF8uZmxvdyhhY3Rpb25DcmVhdG9ycy5pbmNyZW1lbnRDb3VudGVyLCBkaXNwYXRjaCksXG4gICAgZGVjcmVtZW50Q291bnRlcjogXy5mbG93KGFjdGlvbkNyZWF0b3JzLmRlY3JlbWVudENvdW50ZXIsIGRpc3BhdGNoKSxcbiAgfSlcbikoQ291bnRlcik7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29ubmVjdGVkQ291bnRlcjtcbiIsIi8vICMjIFJvb3QuanMgIyNcbi8vXG4vLyBUaGlzIGlzIG91ciB0b3AtbGV2ZWwgUmVhY3QgY29tcG9uZW50IHdoaWNoIGNvbnRhaW5zIGFsbCBvZiBvdXIgb3RoZXJcbi8vIGNvbXBvbmVudHMgaW4gYSB0cmVlLWxpa2UgaGllcmFyY2h5LiBUaGlzIGNvbXBvbmVudCBpcyBtb3VudGVkIGludG8gdGhlXG4vLyBET00gaW4gXCJjbGllbnQuanNcIi5cblxuXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5jb25zdCBSZWFjdFJlZHV4ID0gcmVxdWlyZSgncmVhY3QtcmVkdXgnKTtcblxuY29uc3QgUHJvdmlkZXIgPSBSZWFjdFJlZHV4LlByb3ZpZGVyO1xuY29uc3QgQ291bnRlciA9IHJlcXVpcmUoJy4vQ291bnRlcicpO1xuXG4vKipcbiAqIFRoZSByb290IFJlYWN0IGNvbXBvbmVudCBmcm9tIHdoaWNoIGFsbCBvdGhlciBjb21wb25lbnRzXG4gKiBvbiB0aGUgcGFnZSBhcmUgZGVzY2VuZGVkLlxuICovXG5jb25zdCBSb290ID0gKHByb3BzKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIC8qIFRoZSBQcm92aWRlciBnaXZlcyBkZXNjZW5kYW50cyB0aGUgYWJpbGl0eSB0b1xuICAgICAgY29ubmVjdCB0byB0aGUgUmVkdXggc3RvcmUgKi9cbiAgICAgIDxQcm92aWRlciBzdG9yZT17cHJvcHMuc3RvcmV9PlxuICAgICAgICA8Q291bnRlciAvPlxuICAgICAgPC9Qcm92aWRlcj5cbiAgICApO1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gUm9vdDtcbiIsImNvbnN0IF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcblxuLy8gVGhlIGluaXRpYWwgc3RhdGUgaXMgZmlsbGVkIHdpdGggc29tZSBkdW1teSBkYXRhIGZvciBkZWJ1Z2dpbmcgcHVycG9zZXNcblxuXG4vLyBBY3Rpb24gdHlwZSBjb25zdGFudCBmb3IgaW5zZXJ0aW5nIGEgbmV3IHRhc2tcbmNvbnN0IElOQ1JFTUVOVCA9ICdjb3VudGVyL2luY3JlbWVudCc7XG5jb25zdCBERUNSRU1FTlQgPSAnY291bnRlci9kZWNyZW1lbnQnO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gICAgICAgbiA6IDBcbn07XG5cbi8vIFRoZSByZWR1Y2VyIGZ1bmN0aW9uIHRha2VzIHRoZSBjdXJyZW50IHN0YXRlIGFuZCBhbiBhY3Rpb24sIGFuZCByZXR1cm5zXG4vLyB0aGUgbmV3IHN0YXRlIGFmdGVyIGFwcGx5aW5nIHRoZSBhY3Rpb24uXG5mdW5jdGlvbiByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pIHtcbiAgLy8gRGVmYXVsdHMgZm9yIHdoZW4gc3RhdGUvYWN0aW9uIGFyZSBub3QgZGVmaW5lZFxuICBzdGF0ZSA9IHN0YXRlIHx8IGluaXRpYWxTdGF0ZTtcbiAgYWN0aW9uID0gYWN0aW9uIHx8IHt9O1xuXG4gIHN3aXRjaChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgSU5DUkVNRU5UOiB7XG4gICAgICAgIHJldHVybiB7biA6IHN0YXRlLm4gKyAxfTtcbiAgICB9XG4gICAgY2FzZSBERUNSRU1FTlQ6IHtcbiAgICAgICAgcmV0dXJuIHtuIDogc3RhdGUubiAtIDF9O1xuICAgIH1cbiAgICAvLyBJZiB3ZSBkb24ndCByZWNvZ25pc2UgdGhlIGFjdGlvbiB0eXBlLCBqdXN0IHJldHVybiB0aGUgc3RvcmVcbiAgICAvLyBzdGF0ZSB1bmNoYW5nZWRcbiAgICBkZWZhdWx0OiByZXR1cm4gc3RhdGU7XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXIgc3dpdGNoIHN0YXRlbWVudCBzaG91bGQgYWx3YXlzIHJldHVybicpO1xufVxuXG4vLyBBY3Rpb24gY3JlYXRvciBmb3IgaW5jcmVtZW50aW5nIGNvdW50ZXJcbnJlZHVjZXIuaW5jcmVtZW50Q291bnRlciA9ICgpID0+IHtcbiAgcmV0dXJuIHsgdHlwZTogSU5DUkVNRU5UIH0gO1xufTtcblxuLy8gQWN0aW9uIGNyZWF0b3IgZm9yIGRlY3JlbWVudGluZyBjb3VudGVyXG5yZWR1Y2VyLmRlY3JlbWVudENvdW50ZXIgPSAoKSA9PiB7XG4gIHJldHVybiB7IHR5cGU6IERFQ1JFTUVOVCB9IDtcbn07XG5cblxuLy8gRXhwb3J0IHRoZSByZWR1Y2VyIGZ1bmN0aW9uIGFsb25nIHdpdGggdGhlIGFjdGlvbiBjcmVhdG9ycyBhdHRhY2hlZFxuLy8gdG8gaXQuXG5tb2R1bGUuZXhwb3J0cyA9IHJlZHVjZXI7XG4iXX0=
