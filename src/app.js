import express from 'express';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import routes from './routes/v1/index.js';
import connectDatabase from './config/database.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const openApiPath = path.join(__dirname, '.', 'open-api.yaml');
const openApiSpec = yaml.load(fs.readFileSync(openApiPath, 'utf8'));

connectDatabase();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(openApiSpec));
app.use('/api/v1', routes);

app.get('*', (req, res) => {
  res.send('404 - Not Found');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/api/swagger`);
});
