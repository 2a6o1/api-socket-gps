const startHttp = async ({
    app,
    adapters = [],
    middlewares = [],
    options = {}
}) => {
    if (!app) throw Error('App is required');
    // Apply global middlewares
    middlewares.forEach(middleware => {
        app.use(middleware());
    });

    // Apply adapters
    adapters.forEach(({ method, path, adapter }) => {
        // Convert method to lowercase to ensure consistency
        method = method.toLowerCase();

        // Validate method
        if (!['get', 'post', 'put', 'delete', 'patch'].includes(method)) {
            throw new Error(`Invalid HTTP method: ${method}`);
        }

        path = options.path + path;

        // Apply adapter for each method
        switch (method) {
            case 'get':
                app.get(path, adapter);
                break;
            case 'post':
                app.post(path, adapter);
                break;
            case 'put':
                app.put(path, adapter);
                break;
            case 'delete':
                app.delete(path, adapter);
                break;
            case 'patch':
                app.patch(path, adapter);
                break;
            default:
                // This should never be reached due to the method validation above
                throw new Error('Unhandled HTTP method');
        }
    });
}

export default startHttp;