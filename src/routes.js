const { Router } = require('express');
const schemaValidator = require('./apps/middlewares/schemaValidator');
const UserController = require('./apps/controllers/UserController');

const routers = new Router();

routes.get('/user', schemaValidator(), UserController.create );

routers.get('/health', (req, res) => res.send({
    message: 'Comment with sucess!',
}));

module.exports = routers;
