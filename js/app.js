import { Code } from "./class.js";
import { run, checkInput, showError, clearErrors } from "./input.js";

const inputs = document.querySelectorAll("textarea");
const btnEnviar = document.querySelector('[type="submit"]');
let apertou = false;

// =================================================================
const showOnScreen = (obj) => {
  let info = document.querySelector(".info");
  let nota = 0;
  let notaInfo = document.querySelector(".nota-info");

  obj.forEach((item) => {
    let tagInfo = document.querySelector(".modelo .tag-info").cloneNode(true);

    nota += item.nota;

    tagInfo.querySelector(".requisito-titulo").innerHTML = item.requisito;
    tagInfo.querySelector(".requisito-nota").innerHTML = item.nota.toFixed(1);

    if (item.tags.length > 0) {
      let eachNotaInfo = document.createElement("li");
      eachNotaInfo.innerHTML = `Encontramos ${item.tags.length} ${item.requisito} no seu código;`;

      notaInfo.append(eachNotaInfo);
    } else {
      let eachNotaInfo = document.createElement("li");
      eachNotaInfo.innerHTML = `Não Encontramos ${item.requisito} no seu código;`;

      notaInfo.append(eachNotaInfo)
    }

    let tagsArea = tagInfo.querySelector(".tags");
    if (item.tags) {
      item.tags.forEach((tag) => {
        let inputResult = document.createElement("input");

        inputResult.classList.add("input-result");
        inputResult.disabled = true;
        inputResult.value = `${tag}`;
        tagsArea.append(inputResult);
      });
    } else {
      tagsArea.innerHTML = `Não encontramos ${item.requisito} no seu código`;
    }

    info.append(tagInfo);
  });

  document.querySelector(".nota").innerHTML = nota;
  document.querySelector("circle").style.strokeDashoffset =
    640 - 640 * (nota / 10);

  console.log(obj);
};

// ===============================================================

const addEventToTagInfo = () => {
  let requisitoEl = document.querySelectorAll(".info .requisito");
  requisitoEl.forEach((el) => {
    el.addEventListener("click", () => {
      let tagEl = el.nextElementSibling;

      if (tagEl.classList.contains("active")) {
        tagEl.classList.remove("active");
        tagEl.style.height = 0 + "px";
      } else {
        tagEl.classList.add("active");
        tagEl.style.height = tagEl.scrollHeight + 12 + "px";
      }
    });
  });
};

// ==================================================================

if (inputs) {
  window.addEventListener("load", () => {
    inputs.forEach((input) => {
      input.value = "";
    });
  });

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
    const codigo = new Code(inputs[0].value, inputs[1].value);
    showOnScreen(codigo.classifyCode());
    addEventToTagInfo();
  }
});
