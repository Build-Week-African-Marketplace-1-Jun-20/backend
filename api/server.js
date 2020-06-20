const express = require('express');
const cors = require('cors');
const helmet = require('helmet');


const authRouter = require('../auth/authRouter.js');
const authenticate = require('../auth/authenticate-middleware.js');
const userRouter = require('./usersRouter.js');
const businessRouter = require('./businessRouter.js');
const marketRouter = require('./marketRouter.js');


const server = express();


server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', authenticate, userRouter);
server.use('/api/business', authenticate, businessRouter);
server.use('/api/market', authenticate, marketRouter);

server.get('/', (req, res) => {
    res.status(201).json({ message: 'Welcome to the API!'})
})

module.exports = server;
