
document.addEventListener("DOMContentLoaded", function(){
    //Elementos de la interfaz
    const nombreInput = document.querySelector("#nombre");
    const usuarioInput = document.querySelector("#usuario");
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const imagenInput = document.querySelector("#imagen");
    const boton = document.querySelector("button");
    const formulario = document.querySelector(".formulario-register");
    const campo = document.querySelector(".campo")

    


    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        //Validando nombre
        if(nombreInput.value.trim()=== ""){
            //alert("El campo Nombre Completo es Obligatorio");
            
            nombreInput.focus();
            const divMensaje = document.createElement("div");
            divMensaje.classList.add("error");
            divMensaje.textContent =  "El campo Nombre Completo es Obligatorio";
            nombreInput.parentElement.appendChild(divMensaje);

            setTimeout(() => {
                divMensaje.remove()
            }, 5000);
            return false;
        }

        //Validando nombre Usuario
        if(usuarioInput.value.trim()=== ""){
            //alert("El campo Nombre Completo es Obligatorio");

            usuarioInput.focus();
            const divMensaje = document.createElement("div");
            divMensaje.classList.add("error");
            divMensaje.textContent =  "El campo Nombre Completo es Obligatorio";
            usuarioInput.parentElement.appendChild(divMensaje);

            setTimeout(() => {
                divMensaje.remove()
            }, 5000);
            return false;
        }

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

        //validando imagen
        if(imagenInput.files.length === 0){
            imagenInput.focus();
            const divMensaje = document.createElement("div");
            divMensaje.classList.add("error");
            divMensaje.textContent =  "Debes seleccionar una Imagen";
            imagenInput.parentElement.appendChild(divMensaje);

            setTimeout(() => {
                divMensaje.remove()
            }, 5000);
            return false;
        } else {
            const file = imagenInput.files[0];
            const acceptedExtensions = [".jpg", ".png", ".gif"]

            if(!acceptedExtensions.includes(file.type)) {
                imagenInput.focus();
                const divMensaje = document.createElement("div");
                divMensaje.classList.add("error");
                divMensaje.textContent =  `Las extensiones de archivo permitidas son ${this.acceptedExtensions.join (", ")}`;
                imagenInput.parentElement.appendChild(divMensaje);

            setTimeout(() => {
                divMensaje.remove()
            }, 5000);
            return false;
            }
        }


        formulario.submit()

    })
    function validarEmail(email) {
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regexEmail.test(email);
    }
    
    



})