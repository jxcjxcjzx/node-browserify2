'use strict';

var React = require('react');

var Test2 = React.createClass({

  render: function() {
    return (
      <div>Goodbye {this.props.name}</div>
    );
  }

});

module.exports = Test2;
