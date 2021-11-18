function loguin() {
  
    nombre ={username:  document.getElementsByName("nombre")[0].value} ;
    fetch("/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nombre) 
    })    
    .then((res) => res.json())
    .then((texto) => {
     
    document.getElementById("loguin").innerHTML = JSON.stringify(texto.msg);
    })
  }


  function logout() {
  
   
    fetch("/auth/logout")    
    .then((res) => res.json())
    .then((texto) => {
     
    document.getElementById("logout").innerHTML = JSON.stringify(texto.msg);
    })
  }