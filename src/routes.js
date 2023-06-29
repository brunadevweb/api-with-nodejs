const { Router } = require('express');
const UserController = require('./apps/controllers/UserController')

const routers = new Router();

routes.get('/user', UserController.create );

routers.get('/health', (req, res) => res.send({
    message: 'Comment with sucess!',
}));

module.exports = routers;
