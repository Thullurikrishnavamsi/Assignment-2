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
  var onIncrementCounter = function onIncrementCounter() {
    props.onIncrementCounter(props.id);
  };
  var onDecrementCounter = function onDecrementCounter() {
    props.onDecrementCounter(props.id);
  };
  return React.createElement(
    'h1',
    null,
    props.n * props.multiplier,
    React.createElement(
      'button',
      { onClick: onIncrementCounter },
      '+'
    ),
    React.createElement(
      'button',
      { onClick: onDecrementCounter },
      '-'
    )
  );
};

var MultiCounter = function MultiCounter(props) {
  var onChangeMultiplier = function onChangeMultiplier(e) {
    props.changeMultiplier(parseInt(e.target.value));
  };
  var cArray = [];
  for (var i = 0; i < props.counter.counterArray.length; i++) {
    var currentCounter = props.counter.counterArray[i];
    cArray.push(React.createElement(Counter, { key: currentCounter.id,
      onIncrementCounter: props.incrementCounter,
      onDecrementCounter: props.decrementCounter,
      id: currentCounter.id, n: currentCounter.n,
      multiplier: props.counter.multiplier }));
  }
  return React.createElement(
    'div',
    null,
    cArray,
    React.createElement('input', { type: 'number', value: props.counter.multiplier,
      onChange: onChangeMultiplier })
  );
};

// Connect Counter component to the Redux store. That is, we will use
// parts of the store to pass props to the Counter component.
var ConnectedMultiCounter = ReactRedux.connect(
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
})(MultiCounter);

module.exports = ConnectedMultiCounter;

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ = require('lodash');

// The initial state is filled with some dummy data for debugging purposes
var initialState = {
  counterArray: [{ id: 0, n: 10 }, { id: 1, n: 20 }, { id: 2, n: 30 }],
  multiplier: 1
};

// Action type constant for inserting a new task
var INCREMENT = 'counter/increment';
var DECREMENT = 'counter/decrement';
var CHANGEMULTIPLIER = 'counter/changemultiplier';

// The reducer function takes the current state and an action, and returns
// the new state after applying the action.
function reducer(state, action) {
  // Defaults for when state/action are not defined
  state = state || initialState;
  action = action || {};

  switch (action.type) {
    case INCREMENT:
      {
        var counterIndex = _.findIndex(state.counterArray, { id: action.id });
        var oldCounter = state.counterArray[counterIndex];
        var counter = _.assign({}, oldCounter, { n: oldCounter.n + 1 });
        var counterArray = _.assign([], state.counterArray, _defineProperty({}, counterIndex, counter));
        var newState = _.assign({}, state, { counterArray: counterArray });
        return newState;
      }
    case DECREMENT:
      {
        var _counterIndex = _.findIndex(state.counterArray, { id: action.id });
        var _oldCounter = state.counterArray[_counterIndex];
        var _counter = _.assign({}, _oldCounter, { n: _oldCounter.n - 1 });
        var _counterArray = _.assign([], state.counterArray, _defineProperty({}, _counterIndex, _counter));
        var _newState = _.assign({}, state, { counterArray: _counterArray });
        return _newState;
      }
    case CHANGEMULTIPLIER:
      {
        return { counterArray: state.counterArray, multiplier: action.multiplier };
      }
    // If we don't recognise the action type, just return the store
    // state unchanged
    default:
      return state;
  }

  throw new Error('Reducer switch statement should always return');
}

// Action creator for incrementing counter
reducer.incrementCounter = function (n) {
  return { type: INCREMENT, id: n };
};

// Action creator for decrementing counter
reducer.decrementCounter = function (n) {
  return { type: DECREMENT, id: n };
};

reducer.changeMultiplier = function (m) {
  return { type: CHANGEMULTIPLIER, multiplier: m };
};

