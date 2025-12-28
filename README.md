# API de Productos - Koa

REST API para gestión de productos construida con Koa.js. Incluye autenticación basada en sesión y persistencia flexible mediante el patrón DAO.

## Por qué Koa

Elegí Koa sobre Express por tres razones técnicas:

1. **Control explícito del flujo async**: Koa usa async/await nativamente, evitando callbacks y facilitando el debugging de operaciones asíncronas.
2. **Middleware model más limpio**: El contexto (`ctx`) unifica request y response, y el flujo de middlewares es predecible mediante `await next()`.
3. **Error handling centralizado**: El manejo de errores se propaga naturalmente por el stack de middlewares, permitiendo un único punto de captura.

## Flujo de una Request

```
Request → Error Handler → Static Files → Body Parser → CORS → Session/Auth → Router → Controller → Response
```

### Detalles del flujo

1. **Error Handler** (primera capa): Captura cualquier error lanzado en middlewares subsecuentes
2. **Body Parsing**: Parsea JSON/form data antes de llegar a las rutas
3. **Session/Auth**: Valida sesión y carga contexto de usuario si existe
4. **Router**: Matchea la ruta y delega al controller correspondiente
5. **Controller**: Ejecuta lógica de negocio y setea `ctx.body` con la respuesta

## Estructura del Proyecto

```
├── middleware/
│   ├── errorHandler.js       # Manejo centralizado de errores
│   ├── checkAuthentication.js # Validación de sesión
│   └── isAdmin.js             # Control de permisos
├── controllers/
│   └── productoController.js  # Lógica de negocio de productos
├── routes/
│   ├── index.js               # Agregación de rutas
│   ├── productos.js           # Endpoints de productos
│   └── login.js               # Autenticación
├── daos/                      # Data Access Objects (Mongo, Firebase, Memoria)
├── config/
│   └── config.js              # Configuración centralizada
└── server.js                  # Setup de la aplicación
```

## Decisiones de Diseño

### Separación de responsabilidades

- **Controllers**: Validación de entrada, orquestación de DAOs, formateo de respuesta
- **Middlewares**: Concerns transversales (autenticación, logging, errores)
- **DAOs**: Abstracción de persistencia (soporta múltiples backends)

### Manejo de errores

Los controllers no usan try/catch explícito. Los errores se propagan automáticamente al `errorHandler` middleware gracias al modelo async de Koa. Esto reduce boilerplate y centraliza la lógica de logging/formateo.

```javascript
// Controller - sin try/catch
const obtenerProducto = async (ctx) => {
    const producto = await productosDao.getById(ctx.params.id);
    if (!producto) {
        ctx.status = 404;
        ctx.body = { status: "error", message: "No existe el producto" };
        return;
    }
    ctx.body = producto;
}

// Error handler lo captura automáticamente
```

### Validación temprana

Los controllers validan inputs al inicio y retornan early en caso de error, evitando anidamiento innecesario.

### Uso consistente de `ctx`

- `ctx.status`: Para setear código HTTP
- `ctx.body`: Para setear respuesta (Koa serializa automáticamente a JSON)
- No se mezcla `ctx.response.status` y `ctx.status` para mantener consistencia

## Trade-offs y Limitaciones

### Lo que falta

- **Validación de schemas**: No uso librerías como Joi o Yup. Para un proyecto productivo, agregaría validación formal de schemas en los controllers.
- **Rate limiting**: No hay control de requests por IP/usuario.
- **Paginación**: `GET /productos/listar` retorna todos los productos. En producción implementaría cursor-based pagination.
- **Tests**: No hay tests unitarios ni de integración.

### Decisiones conscientes

- **No uso try/catch en controllers**: El error handler de Koa lo maneja automáticamente, reduciendo código repetitivo.
- **DAOs sin implementación completa**: Están preparados para Mongo/Firebase pero no todos los métodos están implementados en todos los backends.
- **Session-based auth**: Elegí session sobre JWT porque es más simple para este scope. En una API stateless usaría JWT.
- **Logging con log4js**: Mantuve la librería existente aunque para producción evaluaría alternativas más livianas como pino.

## Setup

```bash
npm install
npm start
```

Variables de entorno requeridas (`.env`):

```
MONGO_ATLAS=mongodb://...
GMAIL_USER=...
GMAIL_PASS=...
PROD=0
ALLOW_CORS=1
```

## Endpoints

### Productos

- `GET /productos/listar` - Listado completo
- `GET /productos/listar/:id` - Producto individual
- `POST /productos/agregar` - Crear producto
- `PUT /productos/actualizar/:id` - Actualizar producto
- `DELETE /productos/borrar/:id` - Eliminar producto

### Autenticación

- `POST /login` - Login
- `POST /signup` - Registro
- `GET /logout` - Logout

## Mejoras Futuras

Si tuviera más tiempo, agregaría:

1. **Input validation middleware** usando una librería como Joi
2. **Request logging middleware** para trackear todas las requests
3. **Tests** con Jest/Supertest
4. **OpenAPI/Swagger** para documentar la API
5. **Healthcheck endpoint** (`GET /health`)
6. **Graceful shutdown** para manejar SIGTERM correctamente

---

Este proyecto demuestra conocimiento práctico de Koa, manejo de async/await, y separación clara de responsabilidades sin sobre-ingeniería.
