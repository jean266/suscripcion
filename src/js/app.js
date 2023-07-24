
document.addEventListener('DOMContentLoaded', () => {

    // Objeto donde se guarda el email
    const email = {
        email: ""
    };

    // Variables
    const inputEmail = document.querySelector('#email');
    const btnSubmit = document.querySelector("#form input[type='submit']");
    const divAlert = document.querySelector(".div_email");
    const spinner = document.querySelector(".spinner");
    const container = document.querySelector(".container");

    // Añadir Evento
    btnSubmit.addEventListener('click', send);
    inputEmail.addEventListener('input', validate);

    // Valida que las condiciones evaluadas se cumplan e imprime las alertas
    function validate (e) {
        e.preventDefault();
        
        // Valida que el campo email no este vacio
        if(inputEmail.value.trim() === "") {
            cleanAlert();
            printMessage("Email is required");
            inputEmail.classList.add("active");
            return;
        }
        
        // Valida que el email sea valido
        if(!checkEmail(inputEmail.value)) {
            cleanAlert();
            printMessage("Valid email required");
            inputEmail.classList.add("active");
            return;
        }
        
        // Asigna el valor del email al objeto
        email[inputEmail.name] = inputEmail.value.trim();
        cleanAlert();
        return true;

    }

    // Envia la notificacion al email
    function send (e) {
        e.preventDefault();
        const result = validate(e);

        if(result) {
            spinner.classList.remove("oculto");

            setTimeout(() => {
                spinner.classList.add("oculto");

                printSuccess();
            }, 2000);
            
        }
    }

    // Imprime el mensaje de alerta
    function printMessage(message) {
        const messageAlert = document.createElement('P');
        messageAlert.classList.add('alert', "margin-none");
        messageAlert.textContent = message;
        
        divAlert.appendChild(messageAlert)

    }

    // Imprime el mensaje de exito
    function printSuccess() {
        const div = document.createElement("DIV");
        const divInfo = document.createElement("DIV");
        const img = document.createElement("IMG");
        const title = document.createElement('H2');
        const paragraph = document.createElement("P");
        const button = document.createElement("BUTTON");

        div.classList.add('success');
        divInfo.classList.add("success_info");

        img.src = "assets/images/icon-list.svg";
        img.alt = "icon";

        title.innerHTML = "Thanks for <br>subscribing!";

        paragraph.innerHTML = `A confirmation email has been sent to <span>${email.email}.</span>
         Please open it and click the button inside to confirm your subscription.`

        button.textContent = "Dismiss message";
        button.classList.add("hover", "btnDismiss");

        divInfo.appendChild(img);
        divInfo.appendChild(title);
        divInfo.appendChild(paragraph);
        div.appendChild(divInfo);
        div.appendChild(button);
        
        container.innerHTML = "";
        container.appendChild(div);

        // Vuelve al inicio la pagina
        button.addEventListener('click', () => {
            window.location.reload();
        })
        
    }

    // Limpia las alertas
    function cleanAlert() {
        const alert = document.querySelector(".alert");

        if(alert) {
            alert.remove();
            inputEmail.classList.remove("active");
        }

    }

    // Verifica que el email sea valida
    function checkEmail ( email ) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const result = regex.test(email);
        return result;
    }

})