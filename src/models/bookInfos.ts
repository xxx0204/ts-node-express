import * as Knex from 'knex';

export class BookInfos {
  getBookInfos(db: Knex) {
    return db('books_info').select('id', 'cover', 'book_origin_id', 'size', 'introduce', 'word_num', 'recite_user_num', 'key', 'title', 'offlinedata', 'version', 'tags');
  }

  getAllKeys(db: Knex, id: number) {
    return db('books_info').select('id', 'key', 'title', 'offlinedata').where('id', '>=', id);
  }
}