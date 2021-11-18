const express = require("express");
const { Router } = express;
const router = new Router();
const requireAuth = require("../middleware/acceso.js");


router.get('/', (req, res) => {
  res.redirect('/index.html');
})


router.get('/logout', (req, res) => {
  const nombre = req.session.nombre
  if (nombre != 'undefined'){
  req.session.destroy(err=>{
      if (err){
         res.status(500);
          res.json({error: err});
      } else {
          if (nombre){
            res.json({ msg: `Hasta luego ${nombre}!`});
          
          } else {
            res.json({ msg: `Hasta luego `});
          }
      }
  });
}else {
  res.json({ msg: `no hay session `});
}
});

router.post('/login', (req, res) => {
  if (!req.query.nombre) {
  
    res.json({ msg: `Te damos la bienvenida!`});
} else {
    req.session.nombre = req.query.nombre;
    res.json({ msg: `Bienvenido ${req.session.nombre}!`});
}
      
})







module.exports = router;
