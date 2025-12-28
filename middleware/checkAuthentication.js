const { loggerWarn } = require("../utils/log4js");

const checkAuthentication = async (ctx, next) => {
    if (ctx.isAuthenticated()) {
        await next();
    } else {
        loggerWarn.warn('Intento de acceso no autenticado');
        ctx.status = 401;
        ctx.body = { error: 'No está autenticado' };
    }
};

module.exports = checkAuthentication;