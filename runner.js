'use strict';

const micro = require('micro');
const index = require('./');

const server = micro(index);
server.listen(3001);
