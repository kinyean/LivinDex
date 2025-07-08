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
const authRoutes = require('./routes/auth');
const commentRoutes = require('./routes/commentRoutes');
const postRoutes = require('./routes/postRoutes');
const usersRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/upload');
const walletRoutes = require('./routes/walletRoutes');
const subRoutes = require('./routes/subRoutes');

// Use routes
app.use('/auth', authRoutes);
app.use('/comments', commentRoutes);
app.use("/posts", postRoutes);
app.use('/users', usersRoutes);
app.use('/upload', uploadRoutes);
app.use('/wallet', walletRoutes);
app.use('/subscription', subRoutes);

const port = process.env.PORT || 3001; // You can use environment variables for port configuration

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});