// Export the reducer function along with the action creators attached
// to it.
module.exports = reducer;

},{"lodash":"lodash"}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2RlcHMvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9jbGllbnQuanMiLCJzcmMvY29tcG9uZW50cy9Db3VudGVyLmpzIiwic3JjL2NvbXBvbmVudHMvUm9vdC5qcyIsInNyYy9zdGF0ZS9yZWR1Y2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNLFFBQVEsUUFBUSxPQUFSLENBQWQ7QUFDQSxJQUFNLFdBQVcsUUFBUSxXQUFSLENBQWpCO0FBQ0EsSUFBTSxRQUFRLFFBQVEsT0FBUixDQUFkOztBQUVBLElBQU0sVUFBVSxRQUFRLGlCQUFSLENBQWhCO0FBQ0EsSUFBTSxPQUFPLFFBQVEsbUJBQVIsQ0FBYjs7QUFFQTtBQUNBLElBQU0sUUFBUSxNQUFNLFdBQU4sQ0FBa0IsT0FBbEIsQ0FBZDs7QUFFQTtBQUNBLElBQU0sYUFBYSxTQUFTLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBbkI7QUFDQSxJQUFNLGdCQUFnQixvQkFBQyxJQUFELElBQU0sT0FBTyxLQUFiLEdBQXRCO0FBQ0EsU0FBUyxNQUFULENBQWdCLGFBQWhCLEVBQStCLFVBQS9COzs7OztBQ2xCQSxJQUFNLFFBQVEsUUFBUSxPQUFSLENBQWQ7QUFDQSxJQUFNLGFBQWEsUUFBUSxhQUFSLENBQW5CO0FBQ0EsSUFBTSxJQUFJLFFBQVEsUUFBUixDQUFWOztBQUVBLElBQU0saUJBQWlCLFFBQVEsa0JBQVIsQ0FBdkI7O0FBR0E7Ozs7QUFJQSxJQUFNLFVBQVUsU0FBVixPQUFVLENBQUMsS0FBRCxFQUFXO0FBQ3ZCLE1BQU0scUJBQXFCLFNBQXJCLGtCQUFxQixHQUFNO0FBQy9CLFVBQU0sa0JBQU4sQ0FBeUIsTUFBTSxFQUEvQjtBQUNELEdBRkQ7QUFHQSxNQUFNLHFCQUFxQixTQUFyQixrQkFBcUIsR0FBTTtBQUMvQixVQUFNLGtCQUFOLENBQXlCLE1BQU0sRUFBL0I7QUFDRCxHQUZEO0FBR0Qs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QUFQO0FBQ0g7QUFDRCxTQUFLLGdCQUFMO0FBQXdCO0FBQ3BCLGVBQU8sRUFBQyxjQUFlLE1BQU0sWUFBdEIsRUFBb0MsWUFBYSxPQUFPLFVBQXhELEVBQVA7QUFDSDtBQUNHO0FBQ0o7QUFDQTtBQUFTLGFBQU8sS0FBUDtBQXRCWDs7QUF5QkEsUUFBTSxJQUFJLEtBQUosQ0FBVSwrQ0FBVixDQUFOO0FBQ0Q7O0FBRUQ7QUFDQSxRQUFRLGdCQUFSLEdBQTJCLFVBQUMsQ0FBRCxFQUFPO0FBQ2hDLFNBQU8sRUFBRSxNQUFNLFNBQVIsRUFBbUIsSUFBSyxDQUF4QixFQUFQO0FBQ0QsQ0FGRDs7QUFJQTtBQUNBLFFBQVEsZ0JBQVIsR0FBMkIsVUFBQyxDQUFELEVBQU87QUFDaEMsU0FBTyxFQUFFLE1BQU0sU0FBUixFQUFtQixJQUFLLENBQXhCLEVBQVA7QUFDRCxDQUZEOztBQUtBLFFBQVEsZ0JBQVIsR0FBMkIsVUFBQyxDQUFELEVBQU87QUFDaEMsU0FBTyxFQUFFLE1BQU0sZ0JBQVIsRUFBMEIsWUFBYSxDQUF2QyxFQUFQO0FBQ0QsQ0FGRDs7QUFLQTtBQUNBO0FBQ0EsT0FBTyxPQUFQLEdBQWlCLE9BQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gIyMgY2xpZW50LmpzICMjXG4vL1xuLy8gVGhpcyBpcyB0aGUgZW50cnlwb2ludCBmb3Igb3VyIGFwcGxpY2F0aW9uIGluIHRoZSAqd2ViIGJyb3dzZXIqLlxuLy8gV2hlbiB0aGUgd2ViIHBhZ2UgaXMgbG9hZGVkLCB0aGlzIGNvZGUgd2lsbCBydW4gaW4gdGhlIGNsaWVudCdzIHdlYiBicm93c2VyLlxuXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5jb25zdCBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xuY29uc3QgUmVkdXggPSByZXF1aXJlKCdyZWR1eCcpO1xuXG5jb25zdCByZWR1Y2VyID0gcmVxdWlyZSgnLi9zdGF0ZS9yZWR1Y2VyJyk7XG5jb25zdCBSb290ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL1Jvb3QnKTtcblxuLy8gQ3JlYXRlIGEgUmVkdXggc3RvcmVcbmNvbnN0IHN0b3JlID0gUmVkdXguY3JlYXRlU3RvcmUocmVkdWNlcik7XG5cbi8vIE1vdW50IG91ciBSZWFjdCByb290IGNvbXBvbmVudCBpbiB0aGUgRE9NXG5jb25zdCBtb3VudFBvaW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKTtcbmNvbnN0IHJvb3RDb21wb25lbnQgPSA8Um9vdCBzdG9yZT17c3RvcmV9IC8+O1xuUmVhY3RET00ucmVuZGVyKHJvb3RDb21wb25lbnQsIG1vdW50UG9pbnQpO1xuIiwiY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuY29uc3QgUmVhY3RSZWR1eCA9IHJlcXVpcmUoJ3JlYWN0LXJlZHV4Jyk7XG5jb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5cbmNvbnN0IGFjdGlvbkNyZWF0b3JzID0gcmVxdWlyZSgnLi4vc3RhdGUvcmVkdWNlcicpO1xuXG5cbi8qKlxuICogVGhlIENvdW50ZXIgY29tcG9uZW50IHJlbmRlcnMgYSB2aWV3IGZvciBhIGxpc3RcbiAqIG9mIHRhc2tzLlxuICovXG5jb25zdCBDb3VudGVyID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3Qgb25JbmNyZW1lbnRDb3VudGVyID0gKCkgPT4ge1xuICAgICAgcHJvcHMub25JbmNyZW1lbnRDb3VudGVyKHByb3BzLmlkKTtcbiAgICB9XG4gICAgY29uc3Qgb25EZWNyZW1lbnRDb3VudGVyID0gKCkgPT4ge1xuICAgICAgcHJvcHMub25EZWNyZW1lbnRDb3VudGVyKHByb3BzLmlkKTtcbiAgICB9XG4gICByZXR1cm4gKFxuICAgICAgIDxoMT57cHJvcHMubiAqIHByb3BzLm11bHRpcGxpZXJ9XG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtvbkluY3JlbWVudENvdW50ZXJ9Pis8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e29uRGVjcmVtZW50Q291bnRlcn0+LTwvYnV0dG9uPlxuICAgICAgPC9oMT5cbiAgICApXG59XG5cbmNvbnN0IE11bHRpQ291bnRlciAgPSAocHJvcHMpID0+IHtcbiAgIGNvbnN0IG9uQ2hhbmdlTXVsdGlwbGllciA9IChlKSA9PiB7XG4gICAgICBwcm9wcy5jaGFuZ2VNdWx0aXBsaWVyKHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKSk7XG4gICB9XG4gICBjb25zdCBjQXJyYXkgPSBbXTtcbiAgIGZvciAobGV0IGkgID0gMDsgaSA8IHByb3BzLmNvdW50ZXIuY291bnRlckFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50Q291bnRlciA9IHByb3BzLmNvdW50ZXIuY291bnRlckFycmF5W2ldO1xuICAgICAgY0FycmF5LnB1c2goPENvdW50ZXIga2V5ID0ge2N1cnJlbnRDb3VudGVyLmlkfVxuICAgICAgICAgICAgICAgICAgIG9uSW5jcmVtZW50Q291bnRlciA9IHtwcm9wcy5pbmNyZW1lbnRDb3VudGVyfVxuICAgICAgICAgICAgICAgICAgIG9uRGVjcmVtZW50Q291bnRlciA9IHtwcm9wcy5kZWNyZW1lbnRDb3VudGVyfVxuICAgICAgICAgICAgICAgICAgIGlkID0ge2N1cnJlbnRDb3VudGVyLmlkfSBuID0ge2N1cnJlbnRDb3VudGVyLm59XG4gICAgICAgICAgICAgICAgICAgbXVsdGlwbGllciA9IHtwcm9wcy5jb3VudGVyLm11bHRpcGxpZXJ9IC8+KTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAge2NBcnJheX1cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgdmFsdWUgPSB7cHJvcHMuY291bnRlci5tdWx0aXBsaWVyfVxuICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZU11bHRpcGxpZXJ9Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cblxuXG5cbi8vIENvbm5lY3QgQ291bnRlciBjb21wb25lbnQgdG8gdGhlIFJlZHV4IHN0b3JlLiBUaGF0IGlzLCB3ZSB3aWxsIHVzZVxuLy8gcGFydHMgb2YgdGhlIHN0b3JlIHRvIHBhc3MgcHJvcHMgdG8gdGhlIENvdW50ZXIgY29tcG9uZW50LlxuY29uc3QgQ29ubmVjdGVkTXVsdGlDb3VudGVyID0gUmVhY3RSZWR1eC5jb25uZWN0KFxuICAvLyBNYXAgc3RvcmUgc3RhdGUgdG8gcHJvcHNcbiAgKHN0YXRlKSA9PiAoe1xuICAgIGNvdW50ZXI6IHN0YXRlXG4gIH0pLFxuICAvLyBNYXAgYWN0aW9uIGRpc3BhdGNoZXJzIHRvIHByb3BzXG4gIC8vIE5PVEU6IF8uZmxvdyhmLCBnKSByZXR1cm5zIGEgZnVuY3Rpb24gZXF1aXZhbGVudCB0byBnKGYoYXJncy4uLikpXG4gIChkaXNwYXRjaCkgPT4gKHtcbiAgICBpbmNyZW1lbnRDb3VudGVyOiBfLmZsb3coYWN0aW9uQ3JlYXRvcnMuaW5jcmVtZW50Q291bnRlciwgZGlzcGF0Y2gpLFxuICAgIGRlY3JlbWVudENvdW50ZXI6IF8uZmxvdyhhY3Rpb25DcmVhdG9ycy5kZWNyZW1lbnRDb3VudGVyLCBkaXNwYXRjaCksXG4gICAgY2hhbmdlTXVsdGlwbGllcjogXy5mbG93KGFjdGlvbkNyZWF0b3JzLmNoYW5nZU11bHRpcGxpZXIgLCBkaXNwYXRjaCksXG4gIH0pXG4pKE11bHRpQ291bnRlcik7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29ubmVjdGVkTXVsdGlDb3VudGVyO1xuIiwiLy8gIyMgUm9vdC5qcyAjI1xuLy9cbi8vIFRoaXMgaXMgb3VyIHRvcC1sZXZlbCBSZWFjdCBjb21wb25lbnQgd2hpY2ggY29udGFpbnMgYWxsIG9mIG91ciBvdGhlclxuLy8gY29tcG9uZW50cyBpbiBhIHRyZWUtbGlrZSBoaWVyYXJjaHkuIFRoaXMgY29tcG9uZW50IGlzIG1vdW50ZWQgaW50byB0aGVcbi8vIERPTSBpbiBcImNsaWVudC5qc1wiLlxuXG5cbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbmNvbnN0IFJlYWN0UmVkdXggPSByZXF1aXJlKCdyZWFjdC1yZWR1eCcpO1xuXG5jb25zdCBQcm92aWRlciA9IFJlYWN0UmVkdXguUHJvdmlkZXI7XG5jb25zdCBDb3VudGVyID0gcmVxdWlyZSgnLi9Db3VudGVyJyk7XG5cbi8qKlxuICogVGhlIHJvb3QgUmVhY3QgY29tcG9uZW50IGZyb20gd2hpY2ggYWxsIG90aGVyIGNvbXBvbmVudHNcbiAqIG9uIHRoZSBwYWdlIGFyZSBkZXNjZW5kZWQuXG4gKi9cbmNvbnN0IFJvb3QgPSAocHJvcHMpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgLyogVGhlIFByb3ZpZGVyIGdpdmVzIGRlc2NlbmRhbnRzIHRoZSBhYmlsaXR5IHRvXG4gICAgICBjb25uZWN0IHRvIHRoZSBSZWR1eCBzdG9yZSAqL1xuICAgICAgPFByb3ZpZGVyIHN0b3JlPXtwcm9wcy5zdG9yZX0+XG4gICAgICAgIDxDb3VudGVyIC8+XG4gICAgICA8L1Byb3ZpZGVyPlxuICAgICk7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBSb290O1xuIiwiY29uc3QgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuXG4vLyBUaGUgaW5pdGlhbCBzdGF0ZSBpcyBmaWxsZWQgd2l0aCBzb21lIGR1bW15IGRhdGEgZm9yIGRlYnVnZ2luZyBwdXJwb3Nlc1xuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAgICAgIGNvdW50ZXJBcnJheSA6IFt7aWQ6IDAsIG46IDEwfSx7aWQgOiAxLCBuOiAyMH0sIHtpZDogMiwgbiA6IDMwfV0sXG4gICAgICAgbXVsdGlwbGllciA6IDFcbn07XG5cbi8vIEFjdGlvbiB0eXBlIGNvbnN0YW50IGZvciBpbnNlcnRpbmcgYSBuZXcgdGFza1xuY29uc3QgSU5DUkVNRU5UID0gJ2NvdW50ZXIvaW5jcmVtZW50JztcbmNvbnN0IERFQ1JFTUVOVCA9ICdjb3VudGVyL2RlY3JlbWVudCc7XG5jb25zdCBDSEFOR0VNVUxUSVBMSUVSID0gJ2NvdW50ZXIvY2hhbmdlbXVsdGlwbGllcic7XG5cbi8vIFRoZSByZWR1Y2VyIGZ1bmN0aW9uIHRha2VzIHRoZSBjdXJyZW50IHN0YXRlIGFuZCBhbiBhY3Rpb24sIGFuZCByZXR1cm5zXG4vLyB0aGUgbmV3IHN0YXRlIGFmdGVyIGFwcGx5aW5nIHRoZSBhY3Rpb24uXG5mdW5jdGlvbiByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pIHtcbiAgLy8gRGVmYXVsdHMgZm9yIHdoZW4gc3RhdGUvYWN0aW9uIGFyZSBub3QgZGVmaW5lZFxuICBzdGF0ZSA9IHN0YXRlIHx8IGluaXRpYWxTdGF0ZTtcbiAgYWN0aW9uID0gYWN0aW9uIHx8IHt9O1xuXG4gIHN3aXRjaChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgSU5DUkVNRU5UOiB7XG4gICAgICAgIGNvbnN0IGNvdW50ZXJJbmRleCA9IF8uZmluZEluZGV4KHN0YXRlLmNvdW50ZXJBcnJheSwge2lkOiBhY3Rpb24uaWR9KTtcbiAgICAgICAgY29uc3Qgb2xkQ291bnRlciA9IHN0YXRlLmNvdW50ZXJBcnJheVtjb3VudGVySW5kZXhdO1xuICAgICAgICBjb25zdCBjb3VudGVyID0gXy5hc3NpZ24oe30sIG9sZENvdW50ZXIsIHtuOiBvbGRDb3VudGVyLm4gKyAxfSk7XG4gICAgICAgIGNvbnN0IGNvdW50ZXJBcnJheSA9IF8uYXNzaWduKFtdLCBzdGF0ZS5jb3VudGVyQXJyYXksIHtbY291bnRlckluZGV4XTogY291bnRlcn0pO1xuICAgICAgICBjb25zdCBuZXdTdGF0ZSA9IF8uYXNzaWduKHt9LCBzdGF0ZSwge2NvdW50ZXJBcnJheX0pO1xuICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfVxuICAgY2FzZSBERUNSRU1FTlQ6IHtcbiAgICAgICBjb25zdCBjb3VudGVySW5kZXggPSBfLmZpbmRJbmRleChzdGF0ZS5jb3VudGVyQXJyYXksIHtpZDogYWN0aW9uLmlkfSk7XG4gICAgICAgIGNvbnN0IG9sZENvdW50ZXIgPSBzdGF0ZS5jb3VudGVyQXJyYXlbY291bnRlckluZGV4XTtcbiAgICAgICAgY29uc3QgY291bnRlciA9IF8uYXNzaWduKHt9LCBvbGRDb3VudGVyLCB7bjogb2xkQ291bnRlci5uIC0gMX0pO1xuICAgICAgICBjb25zdCBjb3VudGVyQXJyYXkgPSBfLmFzc2lnbihbXSwgc3RhdGUuY291bnRlckFycmF5LCB7W2NvdW50ZXJJbmRleF06IGNvdW50ZXJ9KTtcbiAgICAgICAgY29uc3QgbmV3U3RhdGUgPSBfLmFzc2lnbih7fSwgc3RhdGUsIHtjb3VudGVyQXJyYXl9KTtcbiAgICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgIH1cbiAgICBjYXNlIENIQU5HRU1VTFRJUExJRVIgOiB7XG4gICAgICAgIHJldHVybiB7Y291bnRlckFycmF5IDogc3RhdGUuY291bnRlckFycmF5LCBtdWx0aXBsaWVyIDogYWN0aW9uLm11bHRpcGxpZXJ9XG4gICAgfVxuICAgICAgICAvLyBJZiB3ZSBkb24ndCByZWNvZ25pc2UgdGhlIGFjdGlvbiB0eXBlLCBqdXN0IHJldHVybiB0aGUgc3RvcmVcbiAgICAvLyBzdGF0ZSB1bmNoYW5nZWRcbiAgICBkZWZhdWx0OiByZXR1cm4gc3RhdGU7XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXIgc3dpdGNoIHN0YXRlbWVudCBzaG91bGQgYWx3YXlzIHJldHVybicpO1xufVxuXG4vLyBBY3Rpb24gY3JlYXRvciBmb3IgaW5jcmVtZW50aW5nIGNvdW50ZXJcbnJlZHVjZXIuaW5jcmVtZW50Q291bnRlciA9IChuKSA9PiB7XG4gIHJldHVybiB7IHR5cGU6IElOQ1JFTUVOVCwgaWQgOiBuICB9O1xufTtcblxuLy8gQWN0aW9uIGNyZWF0b3IgZm9yIGRlY3JlbWVudGluZyBjb3VudGVyXG5yZWR1Y2VyLmRlY3JlbWVudENvdW50ZXIgPSAobikgPT4ge1xuICByZXR1cm4geyB0eXBlOiBERUNSRU1FTlQsIGlkIDogbiAgfTtcbn07XG5cblxucmVkdWNlci5jaGFuZ2VNdWx0aXBsaWVyID0gKG0pID0+IHtcbiAgcmV0dXJuIHsgdHlwZTogQ0hBTkdFTVVMVElQTElFUiwgbXVsdGlwbGllciA6IG19O1xufTtcblxuXG4vLyBFeHBvcnQgdGhlIHJlZHVjZXIgZnVuY3Rpb24gYWxvbmcgd2l0aCB0aGUgYWN0aW9uIGNyZWF0b3JzIGF0dGFjaGVkXG4vLyB0byBpdC5cbm1vZHVsZS5leHBvcnRzID0gcmVkdWNlcjtcbiJdfQ==
