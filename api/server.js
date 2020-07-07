const express = require('express');
const cors = require('cors');
const helmet = require('helmet');


const authRouter = require('../auth/authRouter.js');
const authenticate = require('../auth/authenticate-middleware.js');
const userRouter = require('./usersRouter.js');
const businessRouter = require('./businessRouter.js');
const marketRouter = require('./marketRouter.js');


const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

server.use('/api/auth', cors(), authRouter);
server.use('/api/users', cors(), userRouter);
server.use('/api/business', cors(), businessRouter);
server.use('/api/market', cors(), marketRouter);

server.get('/', cors(), (req, res) => {
    res.status(201).json({ message: 'Welcome to the API!'})
})

module.exports = server;