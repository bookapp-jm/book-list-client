'use strict';
console.log('book-view.js');

var app = app || {};

(function(module) {
  $('.icon-menu').on('click', function(e) {
    $('.nav-menu').slideDown(750);
  });

  const bookView = {};

  bookView.initIndexPage = function(ctx) {
    $('.container').hide();
    $('.nav-menu').slideDown(750);
    $('.books-view').show();
    $('#book-list').empty();
    app.Book.all.map(book => $('#book-list').append(book.toHtml()));
    console.log(app.Book.all);
  };

  bookView.initDetailPage = function(ctx) {
    $('.container').hide();
    $('.nav-menu').slideDown(750);
    $('.book-view').show(); //shows the book view container
    $('#book-detail').empty(); //to clear out any prior entries
    let template = Handlebars.compile($('#book-detail-template').text()); //compiles the detail template with given information as text
    $('#book-detail').append(template(ctx)); //appends the template with given contextual item
  };

  bookView.initFormPage = function() {
    $('.container').hide();
    $('.nav-menu').slideDown(750);
    $('.create-book').show();
    $('#new-book').on('submit', function(e){
      e.preventDefault();
      console.log('****', e);
      let book = {
        title: e.target.title.value,
        author: e.target.author.value,
        isbn: e.target.isbn.value,
        image_url: e.target.image_url.value,
        description: e.target.description.value
      };
      console.log('book', book);
      app.Book.create(book);
    });
  };

  module.bookView = bookView;
})(app);


$(document).ready(function() {
  app.Book.fetchAll(app.bookView.initIndexPage);
});