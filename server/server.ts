import express from 'express';
import * as Path from 'node:path';

import bridgeRoutes from './routes/bridge';
import userRoutes from './routes/users'; // Import user routes

const server = express();

server.use(express.json());

// Bridge routes
server.use('/api/v1/bridges', bridgeRoutes);

// User routes
server.use('/api/v1/users', userRoutes); // Attach user routes

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')));
  server.use('/assets', express.static(Path.resolve('./dist/assets')));
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'));
  });
}

export default server;
