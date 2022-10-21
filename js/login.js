import { run, checkInput, showError, clearErrors } from "./modules/input.js";

const inputSenha = document.querySelector("#senha"); // input de senha
const iconeSenha = document.querySelector(".icone-senha"); // Icone de senha no input


// Preeenche os inputs caso algo tenha sido salvo no localStorage
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

if (iconeSenha) {
  iconeSenha.addEventListener("click", () => {
    if (inputSenha.getAttribute("type") === "password") {
      inputSenha.setAttribute("type", "text");
      iconeSenha.querySelector("rect").classList.add("d-none");
    } else if (inputSenha.getAttribute("type") === "text") {
      inputSenha.setAttribute("type", "password");
      iconeSenha.querySelector("rect").classList.remove("d-none");
    }
  });
}

// Checar se o usuario existe
const checkLogin = (email, senha) => {
  let status = false;

  for (let i = 0; i < cadastros.length; i++) {
    status = cadastros[i].email == email && cadastros[i].senha == senha;
    if (status) break;
  }

  showResult(status);

  return status
};


// Mostra o resultado se o usuario existe ou nao
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


// Cadastrados
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

    let checkResult = checkLogin(email.value, senha.value)

    if (email && senha && checkResult) {
      // Guarda email e senha do usuario
      if (document.querySelector("#lembredemim").checked) { // Caso lembre de mim esteja checado
        localStorage.setItem("email", email.value);
        localStorage.setItem("senha", senha.value);
      }
    }

    
  }
});