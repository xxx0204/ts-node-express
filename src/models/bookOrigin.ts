import * as Knex from 'knex';

export class BookOrigin {
  getBookOrigin(db: Knex) {
    return db('book_origin').select('id', 'origin_url', 'origin_name', 'desc');
  }
}