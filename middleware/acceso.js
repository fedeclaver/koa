

  const admin = true;
const esAdmin = (req, res, next) => {
  if (admin) {
    return next();
  }
  return res.status(401).json({
    msg: "Acceso Denegado",
    descripcion: `error: -1 ,descripcion: ruta ${req.url} método ${req.method} no autorizada`,
  });
};

const verifyUsername = (req, res, next) => {
  if (!req.body.username) {
    return res.status(400).json({
      error: 'El campo username es obligatorio'
    })
  }

  return next()
}

const verifyPassword = (req, res, next) => {
  if (!req.body.password) {
    return res.status(400).json({
      error: 'El campo password es obligatorio'
    })
  }

  return next()
}


module.exports = {
  verifyUsername,
  verifyPassword,esAdmin
}