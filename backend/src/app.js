const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const { errorResponse } = require('./utils/responseUtil');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', userRoutes);
app.use(errorResponse);

module.exports = app;