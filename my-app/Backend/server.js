const express = require('express');
const app = express();
const cors = require('cors'); 


// Use CORS middleware
app.use(cors()); // This allows all origins by default
app.use(express.json());

// Example defining a route in Express
app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

// Include route files
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');

// Use routes
app.use('/users', usersRoute);
app.use('/auth', authRoute);

const port = 3001; // You can use environment variables for port configuration

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});