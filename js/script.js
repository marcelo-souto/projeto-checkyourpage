const btnCima = document.querySelector(".btn-voltar-cima");
const brand = document.querySelector(".navbar-brand");
const btnContinuar = document.querySelector(".btn-continuar");
const parametros = new URLSearchParams(location.search);

// Aparecer o botao voltar para cima e o logo no header
window.addEventListener("scroll", () => {
  if (window.scrollY > 340) {
    btnCima.style.bottom = "16px";
    brand.classList.remove("opacity-0");
  } else {
    btnCima.style.bottom = "-60px";
    brand.classList.add("opacity-0");
  }
});
// Adicionando funcao de voltar ao topo ao botao
if (btnCima) {
  btnCima.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
// Pegando valores do input da pagina home e enviando estes valores via URL
if (btnContinuar) {
  btnContinuar.addEventListener("click", (e) => {
    e.preventDefault() // PreventDefault pra evitar que rode
    let nome = document.querySelector("#nome").value;
    let email = document.querySelector("#email").value;
    e.target.href = `./teste.html?nome=${nome}&email=${email}`;
  });
}

// if (window.location.href.includes('teste')) {
//   parametros.forEach(p => console.log(p))
// }