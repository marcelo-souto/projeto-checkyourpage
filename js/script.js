let btnCima = document.querySelector(".btn-voltar-cima");
let brand = document.querySelector(".navbar-brand");

window.addEventListener("scroll", () => {
  if (window.scrollY > 340) {
    btnCima.style.bottom = "16px";
    brand.classList.remove('opacity-0')
  } else {
    btnCima.style.bottom = "-60px";
    brand.classList.add('opacity-0')
  }
});

btnCima.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
