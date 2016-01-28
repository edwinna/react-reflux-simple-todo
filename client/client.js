require('es5-shim/es5-shim');
require('es5-shim/es5-sham');

var React = require('react/addons');
var CommentBox = React.createClass({
  render: function() {
    return (
      <div>
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});
React.render(
  <CommentBox />,
  document.getElementById('app')
);
