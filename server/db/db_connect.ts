import * as request from 'request';
import { host, test_db } from './db_constants';

export class DBConnect {
  private host: string = host;
  private testDB:string = test_db;

  init() {
    return host;
  }

  getAll() {
    return new Promise((resolve, reject) => {
      request({
        url: this.host + '/' + this.testDB + '/_all_docs',
        json: true
      }, (err, res, body) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(body.rows);
        }
      })
    });
  }
}
