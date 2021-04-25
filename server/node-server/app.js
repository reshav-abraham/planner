const express = require('express');
var cors = require('cors');
const db = require('./db');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({ type: ["application/json", "application/csp-report"] }));
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
  console.log('create User', req.body);
  let planId = req.body.planId;
  db.createNewPlan(planId);
  res.json({"message":"success"});
});

app.get('/plans', async (req, res, next) => {
  try {
    let plans = await db.retrievePlans("");
    res.json(JSON.stringify(plans));
  } catch(e){
    console.log(e);
    res.sendStatus(500);
  }
});

app.delete('/plans', async (req, res, next) => {
  try {
    let planId = req.query.planId;
    console.log("data", req.query);
    db.deletePlan(planId);
    res.sendStatus(200);
  } catch(e){
    console.log(e);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});