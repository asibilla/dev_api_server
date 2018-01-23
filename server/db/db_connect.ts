import * as request from 'request';

export class DBConnect {
  private host: string = process.env.DB_HOST;

  private createQueryString(str: string = '') {
    let queryString = '?';
    let queryArray = str.split(',');
    queryArray.forEach((v, index) => {
      if (v.length && v.indexOf('|') > -1) {
        let pair = v.split('|');
        queryString += pair[0] + '=' + pair[1];
        if (index < queryArray.length - 1) {
          queryString += '&';
        }
      }
    });
    return queryString;
  }

  private getUrl(db: string, doc: string = null, query: string = null): string {
    let url = this.host + db;
    if (doc) {
      url += '/' + doc;
    }
    if (query) {
      url += this.createQueryString(query);
    }
    return url;
  }

  public get(db: string, doc: string = null, query: string = null): Promise<any> {
    return new Promise((resolve, reject) => {
      request({
        url: this.getUrl(db, doc, query),
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

  public put(db: string, doc: string = null):Promise<any> {
    return new Promise((resolve, reject) => {
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
