const express = require('express');
const app = express();
const cors = require('cors'); 


// Use CORS middleware
app.use(cors()); // This allows all origins by default
app.use(express.json());

// Example defining a route in Express

app.get('/ping', (req, res) => {
    res.json({
        message: 'pong', time: new Date().toISOString()
    });
});

app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

// Include route files
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const commentRoutes = require('./routes/commentRoutes');

// Use routes
app.use('/users', usersRoute);
app.use('/auth', authRoute);
app.use('/comments', commentRoutes);

const port = 3001; // You can use environment variables for port configuration

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});