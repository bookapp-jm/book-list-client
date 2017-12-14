'use strict';
console.log('book-view.js');

var app = app || {};

(function(module) {
  const bookView = {};

  bookView.initIndexPage = function() {
    $('.container').hide();
    $('.books-view').show();
    app.Book.all.map(book => $('#book-list').append(book.toHtml()));
    console.log(app.Book.all);
  };

  bookView.initCreateFormPage = function() {
    resetView();
    $('.book-view').show();
    $('.nav-menu') ///////////////
  }

  module.bookView = bookView;
})(app);





$(document).ready(function() {
  app.Book.fetchAll(app.bookView.initIndexPage);
});