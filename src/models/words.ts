import * as Knex from 'knex';

export class Words {
  getWords(db: Knex, bookId, word) {
    try {
      return db(bookId).select('*').where('headWord', word);
    } catch (error) {
      return db('full_words').select('*').where('bookId', bookId).where('headWord', word);
    }
  }
}