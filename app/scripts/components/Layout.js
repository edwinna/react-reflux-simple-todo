var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var TodoStore = require('../stores/TodoStore');
var RouteHandler = Router.RouteHandler;

var Layout = React.createClass({
      mixins: [ Reflux.connect(TodoStore,"list") ],
      render: function() {
          return (
              <div className="todo-container">
                    <RouteHandler list={this.state.list}/>
              </div>
            );
      }
});

module.exports = Layout;
