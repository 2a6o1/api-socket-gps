const rolesMiddleware = ({io, authorizedRoles}) => {
    io.use((socket, next) => {
        if (!socket.session.payload) {
            next(new Error('Unauthorized user'));
        }

        if (!authorizedRoles.includes(socket.session.payload.role)) {
            next(new Error('Unauthorized user'));
        }

        next();
    });
}

export default rolesMiddleware;