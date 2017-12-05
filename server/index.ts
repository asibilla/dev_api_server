import * as express from 'express';

// create server
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World').status(200);
});

app.listen(3000, () => {
  console.log('server started and changed again wut m8 bruh~');
});
