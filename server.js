// server.js
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import connectDB from './db/db.js';  // Import your database connection function
import careerRoutes from './routes/careerRoutes.js'; 
import contactRoutes from './routes/contactRoutes.js'; 
import cors from 'cors';


const app = express();
// Allow requests from specific origin
app.use(cors());
const PORT = process.env.PORT || 3001;

// Middleware setup
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB(); // Connect to your MongoDB database

// Use the imported router
app.use('/api', careerRoutes);  // Mount the career routes under "/api"
app.use('/api', contactRoutes) ;   // api/career.  
// Serve static files from the "uploads" directory
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
