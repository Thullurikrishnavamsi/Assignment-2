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
  var onChangeMultiplier = function onChangeMultiplier(e) {
    props.changeMultiplier(parseInt(e.target.value));
  };
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      props.counter.n * props.counter.multiplier
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
    ),
    React.createElement('input', { type: 'number', value: props.counter.multiplier,
      onChange: onChangeMultiplier })
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
    decrementCounter: _.flow(actionCreators.decrementCounter, dispatch),
    changeMultiplier: _.flow(actionCreators.changeMultiplier, dispatch)
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
var initialState = {
  n: 0,
  multiplier: 1
};

// Action type constant for inserting a new task
var INCREMENT = 'counter/increment';
var DECREMENT = 'counter/decrement';
var CHANGEMULTIPLIER = 'counter/changemultiplier';

function reducer(state, action) {
  // Defaults for when state/action are not defined
  state = state || initialState;
  action = action || {};
  switch (action.type) {
    case INCREMENT:
      {
        return { n: state.n + 1, multiplier: state.multiplier };
      }
    case DECREMENT:
      {
        return { n: state.n - 1, multiplier: state.multiplier };
      }
    case CHANGEMULTIPLIER:
      {
        return { n: state.n, multiplier: action.multiplier };
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

reducer.changeMultiplier = function (m) {
  return { type: CHANGEMULTIPLIER, multiplier: m };
};

// Export the reducer function along with the action creators attached
// to it.
module.exports = reducer;

},{"lodash":"lodash"}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2RlcHMvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9jbGllbnQuanMiLCJzcmMvY29tcG9uZW50cy9Db3VudGVyLmpzIiwic3JjL2NvbXBvbmVudHMvUm9vdC5qcyIsInNyYy9zdGF0ZS9yZWR1Y2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNLFFBQVEsUUFBUSxPQUFSLENBQWQ7QUFDQSxJQUFNLFdBQVcsUUFBUSxXQUFSLENBQWpCO0FBQ0EsSUFBTSxRQUFRLFFBQVEsT0FBUixDQUFkOztBQUVBLElBQU0sVUFBVSxRQUFRLGlCQUFSLENBQWhCO0FBQ0EsSUFBTSxPQUFPLFFBQVEsbUJBQVIsQ0FBYjs7QUFFQTtBQUNBLElBQU0sUUFBUSxNQUFNLFdBQU4sQ0FBa0IsT0FBbEIsQ0FBZDs7QUFFQTtBQUNBLElBQU0sYUFBYSxTQUFTLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBbkI7QUFDQSxJQUFNLGdCQUFnQixvQkFBQyxJQUFELElBQU0sT0FBTyxLQUFiLEdBQXRCO0FBQ0EsU0FBUyxNQUFULENBQWdCLGFBQWhCLEVBQStCLFVBQS9COzs7OztBQ2xCQSxJQUFNLFFBQVEsUUFBUSxPQUFSLENBQWQ7QUFDQSxJQUFNLGFBQWEsUUFBUSxhQUFSLENBQW5CO0FBQ0EsSUFBTSxJQUFJLFFBQVEsUUFBUixDQUFWOztBQUVBLElBQU0saUJBQWlCLFFBQVEsa0JBQVIsQ0FBdkI7O0FBR0E7Ozs7QUFJQSxJQUFNLFVBQVUsU0FBVixPQUFVLENBQUMsS0FBRCxFQUFXO0FBQ3hCLE1BQU0scUJBQXFCLFNBQXJCLGtCQUFxQixDQUFDLENBQUQsRUFBTztBQUMvQixVQUFNLGdCQUFOLENBQXVCLFNBQVMsRUFBRSxNQUFGLENBQVMsS0FBbEIsQ0FBdkI7QUFDRixHQUZEO0FBR0EsU0FDRztBQUFBO0FBQUE7QUFDRDtBQUFBO0FBQUE7QUFBSyxZQUFNLE9BQU4sQ0FBYyxDQUFkLEdBQWtCLE1BQU0sT0FBTixDQUFjO0FBQXJDLEtBREM7QUFFRjtBQUFBO0FBQUEsUUFBUSxTQUFTLE1BQU0sZ0JBQXZCO0FBQUE7QUFBQSxLQUZFO0FBR0E7QUFBQTtBQUFBLFFBQVEsU0FBUyxNQUFNLGdCQUF2QjtBQUFBO0FBQUEsS0FIQTtBQUlBLG1DQUFPLE1BQUssUUFBWixFQUFxQixPQUFTLE1BQU0sT0FBTixDQUFjLFVBQTVDO0FBQ0UsZ0JBQVUsa0JBRFo7QUFKQSxHQURIO0FBU0YsQ0FiRDs7QUFpQkE7QUFDQTtBQUNBLElBQU0sbUJBQW1CLFdBQVcsT0FBWDtBQUN2QjtBQUNBLFVBQUMsS0FBRDtBQUFBLFNBQVk7QUFDVixhQUFTO0FBREMsR0FBWjtBQUFBLENBRnVCO0FBS3ZCO0FBQ0E7QUFDQSxVQUFDLFFBQUQ7QUFBQSxTQUFlO0FBQ2Isc0JBQWtCLEVBQUUsSUFBRixDQUFPLGVBQWUsZ0JBQXRCLEVBQXdDLFFBQXhDLENBREw7QUFFYixzQkFBa0IsRUFBRSxJQUFGLENBQU8sZUFBZSxnQkFBdEIsRUFBd0MsUUFBeEMsQ0FGTDtBQUdiLHNCQUFrQixFQUFFLElBQUYsQ0FBTyxlQUFlLGdCQUF0QixFQUF5QyxRQUF6QztBQUhMLEdBQWY7QUFBQSxDQVB1QixFQVl2QixPQVp1QixDQUF6Qjs7QUFjQSxPQUFPLE9BQVAsR0FBaUIsZ0JBQWpCOzs7OztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxJQUFNLFFBQVEsUUFBUSxPQUFSLENBQWQ7QUFDQSxJQUFNLGFBQWEsUUFBUSxhQUFSLENBQW5COztBQUVBLElBQU0sV0FBVyxXQUFXLFFBQTVCO0FBQ0EsSUFBTSxVQUFVLFFBQVEsV0FBUixDQUFoQjs7QUFFQTs7OztBQUlBLElBQU0sT0FBTyxTQUFQLElBQU8sQ0FBQyxLQUFELEVBQVc7QUFDcEI7QUFDRTs7QUFFQTtBQUFDLGNBQUQ7QUFBQSxRQUFVLE9BQU8sTUFBTSxLQUF2QjtBQUNFLDBCQUFDLE9BQUQ7QUFERjtBQUhGO0FBT0gsQ0FSRDs7QUFXQSxPQUFPLE9BQVAsR0FBaUIsSUFBakI7Ozs7O0FDNUJBLElBQU0sSUFBSSxRQUFRLFFBQVIsQ0FBVjs7QUFFQTtBQUNBLElBQU0sZUFBZTtBQUNkLEtBQUksQ0FEVTtBQUVkLGNBQWE7QUFGQyxDQUFyQjs7QUFLQTtBQUNBLElBQU0sWUFBWSxtQkFBbEI7QUFDQSxJQUFNLFlBQVksbUJBQWxCO0FBQ0EsSUFBTSxtQkFBbUIsMEJBQXpCOztBQUVBLFNBQVMsT0FBVCxDQUFpQixLQUFqQixFQUF3QixNQUF4QixFQUFnQztBQUM5QjtBQUNBLFVBQVEsU0FBUyxZQUFqQjtBQUNBLFdBQVMsVUFBVSxFQUFuQjtBQUNBLFVBQU8sT0FBTyxJQUFkO0FBQ0UsU0FBSyxTQUFMO0FBQWdCO0FBQ1osZUFBTyxFQUFDLEdBQUksTUFBTSxDQUFOLEdBQVUsQ0FBZixFQUFrQixZQUFhLE1BQU0sVUFBckMsRUFBUDtBQUNIO0FBQ0QsU0FBSyxTQUFMO0FBQWdCO0FBQ1osZUFBTyxFQUFDLEdBQUssTUFBTSxDQUFOLEdBQVUsQ0FBaEIsRUFBb0IsWUFBYSxNQUFNLFVBQXZDLEVBQVA7QUFDSDtBQUNELFNBQUssZ0JBQUw7QUFBd0I7QUFDbkIsZUFBTyxFQUFDLEdBQUksTUFBTSxDQUFYLEVBQWMsWUFBYSxPQUFPLFVBQWxDLEVBQVA7QUFDSjtBQUNHO0FBQ0o7QUFDQTtBQUFTLGFBQU8sS0FBUDtBQVpYOztBQWVBLFFBQU0sSUFBSSxLQUFKLENBQVUsK0NBQVYsQ0FBTjtBQUNEOztBQUVEO0FBQ0EsUUFBUSxnQkFBUixHQUEyQixZQUFNO0FBQy9CLFNBQU8sRUFBRSxNQUFNLFNBQVIsRUFBUDtBQUNELENBRkQ7O0FBSUE7QUFDQSxRQUFRLGdCQUFSLEdBQTJCLFlBQU07QUFDL0IsU0FBTyxFQUFFLE1BQU0sU0FBUixFQUFQO0FBQ0QsQ0FGRDs7QUFJQSxRQUFRLGdCQUFSLEdBQTJCLFVBQUMsQ0FBRCxFQUFPO0FBQ2hDLFNBQU8sRUFBRSxNQUFNLGdCQUFSLEVBQTBCLFlBQWEsQ0FBdkMsRUFBUDtBQUNELENBRkQ7O0FBS0E7QUFDQTtBQUNBLE9BQU8sT0FBUCxHQUFpQixPQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vICMjIGNsaWVudC5qcyAjI1xuLy9cbi8vIFRoaXMgaXMgdGhlIGVudHJ5cG9pbnQgZm9yIG91ciBhcHBsaWNhdGlvbiBpbiB0aGUgKndlYiBicm93c2VyKi5cbi8vIFdoZW4gdGhlIHdlYiBwYWdlIGlzIGxvYWRlZCwgdGhpcyBjb2RlIHdpbGwgcnVuIGluIHRoZSBjbGllbnQncyB3ZWIgYnJvd3Nlci5cblxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuY29uc3QgUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcbmNvbnN0IFJlZHV4ID0gcmVxdWlyZSgncmVkdXgnKTtcblxuY29uc3QgcmVkdWNlciA9IHJlcXVpcmUoJy4vc3RhdGUvcmVkdWNlcicpO1xuY29uc3QgUm9vdCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9Sb290Jyk7XG5cbi8vIENyZWF0ZSBhIFJlZHV4IHN0b3JlXG5jb25zdCBzdG9yZSA9IFJlZHV4LmNyZWF0ZVN0b3JlKHJlZHVjZXIpO1xuXG4vLyBNb3VudCBvdXIgUmVhY3Qgcm9vdCBjb21wb25lbnQgaW4gdGhlIERPTVxuY29uc3QgbW91bnRQb2ludCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290Jyk7XG5jb25zdCByb290Q29tcG9uZW50ID0gPFJvb3Qgc3RvcmU9e3N0b3JlfSAvPjtcblJlYWN0RE9NLnJlbmRlcihyb290Q29tcG9uZW50LCBtb3VudFBvaW50KTtcbiIsImNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbmNvbnN0IFJlYWN0UmVkdXggPSByZXF1aXJlKCdyZWFjdC1yZWR1eCcpO1xuY29uc3QgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuXG5jb25zdCBhY3Rpb25DcmVhdG9ycyA9IHJlcXVpcmUoJy4uL3N0YXRlL3JlZHVjZXInKTtcblxuXG4vKipcbiAqIFRoZSBDb3VudGVyIGNvbXBvbmVudCByZW5kZXJzIGEgdmlldyBmb3IgYSBsaXN0XG4gKiBvZiB0YXNrcy5cbiAqL1xuY29uc3QgQ291bnRlciA9IChwcm9wcykgPT4ge1xuICAgY29uc3Qgb25DaGFuZ2VNdWx0aXBsaWVyID0gKGUpID0+IHtcbiAgICAgIHByb3BzLmNoYW5nZU11bHRpcGxpZXIocGFyc2VJbnQoZS50YXJnZXQudmFsdWUpKTtcbiAgIH1cbiAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgIFx0PGgxPntwcm9wcy5jb3VudGVyLm4gKiBwcm9wcy5jb3VudGVyLm11bHRpcGxpZXJ9PC9oMT5cblx0XHQgIDxidXR0b24gb25DbGljaz17cHJvcHMuaW5jcmVtZW50Q291bnRlcn0+KzwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtwcm9wcy5kZWNyZW1lbnRDb3VudGVyfT4tPC9idXR0b24+XG4gICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIHZhbHVlID0ge3Byb3BzLmNvdW50ZXIubXVsdGlwbGllcn1cbiAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlTXVsdGlwbGllcn0vPlxuICAgICAgPC9kaXY+XG4gICAgKVxufVxuXG5cblxuLy8gQ29ubmVjdCBDb3VudGVyIGNvbXBvbmVudCB0byB0aGUgUmVkdXggc3RvcmUuIFRoYXQgaXMsIHdlIHdpbGwgdXNlXG4vLyBwYXJ0cyBvZiB0aGUgc3RvcmUgdG8gcGFzcyBwcm9wcyB0byB0aGUgQ291bnRlciBjb21wb25lbnQuXG5jb25zdCBDb25uZWN0ZWRDb3VudGVyID0gUmVhY3RSZWR1eC5jb25uZWN0KFxuICAvLyBNYXAgc3RvcmUgc3RhdGUgdG8gcHJvcHNcbiAgKHN0YXRlKSA9PiAoe1xuICAgIGNvdW50ZXI6IHN0YXRlXG4gIH0pLFxuICAvLyBNYXAgYWN0aW9uIGRpc3BhdGNoZXJzIHRvIHByb3BzXG4gIC8vIE5PVEU6IF8uZmxvdyhmLCBnKSByZXR1cm5zIGEgZnVuY3Rpb24gZXF1aXZhbGVudCB0byBnKGYoYXJncy4uLikpXG4gIChkaXNwYXRjaCkgPT4gKHtcbiAgICBpbmNyZW1lbnRDb3VudGVyOiBfLmZsb3coYWN0aW9uQ3JlYXRvcnMuaW5jcmVtZW50Q291bnRlciwgZGlzcGF0Y2gpLFxuICAgIGRlY3JlbWVudENvdW50ZXI6IF8uZmxvdyhhY3Rpb25DcmVhdG9ycy5kZWNyZW1lbnRDb3VudGVyLCBkaXNwYXRjaCksXG4gICAgY2hhbmdlTXVsdGlwbGllcjogXy5mbG93KGFjdGlvbkNyZWF0b3JzLmNoYW5nZU11bHRpcGxpZXIgLCBkaXNwYXRjaCksXG4gIH0pXG4pKENvdW50ZXIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbm5lY3RlZENvdW50ZXI7XG4iLCIvLyAjIyBSb290LmpzICMjXG4vL1xuLy8gVGhpcyBpcyBvdXIgdG9wLWxldmVsIFJlYWN0IGNvbXBvbmVudCB3aGljaCBjb250YWlucyBhbGwgb2Ygb3VyIG90aGVyXG4vLyBjb21wb25lbnRzIGluIGEgdHJlZS1saWtlIGhpZXJhcmNoeS4gVGhpcyBjb21wb25lbnQgaXMgbW91bnRlZCBpbnRvIHRoZVxuLy8gRE9NIGluIFwiY2xpZW50LmpzXCIuXG5cblxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuY29uc3QgUmVhY3RSZWR1eCA9IHJlcXVpcmUoJ3JlYWN0LXJlZHV4Jyk7XG5cbmNvbnN0IFByb3ZpZGVyID0gUmVhY3RSZWR1eC5Qcm92aWRlcjtcbmNvbnN0IENvdW50ZXIgPSByZXF1aXJlKCcuL0NvdW50ZXInKTtcblxuLyoqXG4gKiBUaGUgcm9vdCBSZWFjdCBjb21wb25lbnQgZnJvbSB3aGljaCBhbGwgb3RoZXIgY29tcG9uZW50c1xuICogb24gdGhlIHBhZ2UgYXJlIGRlc2NlbmRlZC5cbiAqL1xuY29uc3QgUm9vdCA9IChwcm9wcykgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAvKiBUaGUgUHJvdmlkZXIgZ2l2ZXMgZGVzY2VuZGFudHMgdGhlIGFiaWxpdHkgdG9cbiAgICAgIGNvbm5lY3QgdG8gdGhlIFJlZHV4IHN0b3JlICovXG4gICAgICA8UHJvdmlkZXIgc3RvcmU9e3Byb3BzLnN0b3JlfT5cbiAgICAgICAgPENvdW50ZXIgLz5cbiAgICAgIDwvUHJvdmlkZXI+XG4gICAgKTtcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvb3Q7XG4iLCJjb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5cbi8vIFRoZSBpbml0aWFsIHN0YXRlIGlzIGZpbGxlZCB3aXRoIHNvbWUgZHVtbXkgZGF0YSBmb3IgZGVidWdnaW5nIHB1cnBvc2VzXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gICAgICAgbiA6IDAsXG4gICAgICAgbXVsdGlwbGllciA6IDFcbn07XG5cbi8vIEFjdGlvbiB0eXBlIGNvbnN0YW50IGZvciBpbnNlcnRpbmcgYSBuZXcgdGFza1xuY29uc3QgSU5DUkVNRU5UID0gJ2NvdW50ZXIvaW5jcmVtZW50JztcbmNvbnN0IERFQ1JFTUVOVCA9ICdjb3VudGVyL2RlY3JlbWVudCc7XG5jb25zdCBDSEFOR0VNVUxUSVBMSUVSID0gJ2NvdW50ZXIvY2hhbmdlbXVsdGlwbGllcic7XG5cbmZ1bmN0aW9uIHJlZHVjZXIoc3RhdGUsIGFjdGlvbikge1xuICAvLyBEZWZhdWx0cyBmb3Igd2hlbiBzdGF0ZS9hY3Rpb24gYXJlIG5vdCBkZWZpbmVkXG4gIHN0YXRlID0gc3RhdGUgfHwgaW5pdGlhbFN0YXRlO1xuICBhY3Rpb24gPSBhY3Rpb24gfHwge307XG4gIHN3aXRjaChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgSU5DUkVNRU5UOiB7XG4gICAgICAgIHJldHVybiB7biA6IHN0YXRlLm4gKyAxLCBtdWx0aXBsaWVyIDogc3RhdGUubXVsdGlwbGllcn07XG4gICAgfVxuICAgIGNhc2UgREVDUkVNRU5UOiB7XG4gICAgICAgIHJldHVybiB7biA6IChzdGF0ZS5uIC0gMSksIG11bHRpcGxpZXIgOiBzdGF0ZS5tdWx0aXBsaWVyfTtcbiAgICB9XG4gICAgY2FzZSBDSEFOR0VNVUxUSVBMSUVSIDoge1xuICAgICAgICAgcmV0dXJuIHtuIDogc3RhdGUubiwgbXVsdGlwbGllciA6IGFjdGlvbi5tdWx0aXBsaWVyfVxuICAgIH1cbiAgICAgICAgLy8gSWYgd2UgZG9uJ3QgcmVjb2duaXNlIHRoZSBhY3Rpb24gdHlwZSwganVzdCByZXR1cm4gdGhlIHN0b3JlXG4gICAgLy8gc3RhdGUgdW5jaGFuZ2VkXG4gICAgZGVmYXVsdDogcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VyIHN3aXRjaCBzdGF0ZW1lbnQgc2hvdWxkIGFsd2F5cyByZXR1cm4nKTtcbn1cblxuLy8gQWN0aW9uIGNyZWF0b3IgZm9yIGluY3JlbWVudGluZyBjb3VudGVyXG5yZWR1Y2VyLmluY3JlbWVudENvdW50ZXIgPSAoKSA9PiB7XG4gIHJldHVybiB7IHR5cGU6IElOQ1JFTUVOVCB9IDtcbn07XG5cbi8vIEFjdGlvbiBjcmVhdG9yIGZvciBkZWNyZW1lbnRpbmcgY291bnRlclxucmVkdWNlci5kZWNyZW1lbnRDb3VudGVyID0gKCkgPT4ge1xuICByZXR1cm4geyB0eXBlOiBERUNSRU1FTlQgfSA7XG59O1xuXG5yZWR1Y2VyLmNoYW5nZU11bHRpcGxpZXIgPSAobSkgPT4ge1xuICByZXR1cm4geyB0eXBlOiBDSEFOR0VNVUxUSVBMSUVSLCBtdWx0aXBsaWVyIDogbX07XG59O1xuXG5cbi8vIEV4cG9ydCB0aGUgcmVkdWNlciBmdW5jdGlvbiBhbG9uZyB3aXRoIHRoZSBhY3Rpb24gY3JlYXRvcnMgYXR0YWNoZWRcbi8vIHRvIGl0LlxubW9kdWxlLmV4cG9ydHMgPSByZWR1Y2VyO1xuIl19
