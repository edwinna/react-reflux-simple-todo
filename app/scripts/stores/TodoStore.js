var Reflux = require('Reflux');
var TodoActions = require('../actions/TodoActions');
var counter = 0;
var localStorage = window.localStorage;
var TodoStore = Reflux.createStore({
    listenables: [TodoActions],
    onAddNewItem: function(label){
        this.updateTodoList([{
            text: label,
            date: new Date(),
            completed: !!0,
            id: ++counter
        }].concat(this.list));
    },
    onToggleItem: function(id){
        this.list.forEach(function(item){
            if(item.id == id){
                item.completed = !item.completed;
            }
        });
        this.updateTodoList(this.list);
    },
    onEditItem: function(key, text){
        this.list.forEach(function(item){
            if(item.id == key){
                item.text = text;
            }
        });
        this.updateTodoList(this.list);
    },
    onRemoveItem: function(id){
        this.list.filter(function(item){
            return item.id != id;
        });
        this.updateTodoList(this.list);
    },
    getInitialState: function(){
        var todos = localStorage.getItem('todos');
        //localdb不存在就新建一个默认的
        if(!todos){
            this.list = [{
                text: 'this is first Todo',
                date: new Date(),
                completed: !!0,
                id: counter++
            }];
        }else{
            this.list = todos;
        }
        return this.list;
    },
    updateTodoList: function(list){
        localStorage.setItem('todos',JSON.stringify(list));
        this.list = list;
        this.trigger(list);
    }
})
module.exports = TodoStore;
