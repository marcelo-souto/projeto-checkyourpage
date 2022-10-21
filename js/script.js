const btnCima = document.querySelector(".btn-voltar-cima"); // Botao voltar para cima
const brand = document.querySelector("#homepage .navbar-brand"); // Logo no header

const target = document.querySelectorAll("[data-anime]"); // Elementos com data-anime

const userOptions = document.querySelector(".user-options"); // Menu do usuario
const iconeUser = document.querySelector(".user-icon"); // Icone do menu de usuario

const iconeSenha = document.querySelector(".icone-senha"); // Icone de senha no input
const inputSenha = document.querySelector("#senha"); // input de senha

const btnContinuar = document.querySelector(".btn-continuar"); // Botao continuar homepage
// const parametros = new URLSearchParams(location.search);

/* ==================================== Funções ================================= */

// Aparecer o botao voltar para cima e o logo no header
const showElements = () => {
  if (window.scrollY > 340) {
    btnCima.style.bottom = "16px";
    if (brand) {
      brand.classList.remove("opacity-0");
    }
  } else {
    btnCima.style.bottom = "-60px";
    if (brand) {
      brand.classList.add("opacity-0");
    }
  }
};

// Animar conforme a diferença entre o elemento e o tamanho da tela
const animate = () => {
  const windowTop = window.pageYOffset + (window.innerHeight * 3) / 4;
  target.forEach((element) => {
    if (windowTop > element.offsetTop) {
      element.classList.add("animate");
    } else {
      element.classList.remove("animate");
    }
  });
};

// Scroll da tela para o topo da página
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Função para mostrar um elemento
const mostrarDiv = (div, display) => {
  div.style.display = display;
  setTimeout(() => {
    div.style.opacity = 1;
  }, 200);
};

// Função para esconder um elemento
const esconderDiv = (div) => {
  div.style.opacity = 0;
  setTimeout(() => {
    div.style.display = "none";
  }, 200);
};

// funcao para diminuir a chamada da funcao
const debounce = (func, wait, immediate) => {
  let timeout;

  return function (...args) {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

/* ====================== Chamada de Funções ================================== */

// Adicionando funcao de voltar ao topo ao botao
if (btnCima) {
  btnCima.addEventListener("click", scrollToTop);
}

// Pegando valores do input da pagina home e enviando estes valores via URL
if (btnContinuar) {
  btnContinuar.addEventListener("click", (e) => {
    e.preventDefault(); // PreventDefault pra evitar que rode
    let nome = document.querySelector("#nome").value;
    let email = document.querySelector("#email").value;
    window.location = `./teste.html?nome=${nome}&email=${email}`;
  });
}

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

animate();

window.addEventListener(
  "scroll",
  debounce(function () {
    animate();
    showElements();
  }, 200)
);

if (iconeUser && userOptions && window.innerWidth > 768) {
  iconeUser.addEventListener("mouseenter", () => {
    mostrarDiv(userOptions, "flex");
  });

  userOptions.addEventListener(
    "mousemove",
    debounce(() => {
      mostrarDiv(userOptions, "flex");
    }, 200)
  );

  userOptions.addEventListener("mouseleave", () => {
    setTimeout(() => {
      esconderDiv(userOptions);
    }, 1500);
  });
}

//  console.log(senhaValida("test1234"));
//  console.log(senhaValida("Test123@"));
//  console.log(senhaValida("Teste123@"));

//  let texto_resultado = document.createElement('p');
//  texto_resultado.innerText = senhaValida('teste1234');
//  document.body.append(texto_resultado);

const envio = document.querySelector('#enviar');

envio.addEventListener('click', (enviar) => {
  enviar.preventDefault();
  let email = document.querySelector('#email').value;
  let senha = document.querySelector('#senha').value;


  // Validar Senha 
  
  function senhaValida(p) {
    let retorno = false;
    let letrasMaiusculas = /[A-Z]/;
    let letrasMinusculas = /[a-z]/;
    let numeros = /[0-9]/;
    let caracteresEspeciais = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
    if (p.length > 8) {
      return retorno;
    }
    if (p.length < 8) {
      return retorno;
    }
    let auxMaiuscula = 0;
    let auxMinuscula = 0;
    let auxNumero = 0;
    let auxEspecial = 0;
    for (let i = 0; i < p.length; i++) {
      if (letrasMaiusculas.test(p[i]))
        auxMaiuscula++;
      else if (letrasMinusculas.test(p[i]))
        auxMinuscula++;
      else if (numeros.test(p[i]))
        auxNumero++;
      else if (caracteresEspeciais.test(p[i]))
        auxEspecial++;
    }
    if (auxMaiuscula > 0) {
      if (auxMinuscula > 0) {
        if (auxNumero > 0) {
          if (auxEspecial) {
            retorno = true;
          }
        }
      }
    };
    return retorno;
  }
  let resultado = senhaValida(senha);
  if (resultado == true){
    alert('Válido');
  } else if (resultado == false){
    alert('Inválido');
  }else{
    ('Tente Novamente');
  };
});
