var React = require('react');
var BookActions = require('../actions/BookActions');

var Book = React.createClass({
  handleDelete: function() {
    var title = this.props.title;
    BookActions.destroy(title);
  },
  handleEdit: function() {
    console.log('editing');
  },
  render: function() {
    return (
      <div>
       <p>Title: {this.props.title}</p>
       <p>Author: {this.props.author}</p>
       <button name="delete" onClick={this.handleDelete} />
       <button name="edit" onClick={this.handleEdit} />
      </div>
    );
  }
});

module.exports = Book;
