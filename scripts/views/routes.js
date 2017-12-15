// import { URL } from "url";

'use strict';

page('/', () => app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/new', ctx => app.bookView.initFormPage(ctx));
page('/books/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage));

page('/*', () => app.Book.fetchAll(app.bookView.initIndexPage));

// app.get('*', (request, response) => response.redirect(CLIENT_URL));

page();