'use strict';

var app = app || {};

(function (module) {
  const adminView = {};

  adminView.initAdminPage = function (ctx) {
    $('.nav-links').slideDown(750);
    $('.admin-view').show();

    $('#admin-form').on('submit', function(e) {
      e.preventDefault();
      let token = e.target.passphrase.value;

      $.get(`${__API_URL__}/api/v1/admin`, {token})
        .then(response => {
          if (response) console.log('token');
          else console.log('no token');
          page('/');
        })
        .catch(() => page('/'));
    });
  };

  adminView.verify = function (ctx) {
    if(!localStorage) $('.admin').addClass('admin-only');
    else $('.admin').show();
    // next();
  };

  module.adminView = adminView;
})(app);