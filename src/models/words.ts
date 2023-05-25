import * as Knex from 'knex';

export class Words {
  getWords(db: Knex, tableName, word) {
    return db(tableName).select('*').where('headWord', word).limit(1);
  }
}