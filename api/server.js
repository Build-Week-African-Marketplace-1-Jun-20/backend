const express = require('express');
const helmet = require('helmet');

// const usersRouter = require('./usersRouter.js');
const authRouter = require('../auth/authRouter.js');
// const businessRouter = require('./businessRouter.js');
// const marketRouter = require('./marketRouter.js');

const server = express();

server.use(helmet());
server.use(express.json());

// server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);
// server.use('/api/business', businessRouter);
// server.use('/api/market', marketRouter);

module.exports = server;
