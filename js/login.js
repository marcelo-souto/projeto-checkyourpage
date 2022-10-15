// const validador = {
//     handleSubmit: (event) => {
//         event.preventDefault();
//         let send = true;

//         let inputs = formulario.querySelectorAll('input');

//         validador.clearErrors()

//         for (let i = 0; i < inputs.length; i++) {
//             let input = inputs[i];
//             let check = validador.checkInput(input)
//             if (check !== true) {
//                 send = false;
//                 validador.showError(input, check)
//             }
//         }

//         if (send) {
//             formulario.submit();
//         }
//     },

//     checkInput: (input) => {
//         let rules = input.getAttribute('data-rules');

//         if (rules !== null) {
//             rules = rules.split(" ");

//             for (let rule in rules) {
//                 let ruleDetails = rules[rule].split('=');

//                 switch (ruleDetails[0]) {
//                     case 'required':
//                         if (input.value == '') {
//                             return `Campo Vazio`;
//                         }
//                     break;
//                     case 'min':
//                         if (input.value.length < ruleDetails[1]) {
//                             return `Obrigatorio pelo menos ${ruleDetails[1]} caracteres.`
//                         }
//                     break;
//                     case 'email':
//                         if (input.value !== '') {
//                             if (! /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(input.value.toLowerCase())) {
//                                 return `Insira um email válido.`
//                             }
//                         }
//                     break;
//                 }
//             }
//         }

//         return true
//     },

//     showError: (input, erro) => {
//         input.classList.add('is-invalid')

//         let errorElement = document.createElement('div');
//         errorElement.classList.add('erro');
//         errorElement.innerHTML = erro;

//         input.parentElement.insertBefore(errorElement, input.elementSibling)
//     },

//     clearErrors: () => {
//         let inputs = formulario.querySelectorAll('input')

//         for (let i = 0; i < inputs.length; i++) {
//             inputs[i].classList.remove('is-invalid')
//         }

//         let errorElements = document.querySelectorAll('.erro')

//         for (let i = 0; i < errorElements.length; i++) {
//             errorElements[i].remove()
//         }
//     }
// }

// const formulario = document.querySelector(".formulario")
// formulario.addEventListener('submit', validador.handleSubmit)




const rodar = (input) => {
  clearErrors(input);

  let check = checkInput(input);
  if (check !== true) {
    showError(input, check);
  }
};

const checkInput = (input) => {
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
      }
    }
  }

  return true;
};

const showError = (input, erro) => {
  input.classList.add("is-invalid");

  let errorElement = document.createElement("div");
  errorElement.classList.add("erro");
  errorElement.innerHTML = erro;

  input.parentElement.insertBefore(errorElement, input.elementSibling);
};

const clearErrors = (input) => {
  input.classList.remove("is-invalid");

  let errorElements = document.querySelectorAll(".erro");

  for (let i = 0; i < errorElements.length; i++) {
    errorElements[i].remove();
  }
  
};

const Inputs = document.querySelectorAll("input");

Inputs.forEach(input => input.addEventListener('input', () => {
    rodar(input)
}))
