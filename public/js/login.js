document.addEventListener("DOMContentLoaded", function(){
    //Elementos de la interfaz
    const emailInput = document.querySelector("#email")
    const passwordInput = document.querySelector("#password")
    const boton = document.querySelector("button");
    
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        
        //Validando el campo Correo Electrónico
        if(emailInput.value.trim()===""){

            emailInput.focus();
            const divMensaje = document.createElement("div");
            divMensaje.classList.add("error");
            divMensaje.textContent =  "El Email es Obligatorio";
            emailInput.parentElement.appendChild(divMensaje);

            setTimeout(() => {
                divMensaje.remove()
            }, 5000);
            return false;

        }else if(!validarEmail(emailInput.value.trim())){
            //alert("El correo electrónico no tiene un formato valido");

            emailInput.focus();
            const divMensaje = document.createElement("div");
            divMensaje.classList.add("error");
            divMensaje.textContent =  "El correo electrónico no tiene un formato valido";
            emailInput.parentElement.appendChild(divMensaje);

            setTimeout(() => {
                divMensaje.remove()
            }, 5000);
            return false;
        }

        //Validar el campo Contraseña
        if(passwordInput.value.trim()===""){
            //alert("El campo Contraseña es Obligatorio");
            passwordInput.focus();
            const divMensaje = document.createElement("div");
            divMensaje.classList.add("error");
            divMensaje.textContent =  "El campo Contraseña es Obligatorio";
            passwordInput.parentElement.appendChild(divMensaje);

            setTimeout(() => {
                divMensaje.remove()
            }, 5000);
            return false;
        }else if( passwordInput.value.trim().length<6){
            //alert("La contraseña debe tener al menos 6 caracteres");
            passwordInput.focus();
            const divMensaje = document.createElement("div");
            divMensaje.classList.add("error");
            divMensaje.textContent =  "La contraseña debe tener al menos 6 caracteres";
            passwordInput.parentElement.appendChild(divMensaje);

            setTimeout(() => {
                divMensaje.remove()
            }, 5000);
            return false;
        }
        
        })
    })
  
