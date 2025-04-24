class UserController {

    constructor(service) {
        this.service = service;
    }

    async getAll(request, context) {
        try {
            context?.log(`Http function processed request for url "${request?.url}"`);
            const srvUser = this.service;
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
        catch (error) {
            return {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ error: error.message })
            };
        }
    }
}

module.exports = UserController;