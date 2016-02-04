var React = require('react');
var ReactRouter = require('react-router');
var TodoItem = require('./TodoItem');
var TodoActions = require('../actions/TodoActions');

var TodoApp = React.createClass({
    mixins: [ReactRouter.States],
    propTypes: {
        list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    },
    getInitialState: function(){
        return{
            editValue: ""
        }
    },
    addNewItem: function(event){
        event.preventDefault();
        if(event.which == 13){
            var input = this.refs.newInput.getDOMNode();
            TodoActions.addNewItem(input.value);
            input.value = "";
        }
    },
    render: function(){
        var _todolist = this.props.list;
        var itemList =_todolist.map(function(item,index){
            return <TodoItem label={item.label} completed={item.completed} id={item.id} key={index}> </TodoItem>;
        });
        return(
            <section>
                <div className="add-new">
                    <input ref="newInput" type="text" placeholder="add a new task" onKeyUp={this.addNewItem}/>
                </div>
                <ul className="todo-list">
                    {itemList}
                </ul>
            </section>
        )
    }
});

module.exports = TodoApp;
