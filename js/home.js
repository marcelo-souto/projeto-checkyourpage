import { run, checkInput, showError, clearErrors } from "./modules/input.js";

const btnEnviar = document.querySelector('[type="submit"]');
const inputs = document.querySelectorAll("input");
// const parametros = new URLSearchParams(location.search);

let apertou = false;

// Checar inputs
if (inputs) {
  inputs.forEach((input, indice) =>
    input.addEventListener("input", () => {
      if (apertou) {
        run(input, indice);
      }
    })
  );
}


// Adicionando evento ao botao submit
btnEnviar.addEventListener("click", (e) => {
  e.preventDefault();
  apertou = true;
  let status = true;

  for (let i = 0; i < inputs.length; i++) {
    if (!run(inputs[i], i)) {
      status = false;
    }
  }

  if (status) {
    let nome = document.querySelector("#nome").value;
    let email = document.querySelector("#email").value;
    window.location = `./cadastro.html?nome=${nome}&email=${email}`;
  }
});