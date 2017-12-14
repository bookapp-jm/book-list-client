'use strict';
console.log('book.js')

var app = app || {};
var __API_URL__ = 'http://localhost:3000'; //can also make it the deployed version which would be heroku_

(function(module) {

  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  function Book(rawDataObj) {
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  }

  Book.prototype.toHtml = function () {
    let template = Handlebars.compile($('#book-list-template').text());
    return template(this);
  };

  Book.all = [];
  Book.loadAll = function (rows) {
    console.log(rows);
    Book.all = rows.sort((a, b) => b.title - a.title).map(bookObject => new Book(bookObject));
    console.log(Book.all);
  };

  Book.fetchOne = function (ctx, callback) { //ctx, callback B/C in routes.js fetchone defined as having a callback
    $.get(`${__API_URL__}/api/v1/books/${ctx.params.book_id}`)
      .then(results => ctx.book = results[0])
      .then(callback)
      .catch(err => errorCallback(err));
  };

  Book.fetchAll = callback => {
    $.get(`${__API_URL__}/api/v1/books`)
      .then(data => Book.loadAll(data))
      .then(callback)
      .catch(err => errorCallback(err));
  };

  Book.create = function (book) {
    $.post(`${__API_URL__}/api/v1/books`, book)
      .then(() => page('/'))
      .catch(err => errorCallback(err));
  };

  module.Book = Book;
})(app);

