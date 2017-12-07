import * as express from 'express';
import { DBConnect } from './db/db_connect';
import * as path from 'path';

// create server
const app = express();

app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));

  /*
  let connection = new DBConnect();
  connection.getAll().then(response => {
    res.send(__filename);
  }).catch(e => {
    res.send(__filename);
    //res.sendFile(path.join(__filename, 'dist', 'index.html'));
  });
  */
});

app.listen(4000, () => {
  console.log('the server is running');
});
