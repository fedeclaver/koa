"use strict";

fetch("/productos/listar").then(function (resp) {
  return resp.json();
}).then(function (productos) {
  var html = "";
  productos.forEach(function (producto) {
    var htmlSegment = "      \n      <div class=\"card\" >\n      \n      <img src=\"".concat(producto.foto, "\" style=\"width: 100px height: 100px \" class=\"card-img-top \" alt=\"...\">\n      <div class=\"card-body\">\n        <h5 class=\"card-title\"> ").concat(producto.nombre, "</h5>\n        <p>Producto Id: ").concat(producto.id, "</p>\n         <p>Timestamp: ").concat(producto.timestamp, "</p> \n        <p class=\"card-text\">Descripcion: ").concat(producto.descripcion, "</p> \n        <p class=\"card-text\">Cantidad: ").concat(producto.cantidad, "</p> \n        <p class=\"card-text\">Precio: ").concat(producto.precio, "</p> \n        <p class=\"card-text\">Stock: ").concat(producto.stock, "</p>         \n        <p></p>   \n        <button class=\"btn btn-primary\" onclick=\"AgregarProducto('").concat(producto.id, "')\">Agregar a carrito</button>        \n      </div>\n    \n    </div>"); // <input  type="number"  id="idCantidad" placeholder="Cantidad"   name="idCantidad"/>

    html += htmlSegment;
  });
  document.getElementById("productosCard").innerHTML = html;
});

function AgregarProducto(id) {
  var idCarrito = document.getElementById("idCarrito").value;

  if (idCarrito != "") {
    fetch("/carritos/agregarProducto/" + idCarrito + "/" + id).then(function (res) {
      return res.text();
    }).then(function (res) {
      alert(res);
      location.reload();
      return false;
    });
  }
}

function agregarCarrito() {
  fetch("/carritos/agregar/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }).then(function (res) {
    return res.text();
  }).then(function (res) {
    alert(res);
    location.reload();
    return false;
  });
}

function getCarrito(id) {
  fetch("/carritos/listar/" + id, {
    method: "GET"
  }).then(function (res) {
    return res.text();
  }).then(function (res) {
    alert(res);
    location.reload();
    return false;
  });
}

fetch("/carritos/listar").then(function (resp) {
  return resp.json();
}).then(function (carritos) {
  var htmlheader = "",
      htmlbody = "",
      htmlfooter = "",
      html = "";

  for (var i = 0; i < carritos.length; i++) {
    var total = 0;
    htmlheader = "<div class=\"rounded cart shadow p-3 mb-5 bg-body rounded\">\n      <div class=\"row no-gutters\">\n        <div class=\"col-md-8\">\n          <div class=\"product-details mr-2\">\n            <div class=\"d-flex flex-row align-items-center\">\n            <i class=\"fa fa-long-arrow-left\"></i><span class=\"ml-2\">Carrito ".concat(carritos[i].id, "</span></div>\n            <hr>\n            <h6 class=\"mb-0\">Detalle Compra</h6>");

    if (undefined !== carritos[i].productos && carritos[i].productos.length) {
      htmlbody = "";

      for (var e = 0; e < carritos[i].productos.length; e++) {
        total += parseInt(carritos[i].productos[e].precio);
        htmlbody = htmlbody + "<div class=\"d-flex justify-content-between align-items-center mt-3 p-2 items rounded\">\n\t\t\t\t\t\t<div class=\"d-flex flex-row\"><img class=\"rounded\" src=\" ".concat(carritos[i].productos[e].foto, "\" width=\"40\">\n\t\t\t\t\t\t\t<div class=\"ml-2\"><span class=\"font-weight-bold d-block\"> ").concat(carritos[i].productos[e].nombre, "</span>\n              <span class=\"spec\">").concat(carritos[i].productos[e].detalle, "</span></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"d-flex flex-row align-items-center\"><span class=\"d-block\">2</span>\n            <span class=\"d-block ml-5 font-weight-bold\">$").concat(carritos[i].productos[e].precio, "</span>\n            <i class=\"fa fa-trash ml-3 text-black-50\" onclick=\"eliminarProductoCarrito(").concat(carritos[i].productos[e].id, ",").concat(carritos[i].id, ")\"></i></div>\n                    \n            </div>");
      }
    } else {
      htmlbody = "<span class=\"ml-2\">Sin Productos</span>";
    }

    htmlfooter = "</div>\n          </div>\n          <div class=\"col-md-4 summary\">\n            <div>\n                <h5><b>Resumen de Compra</b></h5>\n            </div>\n            <hr>\n            <div class=\"row\">\n                <div class=\"col\" style=\"padding-left:0;\">".concat(carritos[i].productos.length, "</div>\n                <div class=\"col text-right\">").concat(total, "</div>\n            </div>            \n            <div class=\"row\" style=\"border-top: 1px solid rgba(0,0,0,.1); padding: 2vh 0;\">\n                <div class=\"col\">TOTAL</div>\n                <div class=\"col text-right\">").concat(total, "</div>\n            </div> <button class=\"btn btn-success\">PAGAR</button>\n        </div>\n        </div>\n        \n        </div>\n        \n      </div>");
    html = html + htmlheader + htmlbody + htmlfooter;
  }

  document.getElementById("carritos").innerHTML = html;
});

function eliminarProductoCarrito(id, idc) {
  if (idc != "") {
    fetch("/carritos/eliminarProducto/" + parseInt(idc) + "/" + parseInt(id)).then(function (res) {
      return res.text();
    }).then(function (res) {
      alert(res);
      location.reload();
      return false;
    });
  }
}