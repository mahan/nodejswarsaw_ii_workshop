
const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3200;

app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log(`running at port ${port}`);
});
