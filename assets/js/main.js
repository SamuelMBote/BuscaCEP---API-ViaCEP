const tiposAPI = ['JSON', 'JSONP', 'XML'];
const digitaCEP = document.querySelector('#digitaCEP');
const submitCep = document.querySelector('#submitCEP');
const listaTiposAPI = document.querySelector('#listaTiposAPI');
const cep = document.querySelector('#cep');
const logradouro = document.querySelector('#logradouro');
const complemento = document.querySelector('#complemento');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade');
const uf = document.querySelector('#uf');
const ibge = document.querySelector('#ibge');
const ddd = document.querySelector('#ddd');
const vibracaoErro = (mensagem) => {
  window.navigator.vibrate(300).pipe(window.alert(mensagem));
};

let resultado = [];
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
      consultaViaCepv2(
        listaTiposAPI.value.toLowerCase(),
        digitaCEP.value.replace('-', ''),
      );
    } else {
      vibracaoErro('Digite um CEP válido!');
    }
  });

  /* function consultaViaCepXML(api, cep) {
    if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
    } else {
      xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }

    xmlhttp.open('GET', `https://viacep.com.br/ws/${cep}/${api}/`, false);
    xmlhttp.send();
    if (xmlhttp.responseXML.documentElement.querySelector('erro')) {
      return (resultado = {
        erro: true,
        cep: '',
        logradouro: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
        ibge: '',
        ddd: '',
      });
    } else {
      return (resultado = {
        erro: false,
        cep: xmlhttp.responseXML.documentElement.querySelector('cep').innerHTML,
        logradouro:
          xmlhttp.responseXML.documentElement.querySelector('logradouro')
            .innerHTML,
        complemento:
          xmlhttp.responseXML.documentElement.querySelector('complemento')
            .innerHTML,
        bairro:
          xmlhttp.responseXML.documentElement.querySelector('bairro').innerHTML,
        cidade:
          xmlhttp.responseXML.documentElement.querySelector('localidade')
            .innerHTML,
        uf: xmlhttp.responseXML.documentElement.querySelector('uf').innerHTML,
        ibge: xmlhttp.responseXML.documentElement.querySelector('ibge')
          .innerHTML,
        ddd: xmlhttp.responseXML.documentElement.querySelector('ddd').innerHTML,
      });
    }
  }*/
  function consultaViaCepv2(api, cep) {
    fetch(`https://viacep.com.br/ws/${cep}/${api}/`)
      .then((resposta) => resposta.text())
      .then((resposta) => {
        if (listaTiposAPI.value.toLowerCase() == 'json') {
          return (resultado = JSON.parse(resposta));
        } else if (listaTiposAPI.value.toLowerCase() == 'xml') {
          let xmlViaCep = new window.DOMParser().parseFromString(
            resposta,
            'text/xml',
          );

          if (xmlViaCep.documentElement.querySelector('erro')) {
            return (resultado = {
              erro: true,
              cep: '',
              logradouro: '',
              complemento: '',
              bairro: '',
              cidade: '',
              uf: '',
              ibge: '',
              ddd: '',
            });
          } else {
            return (resultado = {
              erro: false,
              cep: xmlViaCep.documentElement.querySelector('cep').innerHTML,
              logradouro:
                xmlViaCep.documentElement.querySelector('logradouro').innerHTML,
              complemento:
                xmlViaCep.documentElement.querySelector('complemento')
                  .innerHTML,
              bairro:
                xmlViaCep.documentElement.querySelector('bairro').innerHTML,
              cidade:
                xmlViaCep.documentElement.querySelector('localidade').innerHTML,
              uf: xmlViaCep.documentElement.querySelector('uf').innerHTML,
              ibge: xmlViaCep.documentElement.querySelector('ibge').innerHTML,
              ddd: xmlViaCep.documentElement.querySelector('ddd').innerHTML,
            });
          }
        }
      })
      .then(preencheTela);
  }
}
function resetaTela() {
  cep.innerHTML = '';
  logradouro.value = '';
  complemento.value = '';
  bairro.value = '';
  cidade.value = '';
  uf.value = '';
  ibge.value = '';
  ddd.value = '';
}

function preencheTela() {
  if (resultado.erro == true) {
    vibracaoErro('CEP não Encontrado!');
    resetaTela();
  } else {
    resultado.erro = false;
    resultado.cep == ''
      ? cep.innerHTML == 'NÃO INFORMADO'
      : (cep.innerHTML = resultado.cep);

    resultado.logradouro == ''
      ? (logradouro.value = 'NÃO INFORMADO')
      : (logradouro.value = resultado.logradouro);

    resultado.complemento == ''
      ? (complemento.value = 'NÃO INFORMADO')
      : (complemento.value = resultado.complemento);

    resultado.bairro == ''
      ? (bairro.value = 'NÃO INFORMADO')
      : (bairro.value = resultado.bairro);

    resultado.cidade == ''
      ? (cidade.value = 'NÃO INFORMADO')
      : (cidade.value = resultado.cidade);

    resultado.uf == ''
      ? (uf.value = 'NÃO INFORMADO')
      : (uf.value = resultado.uf);

    resultado.ibge == ''
      ? (ibge.value = 'NÃO INFORMADO')
      : (ibge.value = resultado.ibge);

    resultado.ddd == ''
      ? (ddd.value = 'NÃO INFORMADO')
      : (ddd.value = resultado.ddd);
  }
}

enviaCep();
