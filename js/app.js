import { Code } from "./class.js";
import { run, checkInput, showError, clearErrors } from "./input.js";

const inputs = document.querySelectorAll("textarea");
const btnEnviar = document.querySelector('[type="submit"]');

if (inputs) {
  inputs.forEach((input, indice) => {
    input.value = "";

    input.addEventListener("input", () => {
      run(input, indice);
    });
  });
}

btnEnviar.addEventListener("click", (e) => {
  e.preventDefault();

  for (let i = 0; i < inputs.length; i++) {
    run(inputs[i], i);
  }
});
