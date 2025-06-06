const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const postRoute = require('./routes/post/postroute');
const adminroute = require('./routes/admin/adminroute');

app.use(cors(
    {
        origin: process.env.url ,
        methods: 'GET,POST,DELETE',
        credentials: true 
    }
));
app.use(bodyParser.json());

app.get('/awake-server', (_req, res) => {
    res.sendStatus(200);
});

app.use('/api/post', postRoute);
app.use('/api/admin', adminroute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});