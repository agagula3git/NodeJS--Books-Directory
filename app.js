const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/books', require('./routes/api/books'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));