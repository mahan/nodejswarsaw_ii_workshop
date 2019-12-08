const express = require('express');
const app = express();
const port = 3200;

app.get('/', (req, res) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log(`running at port ${port}`);
});
