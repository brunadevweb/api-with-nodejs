const { Router } = require('express');

const routers = new Router();

routers.get('/health', (req, res) => res.send({
    message: 'Comment with sucess!',
}));

module.exports = routers;
