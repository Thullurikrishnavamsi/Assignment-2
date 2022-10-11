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
      onChange: onChangeMultiplier }),
    React.createElement(
      'ul',
      null,
      React.createElement(
        'button',
        { onClick: props.addAnotherCounter },
        ' Add Another Counter '
      )
    )
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
    changeMultiplier: _.flow(actionCreators.changeMultiplier, dispatch),
    addAnotherCounter: _.flow(actionCreators.addAnotherCounter, dispatch)
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
var ADDANOTHERCOUNTER = 'counter/addAnotherCounter';

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
    case ADDANOTHERCOUNTER:
      {
        var newID = _.maxBy(state.counterArray, function (c) {
          return c.id;
        }).id + 1;
        var newObject = _.assign({}, { id: newID }, { n: 1 });
        var _counterArray2 = _.clone(state.counterArray);
        _counterArray2.push(newObject);
        var _newState2 = _.assign({}, state, { counterArray: _counterArray2 });
        return _newState2;
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

reducer.addAnotherCounter = function () {
  return { type: ADDANOTHERCOUNTER };
};

// Export the reducer function along with the action creators attached
// to it.
module.exports = reducer;

},{"lodash":"lodash"}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2RlcHMvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9jbGllbnQuanMiLCJzcmMvY29tcG9uZW50cy9Db3VudGVyLmpzIiwic3JjL2NvbXBvbmVudHMvUm9vdC5qcyIsInNyYy9zdGF0ZS9yZWR1Y2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNLFFBQVEsUUFBUSxPQUFSLENBQWQ7QUFDQSxJQUFNLFdBQVcsUUFBUSxXQUFSLENBQWpCO0FBQ0EsSUFBTSxRQUFRLFFBQVEsT0FBUixDQUFkOztBQUVBLElBQU0sVUFBVSxRQUFRLGlCQUFSLENBQWhCO0FBQ0EsSUFBTSxPQUFPLFFBQVEsbUJBQVIsQ0FBYjs7QUFFQTtBQUNBLElBQU0sUUFBUSxNQUFNLFdBQU4sQ0FBa0IsT0FBbEIsQ0FBZDs7QUFFQTtBQUNBLElBQU0sYUFBYSxTQUFTLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBbkI7QUFDQSxJQUFNLGdCQUFnQixvQkFBQyxJQUFELElBQU0sT0FBTyxLQUFiLEdBQXRCO0FBQ0EsU0FBUyxNQUFULENBQWdCLGFBQWhCLEVBQStCLFVBQS9COzs7OztBQ2xCQSxJQUFNLFFBQVEsUUFBUSxPQUFSLENBQWQ7QUFDQSxJQUFNLGFBQWEsUUFBUSxhQUFSLENBQW5CO0FBQ0EsSUFBTSxJQUFJLFFBQVEsUUFBUixDQUFWOztBQUVBLElBQU0saUJBQWlCLFFBQVEsa0JBQVIsQ0FBdkI7O0FBR0E7Ozs7QUFJQSxJQUFNLFVBQVUsU0FBVixPQUFVLENBQUMsS0FBRCxFQUFXO0FBQ3ZCLE1BQU0scUJBQXFCLFNBQXJCLGtCQUFxQixHQUFNO0FBQy9CLFVBQU0sa0JBQU4sQ0FBeUIsTUFBTSxFQUEvQjtBQUNELEdBRkQ7QUFHQSxNQUFNLHFCQUFxQixTQUFyQixrQkFBcUIsR0FBTTtBQUMvQixVQUFNLGtCQUFOLENBQXlCLE1BQU0sRUFBL0I7QUFDRCxHQUZEO0FBR0Qs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RUFBUDtBQUNELENBRkQ7O0FBSUEsUUFBUSxnQkFBUixHQUEyQixVQUFDLENBQUQsRUFBTztBQUNoQyxTQUFPLEVBQUUsTUFBTSxnQkFBUixFQUEwQixZQUFhLENBQXZDLEVBQVA7QUFDRCxDQUZEOztBQUlBLFFBQVEsaUJBQVIsR0FBNEIsWUFBTTtBQUNoQyxTQUFPLEVBQUUsTUFBTSxpQkFBUixFQUFQO0FBQ0QsQ0FGRDs7QUFNQTtBQUNBO0FBQ0EsT0FBTyxPQUFQLEdBQWlCLE9BQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gIyMgY2xpZW50LmpzICMjXG4vL1xuLy8gVGhpcyBpcyB0aGUgZW50cnlwb2ludCBmb3Igb3VyIGFwcGxpY2F0aW9uIGluIHRoZSAqd2ViIGJyb3dzZXIqLlxuLy8gV2hlbiB0aGUgd2ViIHBhZ2UgaXMgbG9hZGVkLCB0aGlzIGNvZGUgd2lsbCBydW4gaW4gdGhlIGNsaWVudCdzIHdlYiBicm93c2VyLlxuXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5jb25zdCBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xuY29uc3QgUmVkdXggPSByZXF1aXJlKCdyZWR1eCcpO1xuXG5jb25zdCByZWR1Y2VyID0gcmVxdWlyZSgnLi9zdGF0ZS9yZWR1Y2VyJyk7XG5jb25zdCBSb290ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL1Jvb3QnKTtcblxuLy8gQ3JlYXRlIGEgUmVkdXggc3RvcmVcbmNvbnN0IHN0b3JlID0gUmVkdXguY3JlYXRlU3RvcmUocmVkdWNlcik7XG5cbi8vIE1vdW50IG91ciBSZWFjdCByb290IGNvbXBvbmVudCBpbiB0aGUgRE9NXG5jb25zdCBtb3VudFBvaW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKTtcbmNvbnN0IHJvb3RDb21wb25lbnQgPSA8Um9vdCBzdG9yZT17c3RvcmV9IC8+O1xuUmVhY3RET00ucmVuZGVyKHJvb3RDb21wb25lbnQsIG1vdW50UG9pbnQpO1xuIiwiY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuY29uc3QgUmVhY3RSZWR1eCA9IHJlcXVpcmUoJ3JlYWN0LXJlZHV4Jyk7XG5jb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5cbmNvbnN0IGFjdGlvbkNyZWF0b3JzID0gcmVxdWlyZSgnLi4vc3RhdGUvcmVkdWNlcicpO1xuXG5cbi8qKlxuICogVGhlIENvdW50ZXIgY29tcG9uZW50IHJlbmRlcnMgYSB2aWV3IGZvciBhIGxpc3RcbiAqIG9mIHRhc2tzLlxuICovXG5jb25zdCBDb3VudGVyID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3Qgb25JbmNyZW1lbnRDb3VudGVyID0gKCkgPT4ge1xuICAgICAgcHJvcHMub25JbmNyZW1lbnRDb3VudGVyKHByb3BzLmlkKTtcbiAgICB9XG4gICAgY29uc3Qgb25EZWNyZW1lbnRDb3VudGVyID0gKCkgPT4ge1xuICAgICAgcHJvcHMub25EZWNyZW1lbnRDb3VudGVyKHByb3BzLmlkKTtcbiAgICB9XG4gICByZXR1cm4gKFxuICAgICAgIDxoMT57cHJvcHMubiAqIHByb3BzLm11bHRpcGxpZXJ9XG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtvbkluY3JlbWVudENvdW50ZXJ9Pis8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e29uRGVjcmVtZW50Q291bnRlcn0+LTwvYnV0dG9uPlxuICAgICAgPC9oMT5cbiAgICApXG59XG5cbmNvbnN0IE11bHRpQ291bnRlciAgPSAocHJvcHMpID0+IHtcbiAgIGNvbnN0IG9uQ2hhbmdlTXVsdGlwbGllciA9IChlKSA9PiB7XG4gICAgICBwcm9wcy5jaGFuZ2VNdWx0aXBsaWVyKHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKSk7XG4gICB9XG4gICBjb25zdCBjQXJyYXkgPSBbXTtcbiAgIGZvciAobGV0IGkgID0gMDsgaSA8IHByb3BzLmNvdW50ZXIuY291bnRlckFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50Q291bnRlciA9IHByb3BzLmNvdW50ZXIuY291bnRlckFycmF5W2ldO1xuICAgICAgY0FycmF5LnB1c2goPENvdW50ZXIga2V5ID0ge2N1cnJlbnRDb3VudGVyLmlkfVxuICAgICAgICAgICAgICAgICAgIG9uSW5jcmVtZW50Q291bnRlciA9IHtwcm9wcy5pbmNyZW1lbnRDb3VudGVyfVxuICAgICAgICAgICAgICAgICAgIG9uRGVjcmVtZW50Q291bnRlciA9IHtwcm9wcy5kZWNyZW1lbnRDb3VudGVyfVxuICAgICAgICAgICAgICAgICAgIGlkID0ge2N1cnJlbnRDb3VudGVyLmlkfSBuID0ge2N1cnJlbnRDb3VudGVyLm59XG4gICAgICAgICAgICAgICAgICAgbXVsdGlwbGllciA9IHtwcm9wcy5jb3VudGVyLm11bHRpcGxpZXJ9IC8+KTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAge2NBcnJheX1cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgdmFsdWUgPSB7cHJvcHMuY291bnRlci5tdWx0aXBsaWVyfVxuICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZU11bHRpcGxpZXJ9Lz5cbiAgICAgICAgICA8dWw+XG4gICAgICAgICAgIDxidXR0b24gb25DbGljaz17cHJvcHMuYWRkQW5vdGhlckNvdW50ZXJ9PiBBZGQgQW5vdGhlciBDb3VudGVyIDwvYnV0dG9uPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG5cblxuXG4vLyBDb25uZWN0IENvdW50ZXIgY29tcG9uZW50IHRvIHRoZSBSZWR1eCBzdG9yZS4gVGhhdCBpcywgd2Ugd2lsbCB1c2Vcbi8vIHBhcnRzIG9mIHRoZSBzdG9yZSB0byBwYXNzIHByb3BzIHRvIHRoZSBDb3VudGVyIGNvbXBvbmVudC5cbmNvbnN0IENvbm5lY3RlZE11bHRpQ291bnRlciA9IFJlYWN0UmVkdXguY29ubmVjdChcbiAgLy8gTWFwIHN0b3JlIHN0YXRlIHRvIHByb3BzXG4gIChzdGF0ZSkgPT4gKHtcbiAgICBjb3VudGVyOiBzdGF0ZVxuICB9KSxcbiAgLy8gTWFwIGFjdGlvbiBkaXNwYXRjaGVycyB0byBwcm9wc1xuICAvLyBOT1RFOiBfLmZsb3coZiwgZykgcmV0dXJucyBhIGZ1bmN0aW9uIGVxdWl2YWxlbnQgdG8gZyhmKGFyZ3MuLi4pKVxuICAoZGlzcGF0Y2gpID0+ICh7XG4gICAgaW5jcmVtZW50Q291bnRlcjogXy5mbG93KGFjdGlvbkNyZWF0b3JzLmluY3JlbWVudENvdW50ZXIsIGRpc3BhdGNoKSxcbiAgICBkZWNyZW1lbnRDb3VudGVyOiBfLmZsb3coYWN0aW9uQ3JlYXRvcnMuZGVjcmVtZW50Q291bnRlciwgZGlzcGF0Y2gpLFxuICAgIGNoYW5nZU11bHRpcGxpZXI6IF8uZmxvdyhhY3Rpb25DcmVhdG9ycy5jaGFuZ2VNdWx0aXBsaWVyICwgZGlzcGF0Y2gpLFxuICAgIGFkZEFub3RoZXJDb3VudGVyOiBfLmZsb3coYWN0aW9uQ3JlYXRvcnMuYWRkQW5vdGhlckNvdW50ZXIgLCBkaXNwYXRjaCksXG4gIH0pXG4pKE11bHRpQ291bnRlcik7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29ubmVjdGVkTXVsdGlDb3VudGVyO1xuIiwiLy8gIyMgUm9vdC5qcyAjI1xuLy9cbi8vIFRoaXMgaXMgb3VyIHRvcC1sZXZlbCBSZWFjdCBjb21wb25lbnQgd2hpY2ggY29udGFpbnMgYWxsIG9mIG91ciBvdGhlclxuLy8gY29tcG9uZW50cyBpbiBhIHRyZWUtbGlrZSBoaWVyYXJjaHkuIFRoaXMgY29tcG9uZW50IGlzIG1vdW50ZWQgaW50byB0aGVcbi8vIERPTSBpbiBcImNsaWVudC5qc1wiLlxuXG5cbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbmNvbnN0IFJlYWN0UmVkdXggPSByZXF1aXJlKCdyZWFjdC1yZWR1eCcpO1xuXG5jb25zdCBQcm92aWRlciA9IFJlYWN0UmVkdXguUHJvdmlkZXI7XG5jb25zdCBDb3VudGVyID0gcmVxdWlyZSgnLi9Db3VudGVyJyk7XG5cbi8qKlxuICogVGhlIHJvb3QgUmVhY3QgY29tcG9uZW50IGZyb20gd2hpY2ggYWxsIG90aGVyIGNvbXBvbmVudHNcbiAqIG9uIHRoZSBwYWdlIGFyZSBkZXNjZW5kZWQuXG4gKi9cbmNvbnN0IFJvb3QgPSAocHJvcHMpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgLyogVGhlIFByb3ZpZGVyIGdpdmVzIGRlc2NlbmRhbnRzIHRoZSBhYmlsaXR5IHRvXG4gICAgICBjb25uZWN0IHRvIHRoZSBSZWR1eCBzdG9yZSAqL1xuICAgICAgPFByb3ZpZGVyIHN0b3JlPXtwcm9wcy5zdG9yZX0+XG4gICAgICAgIDxDb3VudGVyIC8+XG4gICAgICA8L1Byb3ZpZGVyPlxuICAgICk7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBSb290O1xuIiwiY29uc3QgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuXG4vLyBUaGUgaW5pdGlhbCBzdGF0ZSBpcyBmaWxsZWQgd2l0aCBzb21lIGR1bW15IGRhdGEgZm9yIGRlYnVnZ2luZyBwdXJwb3Nlc1xuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAgICAgIGNvdW50ZXJBcnJheSA6IFt7aWQ6IDAsIG46IDEwfSx7aWQgOiAxLCBuOiAyMH0sIHtpZDogMiwgbiA6IDMwfV0sXG4gICAgICAgbXVsdGlwbGllciA6IDFcbn07XG5cbi8vIEFjdGlvbiB0eXBlIGNvbnN0YW50IGZvciBpbnNlcnRpbmcgYSBuZXcgdGFza1xuY29uc3QgSU5DUkVNRU5UID0gJ2NvdW50ZXIvaW5jcmVtZW50JztcbmNvbnN0IERFQ1JFTUVOVCA9ICdjb3VudGVyL2RlY3JlbWVudCc7XG5jb25zdCBDSEFOR0VNVUxUSVBMSUVSID0gJ2NvdW50ZXIvY2hhbmdlbXVsdGlwbGllcic7XG5jb25zdCBBRERBTk9USEVSQ09VTlRFUiA9ICdjb3VudGVyL2FkZEFub3RoZXJDb3VudGVyJztcblxuXG4vLyBUaGUgcmVkdWNlciBmdW5jdGlvbiB0YWtlcyB0aGUgY3VycmVudCBzdGF0ZSBhbmQgYW4gYWN0aW9uLCBhbmQgcmV0dXJuc1xuLy8gdGhlIG5ldyBzdGF0ZSBhZnRlciBhcHBseWluZyB0aGUgYWN0aW9uLlxuZnVuY3Rpb24gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKSB7XG4gIC8vIERlZmF1bHRzIGZvciB3aGVuIHN0YXRlL2FjdGlvbiBhcmUgbm90IGRlZmluZWRcbiAgc3RhdGUgPSBzdGF0ZSB8fCBpbml0aWFsU3RhdGU7XG4gIGFjdGlvbiA9IGFjdGlvbiB8fCB7fTtcblxuICBzd2l0Y2goYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIElOQ1JFTUVOVDoge1xuICAgICAgICBjb25zdCBjb3VudGVySW5kZXggPSBfLmZpbmRJbmRleChzdGF0ZS5jb3VudGVyQXJyYXksIHtpZDogYWN0aW9uLmlkfSk7XG4gICAgICAgIGNvbnN0IG9sZENvdW50ZXIgPSBzdGF0ZS5jb3VudGVyQXJyYXlbY291bnRlckluZGV4XTtcbiAgICAgICAgY29uc3QgY291bnRlciA9IF8uYXNzaWduKHt9LCBvbGRDb3VudGVyLCB7bjogb2xkQ291bnRlci5uICsgMX0pO1xuICAgICAgICBjb25zdCBjb3VudGVyQXJyYXkgPSBfLmFzc2lnbihbXSwgc3RhdGUuY291bnRlckFycmF5LCB7W2NvdW50ZXJJbmRleF06IGNvdW50ZXJ9KTtcbiAgICAgICAgY29uc3QgbmV3U3RhdGUgPSBfLmFzc2lnbih7fSwgc3RhdGUsIHtjb3VudGVyQXJyYXl9KTtcbiAgICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgIH1cbiAgIGNhc2UgREVDUkVNRU5UOiB7XG4gICAgICAgY29uc3QgY291bnRlckluZGV4ID0gXy5maW5kSW5kZXgoc3RhdGUuY291bnRlckFycmF5LCB7aWQ6IGFjdGlvbi5pZH0pO1xuICAgICAgICBjb25zdCBvbGRDb3VudGVyID0gc3RhdGUuY291bnRlckFycmF5W2NvdW50ZXJJbmRleF07XG4gICAgICAgIGNvbnN0IGNvdW50ZXIgPSBfLmFzc2lnbih7fSwgb2xkQ291bnRlciwge246IG9sZENvdW50ZXIubiAtIDF9KTtcbiAgICAgICAgY29uc3QgY291bnRlckFycmF5ID0gXy5hc3NpZ24oW10sIHN0YXRlLmNvdW50ZXJBcnJheSwge1tjb3VudGVySW5kZXhdOiBjb3VudGVyfSk7XG4gICAgICAgIGNvbnN0IG5ld1N0YXRlID0gXy5hc3NpZ24oe30sIHN0YXRlLCB7Y291bnRlckFycmF5fSk7XG4gICAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICB9XG4gICAgY2FzZSBDSEFOR0VNVUxUSVBMSUVSIDoge1xuICAgICAgICByZXR1cm4ge2NvdW50ZXJBcnJheSA6IHN0YXRlLmNvdW50ZXJBcnJheSwgbXVsdGlwbGllciA6IGFjdGlvbi5tdWx0aXBsaWVyfVxuICAgIH1cbiAgICBjYXNlIEFEREFOT1RIRVJDT1VOVEVSIDoge1xuICAgICAgICBjb25zdCBuZXdJRCA9IF8ubWF4Qnkoc3RhdGUuY291bnRlckFycmF5LCBjID0+IGMuaWQpLmlkICsgMTtcbiAgICAgICAgY29uc3QgbmV3T2JqZWN0ID0gXy5hc3NpZ24oe30sIHtpZCA6IG5ld0lEfSwge24gOiAxfSk7XG4gICAgICAgIGNvbnN0IGNvdW50ZXJBcnJheSA9IF8uY2xvbmUoc3RhdGUuY291bnRlckFycmF5KTtcbiAgICAgICAgY291bnRlckFycmF5LnB1c2gobmV3T2JqZWN0KVxuICAgICAgICBjb25zdCBuZXdTdGF0ZSA9IF8uYXNzaWduKHt9LCBzdGF0ZSwge2NvdW50ZXJBcnJheX0pO1xuICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfVxuICAgICAgICAvLyBJZiB3ZSBkb24ndCByZWNvZ25pc2UgdGhlIGFjdGlvbiB0eXBlLCBqdXN0IHJldHVybiB0aGUgc3RvcmVcbiAgICAvLyBzdGF0ZSB1bmNoYW5nZWRcbiAgICBkZWZhdWx0OiByZXR1cm4gc3RhdGU7XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXIgc3dpdGNoIHN0YXRlbWVudCBzaG91bGQgYWx3YXlzIHJldHVybicpO1xufVxuXG4vLyBBY3Rpb24gY3JlYXRvciBmb3IgaW5jcmVtZW50aW5nIGNvdW50ZXJcbnJlZHVjZXIuaW5jcmVtZW50Q291bnRlciA9IChuKSA9PiB7XG4gIHJldHVybiB7IHR5cGU6IElOQ1JFTUVOVCwgaWQgOiBuICB9O1xufTtcblxuLy8gQWN0aW9uIGNyZWF0b3IgZm9yIGRlY3JlbWVudGluZyBjb3VudGVyXG5yZWR1Y2VyLmRlY3JlbWVudENvdW50ZXIgPSAobikgPT4ge1xuICByZXR1cm4geyB0eXBlOiBERUNSRU1FTlQsIGlkIDogbiAgfTtcbn07XG5cbnJlZHVjZXIuY2hhbmdlTXVsdGlwbGllciA9IChtKSA9PiB7XG4gIHJldHVybiB7IHR5cGU6IENIQU5HRU1VTFRJUExJRVIsIG11bHRpcGxpZXIgOiBtfTtcbn07XG5cbnJlZHVjZXIuYWRkQW5vdGhlckNvdW50ZXIgPSAoKSA9PiB7XG4gIHJldHVybiB7IHR5cGU6IEFEREFOT1RIRVJDT1VOVEVSfTtcbn07XG5cblxuXG4vLyBFeHBvcnQgdGhlIHJlZHVjZXIgZnVuY3Rpb24gYWxvbmcgd2l0aCB0aGUgYWN0aW9uIGNyZWF0b3JzIGF0dGFjaGVkXG4vLyB0byBpdC5cbm1vZHVsZS5leHBvcnRzID0gcmVkdWNlcjtcbiJdfQ==
