const { Router } = require('express');
const { upload } = require('./configs/multer');
const schemaValidator = require('./apps/middlewares/schemaValidator');

const AuthenticationMiddleware = require('./apps/middlewares/authentication');

const AuthenticationController = require('./apps/controllers/AuthenticationController');
const authSchema = require('./schema/auth.user.schema.json');

const UserController = require('./apps/controllers/UserController');
const userSchema = require('./schema/create.user.schema.json');
const FileController = require('./apps/controllers/FileController');

 const FileController = require('./apps/controllers/FileController');

const routers = new Router();

routes.post('/user', schemaValidator(schemaValidator), UserController.create );

routes.post('./auth', schemaValidator(authSchema), AuthenticationController.authenticate);

routers.get('/health', (req, res) => res.send({
    message: 'Comment with sucess!',
}));

routes.use(AuthenticationMiddleware);

routes.put('/user', UserController.update);
routes.delete('user', UserController.delete);
routes.get('./user-profile', UserController.userProfile);

routes.post('/upload', upload.single('image'), FileController);

module.exports = routers;
