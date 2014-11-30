'use strict';

var React = require('react');

var Test1 = React.createClass({

  render: function() {
    return (
      React.createElement('div', null, 'Hello ', this.props.name)
    );
  }

});

module.exports = Test1;
