import { Code } from "./class.js";
import { run, checkInput, showError, clearErrors } from "./input.js";

const inputs = document.querySelectorAll("textarea");
const btnEnviar = document.querySelector('[type="submit"]');
let apertou = false;



if (inputs) {

  window.addEventListener('load', () => {
    inputs.forEach(input => {
      input.value = ''
    })
  })

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
  apertou = true
  let status = true

  for (let i = 0; i < inputs.length; i++) {
    if (!run(inputs[i], i)) {
      status = false;
    }
  }

  if (status) {
    const codigo = new Code (inputs[0].value, inputs[1].value)
    let { semanticTags, acessibilityAttributes, metaTags, mediaQueries } = codigo
    console.log(semanticTags)
    console.log(acessibilityAttributes)
    console.log(metaTags)
    console.log(mediaQueries)
  }
});