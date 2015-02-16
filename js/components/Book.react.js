var React = require('react');

var Book = React.createClass({
  render: function() {
    return (
      <div>
       <p>Title: {this.props.title}</p>
       <p>Author: {this.props.author}</p>
      </div>
    );
  }
});

module.exports = Book;
