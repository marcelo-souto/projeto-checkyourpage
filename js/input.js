const run = (input, indice) => {
  clearErrors(input, indice);

  let check = checkInput(input);
  if (check !== true) {
    showError(input, check, indice);
  } else {
    return check;
  }
};

const checkInput = (input) => {
  let rules = input.getAttribute("data-rules");

  if (rules !== null) {
    rules = rules.split(" ");

    for (let rule in rules) {
      let ruleDetails = rules[rule].split("=");

      switch (ruleDetails[0]) {
        case "required":
          if (input.value == "") {
            return `Campo Vazio`;
          }
          break;
        case "min":
          if (input.value.length < ruleDetails[1]) {
            return `Obrigatorio pelo menos ${ruleDetails[1]} caracteres.`;
          }
          break;
        case "email":
          if (input.value !== "") {
            if (
              !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(
                input.value.toLowerCase()
              )
            ) {
              return `Insira um email válido.`;
            }
          }
          break;
      }
    }
  }

  return true;
};

const showError = (input, erro, indice) => {
  input.classList.remove("valido");
  input.classList.add("invalido");

  let elementError = document.querySelectorAll(".invalid-feedback")[indice];

  elementError.classList.add("d-block");

  elementError.innerHTML = erro;
};

const clearErrors = (input, indice) => {
  input.classList.remove("invalido");

  let elementError = document.querySelectorAll(".invalid-feedback")[indice];

  if (elementError) {
    elementError.innerHTML = "";
  }

  input.classList.add("valido");
};

const fillInputs = () => {
  const inputs = document.querySelectorAll("input");

  for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i]
    let id = input.getAttribute("id");

    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) == id) {
        input.value = localStorage.getItem(id)
      }
    }
  }
};

const btnEnviar = document.querySelector('[type="submit"]');
const inputs = document.querySelectorAll("input");
let apertou = false;

window.addEventListener("load", fillInputs);

inputs.forEach((input, indice) =>
  input.addEventListener("input", () => {
    if (apertou) {
      run(input, indice);
    }
  })
);

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
    window.location = "./index.html";

    const email = document.querySelector("#email");
    const senha = document.querySelector("#senha");

    if (document.querySelector("#lembredemim").checked) {
      localStorage.setItem("email", email.value);
      localStorage.setItem("senha", senha.value);
    }
  }
});
