'use strict';

page('/', () => app.Book.fetchAll(app.bookView.initIndexPage)), (ctx, next) => app.adminView.verify(ctx, next);

page('/books/new', ctx => app.bookView.initFormPage(ctx));

page('/books/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage)), (ctx, next) => app.adminView.verify(ctx, next);

page('/admin', ctx => app.adminView.initAdminPage(ctx));

page('/books/:book_id/update', (ctx, next) => app.Book.fetchOne(ctx, next), ctx => app.bookView.initUpdateFormPage(ctx));

// page('/*', () => app.Book.fetchAll(app.bookView.initIndexPage));

// app.get('*', (request, response) => response.redirect(CLIENT_URL));

page();