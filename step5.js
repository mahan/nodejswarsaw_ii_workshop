const express = require('express');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const app = express();
const port = 3200;

// middleware
app.use(bodyparser.json());
app.use(morgan('tiny'));

//Route handlers
app.get('/', (req, res) => {
  res.send('OK');
});

app.post('/test', (req, res) => {
  res.send(JSON.stringify(req.body, null, 2));
});

//Start server
app.listen(port, () => {
  console.log(`running at port ${port}`);
});
