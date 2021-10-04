"use strict";

$('a[href$="#Modal"]').on("click", function () {
  $("#Modal").modal("show");
});
var url = "/productos/listar";
fetch(url).then(function (resp) {
  return resp.json();
}).then(function (productos) {
  var html = "";
  productos.forEach(function (producto) {
    var htmlSegment = "\n      \n      <div class=\"card\" >\n      <img src=\"".concat(producto.foto, "\"  class=\"card-img-top\" alt=\"...\">\n      <div class=\"card-body\">\n        <h5 class=\"card-title\"> ").concat(producto.nombre, "</h5>\n        <p>Carrito Id: ").concat(producto.id, "</p>\n         <p>Timestamp: ").concat(producto.timestamp, "</p> \n        <p class=\"card-text\">Descripcion: ").concat(producto.descripcion, "</p>\n        <p class=\"card-text\">C\xF3digo:").concat(producto.codigo, "</p>\n        <p class=\"card-text\">Precio:").concat(producto.precio, "</p>\n        <p class=\"card-text\">Stock:").concat(producto.stock, "</p>\n        <button class=\"btn btn-warning\" onclick=\"editarProducto('").concat(producto.id, "')\">Editar</button>  \n        <button class=\"btn btn-danger\" onclick=\"borrarProducto('").concat(producto.id, "')\">Eliminar</button>        \n      </div>\n    \n    </div>");
    html += htmlSegment;
  });
  document.getElementById("productos").innerHTML = html;
});

function borrarProducto(id) {
  //alert(id);
  fetch("/productos/borrar/" + id, {
    method: "DELETE"
  }).then(function (res) {
    return res.text();
  }).then(function (res) {
    alert(res);
    location.reload();
    return false;
  });
}

function editarProducto(id) {
  //alert(id);
  fetch("/productos/editar/" + id, {
    method: "EDIT"
  }).then(function (res) {
    return res.text();
  }).then(function (res) {
    alert(res);
    location.reload();
    return false;
  });
}