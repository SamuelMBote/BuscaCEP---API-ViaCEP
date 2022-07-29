const tiposAPI = ['JSON', 'JSONP', 'XML'];
const digitaCEP = document.querySelector('#digitaCEP');
const submitCep = document.querySelector('#submitCEP');
const listaTiposAPI = document.querySelector('#listaTiposAPI');

window.addEventListener('load', createBuscaCEPSearchForm);

function createBuscaCEPSearchForm() {
  digitaCEP.setAttribute('maxlength', '9');

  tiposAPI.forEach((tipo) => {
    let option = document.createElement('option');
    option.value = tipo;
    option.innerHTML = tipo;
    if (option.innerHTML.toString().toLowerCase().includes('xml')) {
      option.setAttribute('selected', '');
    }
    listaTiposAPI.innerHTML += option.outerHTML;
  });
}

function enviaCep() {
  submitCep.addEventListener('click', function () {
    if (
      digitaCEP.value &&
      digitaCEP.value.toString().replace('-', '').length == 8
    ) {
      consultaViaCEp(
        listaTiposAPI.value.toLowerCase(),
        digitaCEP.value.replace('-', ''),
      );
    } else {
      window.alert('Digite um CEP válido!');
    }
  });

  function consultaViaCEp(api, cep) {
    if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
    } else {
      xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }

    xmlhttp.open('GET', `https://viacep.com.br/ws/${cep}/${api}/`, false);
    xmlhttp.send();
    const endereco =
      xmlhttp.responseXML.documentElement.querySelectorAll('xmlcep');
    console.log(xmlhttp.responseXML);
  }
}
enviaCep();
