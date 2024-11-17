const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
require('dotenv').config(); // Load environment variables from a .env file

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON data
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://revspeakin:rev%402006@cse-aztecs-cluster.jaero.mongodb.net/?retryWrites=true&w=majority&appName=cse-aztecs-cluster';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes); // Routes for authentication (register and login)
app.use('/api/posts', postRoutes); // Routes for posts (creating and getting posts)

// Serve the static files from the React app (in production mode)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'build')));

  // For any other route, send back index.html (React's frontend)
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  });
}

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// Server Setup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
