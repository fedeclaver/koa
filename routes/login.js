const Router = require("koa-router");
const router = new Router();
const passport = require('../auth/passport');
const upload = require('../middleware/multer');



//-----------LOGIN----------------
router.post('/login', passport.authenticate('login',
    {
        successRedirect: '/'
        
    }
));

//-----------REGISTRO----------------
router.post('/signup', upload.single('foto'), passport.authenticate('signup',
    {
        successRedirect: '/'
    }
));

//-----------LOGOUT----------------
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;