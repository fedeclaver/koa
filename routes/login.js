const Router = require("koa-router");
const router = new Router();
const passport = require('../auth/passport');
const upload = require('../middleware/multer');

//-----------LOGIN----------------
router.post('/login', passport.authenticate('login', {
    successRedirect: '/'
}));

//-----------REGISTRO----------------
router.post('/signup', upload.single('foto'), passport.authenticate('signup', {
    successRedirect: '/'
}));

//-----------LOGOUT----------------
router.get('/logout', async (ctx) => {
    ctx.logout();
    ctx.redirect('/');
});

module.exports = router;