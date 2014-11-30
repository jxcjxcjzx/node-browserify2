'use strict';

var React = require('react');

var Test1 = React.createClass({

  render: function() {
    return (
      <div>Hello {this.props.name}</div>
    );
  }

});

module.exports = Test1;
