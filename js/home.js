import { run, checkInput, showError, clearErrors } from "./modules/input.js";

const btnEnviar = document.querySelector('[type="submit"]');
const inputs = document.querySelectorAll("input");

let apertou = false;

if (inputs) {
  inputs.forEach((input, indice) =>
    input.addEventListener("input", () => {
      if (apertou) {
        run(input, indice);
      }
    })
  );
}

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
    console.log('passou')
  }
});