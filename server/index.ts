import * as express from 'express';
import { DBConnect } from './db/db_connect';

// create server
const app = express();

app.get('/api', (req, res) => {
  let connection = new DBConnect();
  connection.getAll().then(response => {
    res.send(response).status(200);
  }).catch(e => {
    res.send(e).status(400);
  });
});

app.listen(4000, () => {
  console.log('the server is running');
});
