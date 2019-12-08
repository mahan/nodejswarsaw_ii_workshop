
const express = require('express');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const app = express();
const port = 3200;

/* In-Memory Database - DO NOT USE FOR ANYTHING SERIOUS! */
var reservations = [];
var get_max_id = () => {
  return Math.max.apply(null, [0].concat(reservations.map(({ id }) => id)));
};
var validate_reservation = (r) => {
  return (typeof r.customer_name !== 'undefined' && typeof r.table_size !== 'undefined' && typeof r.arrival_time !== 'undefined');
}
var get_reservation_by_id = (id) => {
  return reservations.find(r => {return r.id === id});
}
var delete_reservation_id = (id) => {
  var found = false;
  reservations = reservations.filter(r => {if (r.id === id) {found = true}; return r.id !== id});
  return found;
}

// middleware
app.use(bodyparser.json());
app.use(morgan('tiny'));

//Route handlers
app.get('/', (req, res) => {
  res.send('OK');
});

app.post('/reservation', (req, res) => {
  if (!validate_reservation(req.body)) {
    return res.status(400).json({
      message: 'reservation not correct'
    });
  }
  reservations.push({
    id: get_max_id()+1,
    customer_name: req.body.customer_name,
    table_size: req.body.table_size,
    arrival_time: req.body.arrival_time
  });
  res.status(200).json({
      message: "success"
  });
});

app.get('/reservations', (req, res) => {
  res.status(200).json(reservations);
});

app.get('/reservation/:id', (req, res) => {
  var id = parseInt(req.params.id)
  var reservation = get_reservation_by_id(id)
  if (typeof reservation === 'undefined') {
    return res.status(400).json({
      message: 'reservation not found'
    });    
  }
  res.status(200).json(reservation);
});

app.delete('/reservation/:id', (req, res) => {
  var id = parseInt(req.params.id)
  if (!delete_reservation_id(id)) {
    return res.status(400).json({
      message: 'reservation not found'
    });    
  }
    res.status(200).json({
      message: "success"
  });
});

//Start server
app.listen(port, () => {
  console.log(`running at port ${port}`);
});
