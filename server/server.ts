import * as express from 'express';
import { DBConnect } from './db/db_connect';
import * as path from 'path';

// create server
const app = express();
let dbQuery = new DBConnect();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_HOST);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.use('/api', (req: express.Request, res) => {
  let document = req.query.doc || null;

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
    dbQuery.get(req.query.db, document)
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
  console.log('the server is running on port ' + process.env.SERVER_PORT);
});
