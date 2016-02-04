var Reflux = require('Reflux');
var TodoActions = require('../actions/TodoActions');
var counter = 0;
var localStorage = window.localStorage;
var storekey = "enjoy";
var TodoStore = Reflux.createStore({
    listenables: [TodoActions],
    onAddNewItem: function(label){
        var list = this.list;
        if(Object.prototype.toString.call(list) === '[object Array]'){
            this.updateTodoList([{
                "label": label,
                "date": new Date(),
                "completed": !!0,
                "id": counter++
            }].concat(list));
        }
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
                item.label = text;
            }
        });
        this.updateTodoList(this.list);
    },
    onRemoveItem: function(idx){

        this.list = this.list.filter(function(item){
            return item.id !== idx;
        });
        this.updateTodoList(this.list);
    },
    getInitialState: function(){
        var todos = localStorage.getItem(storekey);
        //localdb不存在就新建一个默认的
        if(typeof todos == 'string'){
            todos = JSON.parse(todos);
        }
        if(!todos){
            this.list = [{
                "date": new Date(),
                "completed": !!0,
                "label": 'goods collection time is coming',
                "id": counter++
            }];
        }else{
            this.list = todos;
        }
        return this.list;
    },
    updateTodoList: function(list){
        localStorage.setItem(storekey,JSON.stringify(list));
        this.list = list;
        this.trigger(list);
    }
})
module.exports = TodoStore;
