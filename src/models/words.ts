import * as Knex from 'knex';

export class Words {
  getWords(db: Knex, bookId: string, word) {
    try {
      return db(bookId.toLowerCase()).select('*').where('headWord', word);
    } catch (error) {
      return db('full_words').select('*').where('bookId', bookId).where('headWord', word);
    }
  }
}