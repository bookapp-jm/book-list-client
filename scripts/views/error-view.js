'use strict';

let errorView = {};

errorVew.prototype.initErrorPage = (err) => {
  $('.container').hide();
  $('.error-view').show();
  $('#error-message').empty();
  let template = Handlebars.compile($('#error-template').text(err));
  $('#error-message').append(template);
};

function errorCallback(err) {
  console.error(err);
  errorView.initErrorPage(err);
}