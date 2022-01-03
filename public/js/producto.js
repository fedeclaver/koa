$('a[href$="#Modal"]').on("click", function () {
  $("#Modal").modal("show");
});

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