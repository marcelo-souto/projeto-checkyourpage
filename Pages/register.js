const btnCima = document.querySelector(".btn-voltar-cima");

const showElements = () => {
    if (window.scrollY > 340) {
        btnCima.style.bottom = "16px";
        brand.classList.remove("opacity-0");
    } else {
        btnCima.style.bottom = "-60px";
        brand.classList.add("opacity-0");
    }
}

if (btnCima) {
    btnCima.addEventListener("click", scrollToTop)
}
