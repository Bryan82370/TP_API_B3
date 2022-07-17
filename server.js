const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const API_KEY = "8f94826adab8ffebbeadb4f9e161b2dc";

const Routes = require('./route');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const HTTP_PORT = 8000;

app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`);
});

const requireJsonContent = () => {
  return (req, res, next) => {
    if (req.headers['content-type'] !== 'application/json') {
        res.status(400).send('Server requires application/json')
    } else {
      next()
    }
  }
}

app.post('/', requireJsonContent(), (req, res, next) => {
  res.send('You sent JSON');
})
// Basic route
app.get('/', (req, res, next) => {
    res.json({ message: 'Hello World' });
});

// Routes "API"
app.use('/api', Routes);


// PROTECT ALL ROUTES THAT FOLLOW
app.use((req, res, next) => {
    const apiKey = req.get('Authorization')
    if (!apiKey || apiKey !== `Bearer ${API_KEY}`) {
      res.status(401).json({error: 'unauthorised'})
    } else {
      next()
    }
  })