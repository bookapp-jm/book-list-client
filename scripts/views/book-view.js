'use strict';
console.log('book-view.js');

var app = app || {};

(function(module) {
  $('.icon-menu').on('click', function(e) {
    $('.nav-links').slideDown(750);
  });

  const bookView = {};

  bookView.initIndexPage = function(ctx) {
    $('.container').hide();
    $('.nav-links').slideDown(750);
    $('.books-view').show();
    $('#book-list').empty();
    app.Book.all.map(book => $('#book-list').append(book.toHtml()));
    console.log(app.Book.all);
  };

  bookView.initDetailPage = function(ctx) {
    $('.container').hide();
    $('.nav-links').slideDown(750);
    $('.book-view').show(); //shows the book view container
    $('#book-detail').empty(); //to clear out any prior entries
    let template = Handlebars.compile($('#book-detail-template').text()); //compiles the detail template with given information as text
    $('#book-detail').append(template(ctx)); //appends the template with given contextual item

    $('#update-button').on('click', function() {
      page(`/books/${$(this).data('book_id')}/update`);
    });

    $('#delete-button').on('click', function () {
      app.Book.destroy($(this).data('book_id'));
    });
    // next();
  };

  bookView.initFormPage = function() {
    $('.container').hide();
    $('.nav-links').slideDown(750);
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

  bookView.initUpdateFormPage = function (ctx) {
    $('.container').hide();
    $('.nav-links').slideDown(750);
    $('.update-view').show();
    $('.update-form input[name="title"]').val(ctx.book.title);
    $('.update-form input[name="author"]').val(ctx.book.author);
    $('.update-form input[name="isbn"]').val(ctx.book.isnb);
    $('.update-form input[name="image_url"]').val(ctx.book.image_url);
    $('.update-form textarea[name="description"]').val(ctx.book.description);

    $('.update-form').on('submit', function(e) {
      e.preventDefault();

      let book = {
        book_id: ctx.book.book_id,
        title: e.target.title.value,
        author: e.target.author.value,
        isbn: e.target.isbn.value,
        image_url: e.target.image_url.value,
        description: e.target.description.value,
      };

      module.Book.update(book, book.book_id);
    });
  };

  module.bookView = bookView;
})(app);


$(document).ready(function() {
  app.Book.fetchAll(app.bookView.initIndexPage);
});