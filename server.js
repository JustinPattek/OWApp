const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const heroes = require('./routes/api/heroes');
const leagues = require('./routes/api/leagues');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').overwatchURI;

// Connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/heroes', heroes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));