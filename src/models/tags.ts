import * as Knex from 'knex';

export class Tags {
  getTags(db: Knex) {
    return db('tags').select('id', 'tag_name', 'tag_url');
  }
}