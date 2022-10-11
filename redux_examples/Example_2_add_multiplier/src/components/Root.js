// ## Root.js ##
//
// This is our top-level React component which contains all of our other
// components in a tree-like hierarchy. This component is mounted into the
// DOM in "client.js".


const React = require('react');
const ReactRedux = require('react-redux');

const Provider = ReactRedux.Provider;
const Counter = require('./Counter');

/**
 * The root React component from which all other components
 * on the page are descended.
 */
const Root = (props) => {
    return (
      /* The Provider gives descendants the ability to
      connect to the Redux store */
      <Provider store={props.store}>
        <Counter />
      </Provider>
    );
}


module.exports = Root;
