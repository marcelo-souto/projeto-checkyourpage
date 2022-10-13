const btnCima = document.querySelector(".btn-voltar-cima");
const brand = document.querySelector(".navbar-brand");
const btnContinuar = document.querySelector(".btn-continuar");
const target = document.querySelectorAll("[data-anime]");
// const parametros = new URLSearchParams(location.search);


// Aparecer o botao voltar para cima e o logo no header
const showElements = () => {
  if (window.scrollY > 340) {
    btnCima.style.bottom = "16px";
    brand.classList.remove("opacity-0");
  } else {
    btnCima.style.bottom = "-60px";
    brand.classList.add("opacity-0");
  }
}


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
}


// Scroll da tela para o topo da página
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth" 
  })
}


// Adicionando funcao de voltar ao topo ao botao
if (btnCima) {
  btnCima.addEventListener("click", scrollToTop)
}


// Pegando valores do input da pagina home e enviando estes valores via URL
if (btnContinuar) {
  btnContinuar.addEventListener("click", (e) => {
    e.preventDefault(); // PreventDefault pra evitar que rode
    let nome = document.querySelector("#nome").value;
    let email = document.querySelector("#email").value;
    e.target.href = `./teste.html?nome=${nome}&email=${email}`;
  });
}


// funcao para diminuir a chamada da funcao
const debounce = (func, wait, immediate) => {
  let timeout;

  return function(...args) {
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


animate()

window.addEventListener('scroll', debounce (function () {
  animate()
  showElements()
}, 200))

