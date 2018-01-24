import * as express from 'express';
import { DBConnect } from './db/db_connect';
import * as path from 'path';

// create server
const app = express();
let dbQuery = new DBConnect();

// Allow requests from clientside build.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_HOST);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Static page for root path. Currently not being used.
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Any dbs/docs can be added/retrieved via /api path.
// localhost:{port}/api?action={get|post}&db={db_name}&doc={doc_name}&query={additional_query_params}
app.use('/api', (req: express.Request, res) => {
  let document = req.query.doc || null;
  let queryString = req.query.query || null;

  if (req.query.action === 'post') {
    dbQuery.put(req.query.db, document)
      .then(body => {
        res.json(body).status(200);
      })
      .catch(e => {
        res.json({"error": e}).status(500);
      }
    );
  }
  else {
    dbQuery.get(req.query.db, document, queryString)
      .then(response => {
        res.json(response).status(200);
      })
      .catch(e => {
        res.send(e).status(404);
      }
    );
  }
});

app.listen(process.env.SERVER_PORT, () => {
  // Tell the terminal that the server is ready.
  console.log('the server is listening on port ' + process.env.SERVER_PORT);
});
