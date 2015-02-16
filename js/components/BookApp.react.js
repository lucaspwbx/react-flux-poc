var React = require('react');
var BookStore = require('../stores/BookStore');
var Book = require('./Book.react');
var BookForm = require('./BookForm.react');

function getBookState() {
  return {
    books: BookStore.getAll()
  };
}

var BookApp = React.createClass({
  getInitialState: function() {
    return getBookState();
  },

  componentDidMount: function() {
    BookStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    BookStore.removeChangeListener(this._onChange);
  },

  render: function() {
    books = this.state.books.map(function(book, index) {
      return <Book key={index} title={book.title} author={book.author} />;
    });

    return (
      <div>
        <h1>Hello book</h1>
        {books}
        <BookForm />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getBookState());
  }
});

module.exports = BookApp;
