const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const cors = require('cors');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({origin: 'http://localhost:3000'}))

// app.use('/api/goals', require('./routes/goalRoutes'))
// app.use('/api/latest', require('./routes/latestRoutes'));
app.use('/api/home', require('./routes/homeRoutes'));
app.use('/api/latest', require('./routes/latestRoutes'));


app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`))
