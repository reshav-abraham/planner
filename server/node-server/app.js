const express = require('express');
var cors = require('cors');
const db = require('./db');
const app = express();
app.use(cors());
app.set('port', process.env.PORT || 3000);
const port = 8000;

app.get('/', async (req, res, next) => {
  try {
    let results = await db.all();
    res.json(results);
  } catch(e){
    console.log(e);
    res.sendStatus(500);
  }
});

app.post('/createUser', async (req, res, next) => {
  console.log('create User');
  // try {
  //   let results = await db.all();
  //   res.json(results);
  // } catch(e){
  //   console.log(e);
  //   res.sendStatus(500);
  // }
});

app.post('/createPlan', async (req, res, next) => {
  console.log('create User');
  res.json({"message":"success"});
  // try {
  //   let results = await db.all();
  //   res.json(results);
  // } catch(e){
  //   console.log(e);
  //   res.sendStatus(500);
  // }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});