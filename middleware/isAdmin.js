const { admin } = require('../config/config');
const { loggerWarn } = require('../utils/log4js');

const isAdmin = async (ctx, next) => {
    if (admin) {
        await next();
    } else {
        loggerWarn.warn(`Ruta ${ctx.path} método ${ctx.method} no autorizada`);
        ctx.status = 403;
        ctx.body = {
            error: -1,
            descripcion: `ruta ${ctx.path} método ${ctx.method} no autorizada`
        };
    }
};

module.exports = isAdmin;