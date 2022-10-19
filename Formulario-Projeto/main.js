function valida() {
    let valor_senha = document.querySelector('#senha').value;
    let valor_email = document.querySelector('#email').value;
     if ( valor_email == '') {
        alert('Preencha todos os campos, por favor.');
        document.querySelectorAll('small')[0].classList.remove('d-none');
    } else if(valor_senha == ''){
        document.querySelectorAll('small')[1].classList.remove('d-none');
    }
     else{
        alert('Enviado com sucesso.');
        console.log(valor_email) 
    }
}