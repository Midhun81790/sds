const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const doubtRoutes = require('./routes/doubtRoutes');
const replyRoutes = require('./routes/replyRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ message: 'Smart Doubt Solver backend running' });
});

app.use('/auth', authRoutes);
app.use('/doubts', doubtRoutes);
app.use('/replies', replyRoutes);

const clientBuildPath = path.join(__dirname, '..', 'frontend', 'build');
const apiPrefixes = ['/auth', '/doubts', '/replies'];
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  // Catch-all only for GET requests that are not hitting API routes
  app.use((req, res, next) => {
    if (req.method !== 'GET' || apiPrefixes.some((prefix) => req.path.startsWith(prefix))) {
      return next();
    }
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(() => {
    process.exit(1);
  });
