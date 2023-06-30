const { Router } = require('express');
const schemaValidator = require('./apps/middlewares/schemaValidator');

const AuthenticationController = require('./apps/controllers/AuthenticationController');

const UserController = require('./apps/controllers/UserController');
const userSchema = require('./schema/create.user.schema.json');

const routers = new Router();

routes.post('/user', schemaValidator(schemaValidator), UserController.create );

routes.post('./auth', AuthenticationController.authenticate);

routers.get('/health', (req, res) => res.send({
    message: 'Comment with sucess!',
}));

module.exports = routers;
