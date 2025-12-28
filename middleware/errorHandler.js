const { loggerError } = require('../utils/log4js');

/**
 * Error handling middleware
 * Catches and formats all errors thrown in downstream middleware
 */
const errorHandler = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || err.statusCode || 500;

        const errorResponse = {
            status: 'error',
            message: err.message || 'Internal server error'
        };

        // Include stack trace in development
        if (process.env.NODE_ENV !== 'production' && err.stack) {
            errorResponse.stack = err.stack;
        }

        ctx.body = errorResponse;

        // Log error details
        loggerError.error({
            message: err.message,
            status: ctx.status,
            url: ctx.url,
            method: ctx.method,
            stack: err.stack
        });

        // Emit error event for application monitoring
        ctx.app.emit('error', err, ctx);
    }
};

module.exports = errorHandler;
