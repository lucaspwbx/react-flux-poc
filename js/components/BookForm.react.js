var React = require('react');
var BookActions = require('../actions/BookActions');

var BookForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var title = this.refs.title.getDOMNode().value;
    var author = this.refs.author.getDOMNode().value;
    var book = { title: title, author: author };
    BookActions.create(book);
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" ref="title" name="title" />
        <label htmlFor="author">Author</label>
        <input type="text" ref="author" name="author" />
        <input type="submit" value="Save new book"/>
      </form>
    );
  }
});

module.exports = BookForm;
