const { loggerWarn } = require("../utils/log4js");

const checkAuthentication = async (ctx, next) => {
    if (ctx.session?.passport?.user?._id) {
        await next();
    } else {
        loggerWarn.warn('Sesión no válida o expirada');
        ctx.status = 401;
        ctx.body = { message: 'Unauthorized' };
    }
};

module.exports = { checkAuthentication };
