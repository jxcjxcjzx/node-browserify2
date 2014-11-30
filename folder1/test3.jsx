'use strict';

var React = require('react');
var Test2 = require('../test2.jsx');

var Test3 = React.createClass({

  render: function() {
    return (
      <div>
        <hr />
        <Test2 name="test3" />
      </div>
    );
  }

});

module.exports = Test3;
