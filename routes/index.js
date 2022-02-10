const Router = require('koa-router');
const {checkAuthentication} = require('../middleware/acceso');
const loginRouter = require('./login');
const productosRouter = require('./productos');
const router = new Router();





  router.use('/auth', loginRouter.routes());



  router.use('/productos',checkAuthentication, productosRouter.routes());

  module.exports = router;