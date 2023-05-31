import * as Knex from 'knex';

export class Words {
  getWords(db: Knex, bookId, word) {
    return db('full_words').select('*').where('bookId', bookId).where('headWord', word);
  }
}