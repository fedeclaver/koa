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
