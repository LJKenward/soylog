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
