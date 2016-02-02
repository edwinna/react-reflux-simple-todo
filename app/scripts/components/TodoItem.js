var React = require('react');
var TodoActions = require('../actions/TodoActions');
var TodoItem = React.createClass({
    propTypes: {
        completed:React.PropTypes.bool.isRequired,
        text: React.PropTypes.string.isRequired,
        id: React.PropTypes.number.isRequired
    },
    getInitialState:function(){
        return{}
    },
    //点击删除
    toggleChange: function(){
        TodoActions.toggleItem(this.prop.id);
    },
    handleKeyUp: function(evt){
        evt.preventDefault();
        var text = this.state.editValue;
        if(evt.which == 13 && text){
            //按下enter键
            this.refs.editInput.getDOMNode().blur();
        }else if(evt.which == 27){
            //按下esc键
            this.setState({
                isEditing: false
            }, function(){
                this.refs.editInput.getDOMNode().blur();
            })
        }
    },
    //处理双击
    handleEditClick: function(e){
        e.preventDefault();
        this.setState({
            isEditing: true,
            editValue: this.props.text
        },function(){
            this.refs.editInput.getDOMNode().focus();
        });
    },
    handleBlur: function(e){
        e.preventDefault();
        var text = this.state.editValue;
        TodoActions.editItem(this.props.id, text);
        this.setState({
            isEditing: false
        });
    },
    handleDestroy: function(e){
        e.preventDefault();
        TodoActions.removeItem(this.prop.id);
    },
    render: function(){
        return(
            <li className="todo-item">
                <div className="row" id={this.props.id}>
                    <input type="checkbox" checked={!!this.props.completed} onChange={this.toggleChange}/>
                    <label class="text" onDoubleClick={this.handleEditClick}>{this.props.text}</label>
                    <input type="button" value="Delete" onClick={this.handleDestroy} />
                </div>
                <input ref="editInput" className="todo-edit" type="text" valueLink={this.linkState('editValue')} onBlur={handleBlur} onKeyUp={handleKeyUp} />
            </li>
        )
    }
})

module.exports = TodoItem;
