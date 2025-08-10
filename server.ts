import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import apiRouter from './api/router.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: express.Application = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Router
app.use('/api/v1', apiRouter);

// Serve static files from the project root. Since this server.ts is at the root,
// and the command `npm start` is run from the root, __dirname is the project root.
app.use(express.static(__dirname));

// SPA Fallback: For any request that doesn't match a static file or an API route,
// send the main index.html file. This is crucial for single-page applications.
app.get('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.path.startsWith('/api/')) {
    // If it's an API path that wasn't matched by the router, let it 404.
    return next();
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log('Ensure you have a .env file with your MONGODB_URI and DB_NAME.');
});