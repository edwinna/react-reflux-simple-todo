var Reflux = require('Reflux');

var TodoActions = Reflux.createActions([
    'getTodoList',
    'addNewItem',
    'toggleItem',
    'removeItem',
    'editItem'
]);

module.exports = TodoActions;
