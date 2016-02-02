var React = require('react');
var TodoItem = require('./TodoItem');
var TodoActions = require('../actions/TodoActions');

var TodoApp = React.createClass({
    getInitialState: function(){
        return{
            editValue: ""
        }
    },
    addNewItem: function(e){
        e.preventDefault();
        TodoActions.addNewItem(this.state.editValue);
    },
    render: function(){
        var _todolist = this.props.list;
        // _todolist = _todolist.filter(function(item){
        //     return item.completed != 1;
        // });
        var itemList = _todolist.map(function(item){
            return <TodoItem text={item.text} completed={item.completed} id={item.id}> </TodoItem>;
        });
        return(
            <section>
                <div className="add-new">
                    <input type="text" placeholder="添加任务" onKeyUp={this.addNewItem} valueLink={this.linkState('editValue')}/>
                </div>
                <ul className="todo-list">
                    {itemList}
                </ul>
            </section>
        )
    }
});

module.exports = TodoApp;
