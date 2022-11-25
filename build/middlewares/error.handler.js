"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, _next) => {
    err.statusCode = +err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
};
exports.default = errorHandler;
//# sourceMappingURL=error.handler.js.map