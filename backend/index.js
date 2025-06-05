const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const postRoute = require('./routes/post/postroute');

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/post', postRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});