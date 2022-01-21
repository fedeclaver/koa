

// inicializamos la conexion ws
const socket = io.connect();


(async () => {
  const response = await fetch('/getUser');
  const data = await response.json();
  if (Object.keys(data)[0] != 'error') {
      document.getElementById('user').innerHTML = `
              <span>${data.nombre} - </span>
              <span>${data.usuario} - </span>
              <img src="  img/${data.foto}" width="45px" />
          `
      document.getElementById('btnLogout').innerHTML = `
              <a  href="/auth/logout">Logout</a>
          `
  } else {
      document.getElementById('user').innerHTML = `
          
              <a  href="signup.html">Signup</a>
              <a  href="login.html">Login</a>
       
          `
  }
})();



let url = "/productos/listar";
fetch(url)
  .then((resp) => resp.json())
  .then((productos) => {
    let html = "";
    productos.forEach((producto) => {
      let htmlSegment = `
      
      <div class="card" >
      <img src="${producto.foto}"  class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title"> ${producto.nombre}</h5>
        <p>Carrito Id: ${producto.id}</p>
         <p>Timestamp: ${producto.timestamp}</p> 
        <p class="card-text">Descripcion: ${producto.descripcion}</p>
        <p class="card-text">Código:${producto.codigo}</p>
        <p class="card-text">Precio:${producto.precio}</p>
        <p class="card-text">Stock:${producto.stock}</p>
        <button class="btn btn-warning" onclick="editarProducto('${producto.id}')">Editar</button>  
        <button class="btn btn-danger" onclick="borrarProducto('${producto.id}')">Eliminar</button>        
      </div>
    
    </div>`;
      html += htmlSegment;
    });
    document.getElementById("productos").innerHTML = html;
  });

function borrarProducto(id) {
  //alert(id);
  fetch("/productos/borrar/" + id, {
    method: "DELETE",
  })
    .then((res) => res.text())
    .then((res) => {
      alert(res);
      location.reload();
      return false;
    });
}

function editarProducto(id) {
  //alert(id);
  fetch("/productos/editar/" + id, {
    method: "EDIT",
  })
    .then((res) => res.text())
    .then((res) => {
      alert(res);
      location.reload();
      return false;
    });
}





// renderiza template con nuevos mensajes
function render(mensajes) {
  if (mensajes.length > 0) {
      var html = mensajes.map((elem) => {
          return (`
              <div class="mb-2">
                  <img src="${elem.author.avatar}" width="30px">
                  <strong style="color: blue;">${elem.author.email}</strong> <span style="color: maroon;">[${elem.fyh}]</span>:
                  <em style="color: green;">${elem.text}</em>
              </div>
          `)
      }).join(" ");
      document.getElementById('mensajes').innerHTML = html;
  } else {
      // si no hay mensajes renderiza un aviso
      var html = `
              <div>
                  <strong style="color: red;">Ups! Aún no hay mensajes..</strong>
              </div>`;
      document.getElementById('mensajes').innerHTML = html;
  }
}






// se ejecuta cuando enviamos un nuevo mensaje
function addMessage(e) {
  let mensajes = {
      author: {
          email: document.getElementById('email').value,
          nombre: document.getElementById('msjnombre').value,
          apellido: document.getElementById('apellido').value,
          edad: document.getElementById('edad').value,
          alias: document.getElementById('alias').value,
          avatar: document.getElementById('avatar').value,
      },
      text: document.getElementById('text').value
  };
  socket.emit('nuevoMensaje', mensajes);
  document.getElementById('mensajes').value = "";
  return false;
}

// recibimos los mensajes del servidor y renderizamos

socket.on('mensaje', mensajes => {
  console.log(mensajes);

  const html = makeHtmlList(mensajes)
  document.getElementById('mensajes').innerHTML = html;
})



socket.on('mensajes', mensajesN => {
  const mensajesNsize = JSON.stringify(mensajesN).length
  console.log(mensajesN, mensajesNsize)

  const mensajesD = normalizr.denormalize(
    mensajesN.result,
    schemaMensajes,
    mensajesN.entities
  )

  const mensajesDsize = JSON.stringify(mensajesD).length
  console.log(mensajesD, mensajesDsize)

  const porcentajeC = parseInt(
    (Math.abs(mensajesDsize - mensajesNsize) * 100) / mensajesNsize
  )
  console.log(`Porcentaje de compresión ${porcentajeC}%`)
  document.getElementById('compresion-info').innerText = porcentajeC

  console.log(mensajesD.mensajes)
  const html = makeHtmlList(mensajesD.mensajes)
  document.getElementById('mensajes').innerHTML = html
})


function makeHtmlList(mensajes) {
   if (mensajes.length > 0) {
    return mensajes.map(mensaje => {
      return (`
          <div>
          <img src="${mensaje.author.avatar}" width="30px">
            
              <strong style="color: blue;">${mensaje.author.email}</strong>            
              [<span style="color:brown;">${mensaje.fyh}</span>] :
              <i style="color:green;">${mensaje.text}</i>
          </div>
      `)
  }).join(" ");

}else {
  return ('<div><strong style="color: red;">Ups! Aún no hay mensajes..</strong> </div>')
}
}
function deleteMensajes() {
  socket.emit('deleteMensajes', 'Todos los mensajes se han eliminado');
}



//-------------------------------------------------------------------------------------

// MENSAJES

/* --------------------- DESNORMALIZACIÓN DE MENSAJES ---------------------------- */
// Definimos un esquema de autor
const schemaAuthor = new normalizr.schema.Entity(
  'author',
  {},
  { idAttribute: 'id' }
)

// Definimos un esquema de mensaje
const schemaMensaje = new normalizr.schema.Entity(
  'post',
  { author: schemaAuthor },
  { idAttribute: '_id' }
)

// Definimos un esquema de posts
const schemaMensajes = new normalizr.schema.Entity(
  'posts',
  { mensajes: [schemaMensaje] },
  { idAttribute: 'id' }
)
/* ----------------------------------------------------------------------------- */
