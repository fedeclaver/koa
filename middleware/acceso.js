const { loggerWarn } = require("../utils/log4js");
const { admin } = require('../config/config');

// middleware de authentication
const checkAuthentication = async  (ctx, next) => {
    try {
        if (ctx.session.passport && ctx.session.passport.user._id) {
            await next();
          
        } else {
            ctx.status = 401;
            ctx.body = {message: 'Unauthorized'}

        }
    } catch (error) {
        loggerWarn.warn(error);
    }
}





module.exports =  {checkAuthentication};
