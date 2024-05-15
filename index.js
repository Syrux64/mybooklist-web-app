const express = require('express');
const cors = require('cors');
const axios = require('axios');
const apiRoutes = require('./Backend/Routes/routes.api.js');
const dbRoutes = require('./Backend/Database/database.js')
const path = require('path');

require('dotenv').config();

const app = express();
app.use(cors());

app.use(express.json());

app.use(express.static('my-book-list/dist'));

const PORT = process.env.PORT;
// const apiKey = process.env.API_KEY


app.use('/api', apiRoutes);
app.use('/db', dbRoutes);
// // app.use('/', routes);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'my-book-list/dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
