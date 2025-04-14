const { app } = require('@azure/functions');
const UserService = require('../services/user.service');

app.http('GetUsers', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context?.log(`Http function processed request for url "${request?.url}"`);

        const srvUser = new UserService();
        const conn = await srvUser.connect();

        const name = request?.query.get('name') || await request?.text() || 'world';
        const data = !conn ? `Hello, ${name}!` : await srvUser.getAll();

        return {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data, metadata: srvUser.metadata, env: process.env })
        };
    }
});
