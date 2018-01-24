import * as request from 'request';

const privateEntry = /^_/;

/**
 * Response and Document classes are used to standardize responses to
 * Get requests. Private CouchDB entries will be filtered out and response
 * will always be an array of objects using 'key' and 'value' properties.
 */
class Response {
  public data: any[];

  constructor(
    response: any = {},
    private hasDocs: boolean = false
  ) {
    if (!response) {
      this.data = [];
    }
    else {
      this.parseData(response);
    }
  }

  private parseData(data: any) {
    if (!this.hasDocs) {
      this.data = data.filter((v: string) => !privateEntry.test(v)).map((v: string, ind: number) => { return {id: (ind + 1), value: v} });
    }
    else if (data.rows) {
      let rows = <Document[]>data.rows.map((v: any) => new Document(v)).filter((v: Document) => !privateEntry.test(v.id));
      this.data = rows.map((v: Document) => { return {'id' : v.id, value: v.value } });
    }
    else {
      let doc = new Document(data);
      this.data = [{id: doc.id, value: doc.value}];
    }
  }
}

class Document {
  constructor(
    private sourceObject: any = {}
  ) {}

  public get id() {
    return this.sourceObject.id || '';
  }
  public get value() {
    if (!this.sourceObject.doc) {
      return {};
    }
    else {
      let value: any = {};
      for (let key in this.sourceObject.doc) {
        if (!privateEntry.test(key)) {
          value[key] = this.sourceObject.doc[key];
        }
      }
      return value;
    }

  }
}

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
      }, (err, res, response) => {
        if (err) {
          reject(err);
        }
        else {
          let formatedResponse = new Response(response, !(!doc));
          resolve(formatedResponse.data);
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
