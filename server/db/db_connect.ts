import * as request from 'request';
import { host, test_db } from './db_constants';

export class DBConnect {
  private host: string = host;
  private testDB:string = test_db;

  init() {
    return host;
  }

  get(db: string, doc: string = null): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = this.host + '/' + db + '/';
      if (doc) {
        url += doc;
      }
      request({
        url: url,
        json: true
      }, (err, res, body) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(body);
        }
      })
    });
  }
}
