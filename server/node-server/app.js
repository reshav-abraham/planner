const express = require('express');
const db = require('./db');
const app = express()
const port = 5000

app.get('/', async (req, res, next) => {
  try {
    let results = await db.all();
    res.json(results);
  } catch(e){
    console.log(e);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});