const btnCima = document.querySelector(".btn-voltar-cima"); // Botao voltar para cima
const brand = document.querySelector(".navbar-brand"); // Logo no header

const target = document.querySelectorAll("[data-anime]"); // Elementos com data-anime

const userOptions = document.querySelector(".user-options"); // Menu do usuario
const iconeUser = document.querySelector(".user-icon"); // Icone do menu de usuario

const btnContinuar = document.querySelector(".btn-continuar"); // Botao continuar homepage

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