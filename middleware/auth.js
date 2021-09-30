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
exports.esAdmin = esAdmin;
