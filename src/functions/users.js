const { app } = require('@azure/functions');
const UserService = require('../services/user.service');
const UserController = require('../controllers/users');

const controller = new UserController(new UserService());

app.http('GetUsers', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: (request, context) => controller.getAll(request, context)
});
