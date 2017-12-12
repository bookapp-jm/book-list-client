'use strict';

let bookView = {};

bookView.prototype.initIndexPage = function() {
  $('.container').hide();
  $('.book-view').show();
  Book.all.map(bookObject => $('#book-list').append(bookObject));
}