// const mathFunctionModel = require('./_s')
const LoadMathService = require("./_services/loadDataService");
const LoadMathServiceInstance = new LoadMathService();
const resultMathJson = LoadMathServiceInstance.loadData();

const express = require('express')
const app = express()
const port = 3000


app.get('/', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send('Hello World!')
})

app.get('/api/hello', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.json({ message: 'Hello from the backend!' });
});

app.get('/api/loadData', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send(resultMathJson); //sends it to UI
});

app.listen(port, () => {
  //console.log(`Example app listening on port ${port}`)
})
