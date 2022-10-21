// Importando class e functions para checar inputs
import { Code } from "./modules/class.js";
import { run, checkInput, showError, clearErrors } from "./modules/input.js";

const inputs = document.querySelectorAll("textarea");
const btnEnviar = document.querySelector('[type="submit"]');
let apertou = false; // não apertou

// Mostra na tela o resultado das tags classificadas do objeto
const showOnScreen = (obj) => {
  let resultado = document.querySelector(".resultado");
  let info = document.querySelector(".info");
  let nota = 0;
  let notaInfo = document.querySelector(".nota-info");

  // Fazendo a div surgir
  if (resultado.offsetHeight < 100) {
    resultado.classList.add("padding-x-80");
    resultado.style.height = resultado.scrollHeight + 400 + "px";
    
    setTimeout(() => {
      resultado.style.height = 100 + "%";
    }, 1000);
  }

  // Resetando os elementos
  notaInfo.innerHTML = "";
  info.innerHTML = "";

  obj.forEach((item) => {
    let tagInfo = document.querySelector(".modelo .tag-info").cloneNode(true);

    nota += item.nota; // Incrementando a nota geral

    // Inserindo o nome e nota de cada requisito
    tagInfo.querySelector(".requisito-titulo").innerHTML = item.requisito;
    tagInfo.querySelector(".requisito-nota").innerHTML = item.nota === 0 ? item.nota : item.nota.toFixed(1);

    if (item.tags.length > 0) { // Se tiver tags
      let eachNotaInfo = document.createElement("li");
      eachNotaInfo.innerHTML = `Há ${item.tags.length} ${item.requisito}`;

      notaInfo.append(eachNotaInfo);
    } else { // Se nao tiver
      let eachNotaInfo = document.createElement("li");
      eachNotaInfo.innerHTML = `Não Encontramos ${item.requisito} no seu código;`;

      notaInfo.append(eachNotaInfo);
    }

    let tagsArea = tagInfo.querySelector(".tags");

    if (item.tags) { // Se tiver tag
      item.tags.forEach((tag) => {
        let inputResult = document.createElement("input");

        inputResult.classList.add("input-result");
        inputResult.disabled = true;
        inputResult.value = `${tag}`;
        tagsArea.append(inputResult);
      });
    } else { // Senao tiver
      tagsArea.innerHTML = `<p class="pb-2">Não encontramos ${item.requisito} no seu código</p>`;
    }

    info.append(tagInfo);
  });

  const circle = document.querySelector(".circle-2")
  circle.style.stroke = colorNota(nota)

  document.querySelector(".nota").innerHTML = nota; // Inserindo nota na div
  circle.style.strokeDashoffset = 640 - 640 * (nota / 10); // atualizando circulo de progresso
};


const colorNota = (nota) => {
  let color;

  if (nota < 2.5) {
    color = 'FF2727'
  } else if (nota < 5) {
    color = '#FF9C27'
  } else if (nota < 7.5) {
    color = '#FFF627'
  } else if (nota <= 10) {
    color = '#27FF3D'
  }

  return color
}

// Adiciona eventos a cada requisito em tela
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



// Se tiverem os inputs
if (inputs) {
  // Limpando os espaços vazios do input
  window.addEventListener("load", () => {
    inputs.forEach((input) => {
      input.value = "";
    });
  });

  // Checagem do input após o primeiro clique no botão 
  inputs.forEach((input, indice) =>
    input.addEventListener("input", () => {
      if (apertou) {
        run(input, indice);
      }
    })
  );
}



// Evento de clique ao botao submit
btnEnviar.addEventListener("click", (e) => {
  e.preventDefault();
  apertou = true; // apertou
  let status = true;

  for (let i = 0; i < inputs.length; i++) {
    // 
    if (!run(inputs[i], i)) { // Se os inputs nao forem aprovados
      status = false; // Impeça de algo acontecer
    }
  }

  if (status) { // Se os inputs estiverem com valores corretos
    const codigo = new Code(inputs[0].value, inputs[1].value); // Instancie o objeto
    showOnScreen(codigo.classifyCode()); // classifique as tags e rode a função para inserir na tela
    addEventToTagInfo(); // Adicione os eventos a cada requisito criado
  }
});
