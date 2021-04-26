const express = require('express');
var cors = require('cors');
const db = require('./db');
const app = express();
var bodyParser = require('body-parser');
// app.use(bodyParser.json({ type: ["application/json", "application/csp-report"] }));
app.use(bodyParser.urlencoded({
  extended: true
}));
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

app.get('/tasks', async (req, res, next) => {
  try {
    let planId = req.query.planId;
    console.log("data", req.query);
    let tasks = await db.getAllTasksFromPlan(planId);
    res.json(tasks);
  } catch(e){
    console.log(e);
    res.sendStatus(500);
  }
});

app.post('/createTask', async (req, res, next) => {
  console.log("createTask!");
  try {
    let planId = req.query.planId;
    let taskId = req.body.task;
    let subTasks = req.body.subTasks;

    db.createNewTask(planId, taskId)
    subTasks.forEach(subTask => {
      // db dump
      db.createNewSubTask(planId, taskId, subTask);
    });
    res.json({"message":"success"});
  } catch(e){
    console.log(e);
    res.sendStatus(500);
  }
});


app.put('/updateSubTask', async (req, res, next) => {
  console.log("updateSubTask!", req.body);
  try {
    let planId = req.body.planId;
    let taskId = req.body.taskId;
    let subTaskId = req.body.subTaskId;
    let state = req.body.state;

    db.updateSubTask(planId, taskId, subTaskId, state);
    res.json({"message":"success"});
  } catch(e){
    console.log(e);
    res.sendStatus(500);
  }
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});