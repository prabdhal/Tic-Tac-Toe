require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');

app.get('/', (req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' });
  fs.createReadStream('index.html').pipe(res);
});

try {
  app.listen(port, console.log(`Listening to port ${port}`));
} catch (err) {
  console.log(err);
}
