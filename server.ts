import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { apiRouter } from './server/api.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Backend API Routes
app.use('/api', apiRouter);

// Serve Static Frontend Assets (Production)
const distPath = path.resolve(__dirname, 'dist');
app.use(express.static(distPath));

// SPA Fallback: Any other route serves index.html
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`=================================================`);
  console.log(`🚀 Raksha & bandova Full-Stack Server Running`);
  console.log(`📡 Local URL: http://localhost:${PORT}`);
  console.log(`⚙️  API Status: http://localhost:${PORT}/api/health`);
  console.log(`=================================================`);
});
