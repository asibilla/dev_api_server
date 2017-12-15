import * as request from 'request';

export class DBConnect {
  private host: string = process.env.DB_HOST;

  getUrl(db: string, doc: string = null): string {
    let url = this.host + db;
    if (doc) {
      url += '/' + doc;
    }
    return url;
  }

  get(db: string, doc: string = null): Promise<any> {
    return new Promise((resolve, reject) => {
      request({
        url: this.getUrl(db, doc),
        json: true
      }, (err, res, body) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(body);
        }
      });
    });
  }

  put(db: string, doc: string = null) {
    return new Promise((resolve, reject) => {
      console.log('put request', this.getUrl(db, doc));
      request.put(this.getUrl(db, doc), (err, res, body) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(body);
        }
      });
    });
  }
}
