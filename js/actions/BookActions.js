var AppDispatcher = require('../dispatcher/AppDispatcher');
var BookConstants = require('../constants/BookConstants');

var BookActions = {
  create: function(book) {
    AppDispatcher.dispatch({
      actionType: BookConstants.BOOK_CREATE,
      book: book
    });
  },

  update: function(title, newTitle) {
    AppDispatcher.dispatch({
      actionType: BookConstants.BOOK_UPDATE,
      title: title,
      newTitle: newTitle
    });
  },

  destroy: function(title) {
    AppDispatcher.dispatch({
      actionType: BookConstants.BOOK_DESTROY,
      title: title
    });
  }
};

module.exports = BookActions;
