const { Router } = require('express');
const schemaValidator = require('./apps/middlewares/schemaValidator');

const AuthenticationMiddleware = require('./apps/middlewares/authentication');

const AuthenticationController = require('./apps/controllers/AuthenticationController');
const authSchema = require('./schema/auth.user.schema.json');

const UserController = require('./apps/controllers/UserController');
const userSchema = require('./schema/create.user.schema.json');

const routers = new Router();

routes.post('/user', schemaValidator(schemaValidator), UserController.create );

routes.post('./auth', schemaValidator(authSchema), AuthenticationController.authenticate);

routers.get('/health', (req, res) => res.send({
    message: 'Comment with sucess!',
}));

routes.use(AuthenticationMiddleware);

module.exports = routers;
