class UserController {

    constructor(service) {
        this.service = service;
    }

    /**
     * Retrieves the service metadata
     * @param {Request} request - The HTTP request.
     * @param {InvocationContext} context - The HTTP response.
     */
    async getMetadata(request, context) {
        try {
            context?.log(`Http function processed request for url "${request?.url}"`);
            await this.service?.connect();
            return {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ action: "getMetadata", metadata: this.service.metadata, env: process.env })
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

    /**
     * Creates a new user.
     * @param {Request} request - The HTTP request.
     * @param {InvocationContext} context - The HTTP response.
     */
    async create(request, context) {
        try {
            const user = await this.service.create(request.body);
            return {
                status: 201,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ action: "create", data: user })
            };
        }
        catch (error) {
            return {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ action: "create", error: error.message })
            };
        }
    }

    /**
     * Retrieves all users.
     * @param {Request} request - The HTTP request.
     * @param {InvocationContext} context - The HTTP response.
     */
    async getAll(request, context) {
        try {
            context?.log(`Http function processed request for url "${request?.url}"`);
            // const name = request?.query.get('name') || await request?.text() || 'world';
            const data = await this.service.getAll() || [];
            return {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ action: "getAll", data })
            };
        }
        catch (error) {
            return {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ action: "getAll", error: error.message })
            };
        }
    }

    /**
     * Retrieves a user by their ID.
     * @param {Request} request - The HTTP request.
     * @param {InvocationContext} context - The HTTP response.
     */
    async getById(request, context) {
        try {
            const user = await this.service.getById(request.params.id);

            if (!user) {
                return {
                    status: 404,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ action: "getById", message: 'User not found' })
                };
            }

            return {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ action: "getById", data: user })
            };
        }
        catch (error) {
            return {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ action: "getById", error: error.message })
            };
        }
    }

    /**
     * Updates an existing user.
     * @param {Request} request - The HTTP request.
     * @param {InvocationContext} context - The HTTP response.
     */
    async update(request, context) {
        try {
            const user = await this.service.update(request.params.id, request.body);

            if (!user) {
                return {
                    status: 404,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ action: "update", message: 'User not found' })
                };
            }

            return {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ action: "update", data: user })
            };
        }
        catch (error) {
            return {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ action: "update", error: error.message })
            };
        }
    }

    /**
     * Deletes a user by ID.
     * @param {Request} request - The HTTP request.
     * @param {InvocationContext} context - The HTTP response.
     */
    async delete(request, context) {
        try {
            const user = await this.service.delete(request.params.id);

            if (!user) {
                return {
                    status: 404,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ action: "delete", message: 'User not found' })
                };
            }

            return {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ action: "delete", data: user })
            };
        }
        catch (error) {
            return {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ action: "delete", error: error.message })
            };
        }
    }
}

module.exports = UserController;