'use strict';

page('/', bookView.initIndexPage);
page('books/:book_id', Book.fetchOne);
page('/books/new', Book.create);

page();