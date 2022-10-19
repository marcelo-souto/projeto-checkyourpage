export const run = (input, indice) => {
  clearErrors(input, indice);

  let check = checkInput(input);
  if (check !== true) {
    showError(input, check, indice);
  } else {
    return check;
  }
};

export const checkInput = (input) => {
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
        case "html":
          if (!/<[^\/].*?>/gi.test(input.value)) {
            return `Insira um código html válido.`;
          }
          break;
        case "css":
          if (!/.*?\{+?\n*?.*?\n*?\}+?/gi.test(input.value)) {
            return `Insira um código css válido.`;
          }
          break;
      }
    }
  }

  return true;
};

export const showError = (input, erro, indice) => {
  input.classList.add("invalido");

  let elementError = document.querySelectorAll(".invalid-feedback")[indice];

  elementError.classList.add("d-block");

  elementError.innerHTML = erro;
};

export const clearErrors = (input, indice) => {
  input.classList.remove("invalido");
  let elementError = document.querySelectorAll(".invalid-feedback")[indice];

  if (elementError) {
    elementError.innerHTML = "";
  }
};

// =====================================================================

const fillInputs = () => {
  const inputs = document.querySelectorAll("input");

  for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    let id = input.getAttribute("id");

    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) == id) {
        input.value = localStorage.getItem(id);
      }
    }
  }
};

// ======================================================================

const checkLogin = (email, senha) => {
  let status = false;

  for (let i = 0; i < cadastros.length; i++) {
    status = cadastros[i].email == email && cadastros[i].senha == senha;
    if (status) break;
  }

  showResult(status);
};

const showResult = (status) => {
  if (status) {
    window.location = "./index.html";
  } else {
    document.querySelectorAll(".invalid-feedback").forEach((msg) => {
      msg.previousElementSibling.classList.add("invalido");
      msg.classList.add("d-block");
      msg.innerHTML = "Usuário ou senha incorretos";
    });
  }
};

// =======================================================================

let cadastros = [
  {
    email: "marcelosouto676@gmail.com",
    senha: "12345678",
  },
  {
    email: "teste@hotmail.com",
    senha: "abcd1234",
  },
  {
    email: "email@email.com",
    senha: "usuario123",
  },
];

// let cadastrosJs = []
// localStorage.setItem('cadastrosJs', JSON.stringify(cadastrosJs))
// console.log(localStorage)

const btnEnviar = document.querySelector('[type="submit"]');
const inputs = document.querySelectorAll("input");

let apertou = false;

window.addEventListener("load", fillInputs);

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
    const email = document.querySelector("#email");
    const senha = document.querySelector("#senha");

    if (email && senha) {
      if (document.querySelector("#lembredemim").checked) {
        localStorage.setItem("email", email.value);
        localStorage.setItem("senha", senha.value);
      }
    }

    checkLogin(email, senha);
  }
});
