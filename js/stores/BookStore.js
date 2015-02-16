var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var BookConstants = require('../constants/BookConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _books = {};
var _books2 = [];

function create(book) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  //var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  //_books[id] = {
  //  id: id,
   // title: book.title,
   // author: book.author
  //};
  _books2.push(book);
}

function update(id, updates) {
  //_books[id] = assign({}, _books[id], updates);
}

function destroy(id) {
  //delete _books[id];
}

var BookStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return _books2;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var book;

  switch(action.actionType) {
    case BookConstants.BOOK_CREATE:
      book = action.book;
      create(book);
      BookStore.emitChange();
      break;

    case BookConstants.BOOK_UPDATE:
      book = action.book;
      update(action.id, { title: book.title, author: book.author });
      BookStore.emitChange();
      break;

    case BookConstants.BOOK_DESTROY:
      destroy(action.id);
      BookStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = BookStore;
