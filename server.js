const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

var db;

MongoClient.connect('mongodb://soylog:soylog@ds015995.mlab.com:15995/soylogs', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  });
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

// returns an actual file index.html
app.get('/', (req, res) => {
  db.collection('soylogs').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {soylogs: result});
  });
});

//create
app.post('/soylogs', (req, res) => {
  db.collection('soylogs').save(req.body, (err, result) => {
    if (err) return console.log(err) + 'fucking hell bro';
    console.log('saved to database')
    res.redirect('/')
  });
});

//update
app.put('/soylogs', (req, res) => {
  db.collection('soylogs')
  .findOneAndUpdate({meal: 'Yoda'}, {
    $set: {
      meal: req.body.meal,
      notes: req.body.notes
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  });
});

app.delete('/soylogs', (req, res) => {
  db.collection('soylogs').findOneAndDelete({meal: req.body.meal},
  (err, result) => {
    if (err) return res.send(500, err)
    res.send('A darth vader quote got deleted')
  });
});
