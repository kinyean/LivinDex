const express = require('express');
const app = express();
const cors = require('cors'); 


// Use CORS middleware
app.use(cors()); // This allows all origins by default

// Example defining a route in Express
app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

// Include route files
const usersRoute = require('./routes/users');

// Use routes
app.use('/users', usersRoute);

const port = process.env.PORT || 3001; // You can use environment variables for port configuration

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});