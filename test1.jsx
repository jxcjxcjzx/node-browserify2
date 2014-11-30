'use strict';

var React = require('react');
var Test2 = require('./test2.jsx');
var Test3 = require('./folder1/test3.jsx');

var Test1 = React.createClass({

  render: function() {
    return (
      <div>
        <div>Hello {this.props.name}</div>
        <Test2 {...this.props} />
        <Test3 />
      </div>
    );
  }

});

module.exports = Test1;
