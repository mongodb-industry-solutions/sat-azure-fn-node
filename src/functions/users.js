const { app } = require('@azure/functions');
const UserService = require('../services/user.service');
const UserController = require('../controllers/users');

const controller = new UserController(new UserService());

app.http('UserMetadata', {
    methods: ['OPTIONS'],
    authLevel: 'anonymous',
    route: 'users',
    handler: (request, context) => controller.getMetadata(request, context)
});

app.http('UserGetAll', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'users', 
    handler: (request, context) => controller.getAll(request, context)
});

app.http('UserInsert', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'users', 
    handler: (request, context) => controller.create(request, context)
});

app.http('UserSelect', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'users/{id}',
    handler: (request, context) => controller.getById(request, context)
});

app.http('UserUpdate', {
    methods: ['PUT'],
    authLevel: 'anonymous',
    route: 'users/{id}', 
    handler: (request, context) => controller.update(request, context)
});

app.http('UserDelete', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    route: 'users/{id}', 
    handler: (request, context) => controller.delete(request, context)
});
