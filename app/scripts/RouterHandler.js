var React = require('react');
var Router = require('react-router');
var ReactDOM = require('react-dom');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var TodoApp = require('./components/TodoApp');
var Layout = require('./components/Layout');
var routes =  (
    <Route name="layout" handler={Layout}  path="/" >
        <DefaultRoute handler={TodoApp}/>
    </Route>
);

exports.start = function(){
    Router.run(routes, function(Handler){
        ReactDOM.render(<Handler />,
             document.getElementById('app'));
    })
}
