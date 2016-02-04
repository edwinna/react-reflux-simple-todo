var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
// var React = require('react/dist/react-width-addons');
var TodoActions = require('../actions/TodoActions');
var TodoItem = React.createClass({
    propTypes: {
        completed:React.PropTypes.bool.isRequired,
        label: React.PropTypes.string.isRequired,
        id: React.PropTypes.number.isRequired
    },
    mixins: [LinkedStateMixin],
    getInitialState:function(){
        return{
        }
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
            editValue: this.props.label
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
        TodoActions.removeItem(this.props.id);
    },
    render: function(){
        return(
            <li className="todo-item">
                <div className="row" id={this.props.id}>
                    <input type="checkbox" checked={!!this.props.completed} onChange={this.toggleChange}/>
                    <label className="label">{this.props.label}</label>
                    <input type="button" value="Delete" onClick={this.handleDestroy} />
                </div>
                <input onDoubleClick={this.handleEditClick} ref="editInput" className="todo-edit" type="text" onBlur={this.handleBlur} onKeyUp={this.handleKeyUp} valueLink={this.linkState('editValue')}  />
            </li>
        )
    }
})

module.exports = TodoItem;
