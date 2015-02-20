var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var BookConstants = require('../constants/BookConstants');
var assign = require('object-assign');
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var _books = [];

function create(book) {
  _books.push(book);
}

function update(title, newTitle) {
  var index = _.findIndex(_books, function(book) {
    return book.title == title;
  });
  _books[index].title = newTitle;
}

function destroy(title) {
  _.remove(_books, function(book) {
    return book.title == title;
  });
}

var BookStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return _books;
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
      //book = action.book;
      //update(action.id, { title: book.title, author: book.author });
      update(action.title, action.newTitle);
      BookStore.emitChange();
      break;

    case BookConstants.BOOK_DESTROY:
      destroy(action.title);
      BookStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = BookStore;
