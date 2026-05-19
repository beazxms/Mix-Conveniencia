function campoValido(campo) {
    campo.classList.remove("is-invalid");
    campo.classList.add("is-valid");
}

function campoInvalido(campo) {
    campo.classList.remove("is-valid");
    campo.classList.add("is-invalid");
}

function validarNome() {
    var nome = document.querySelector("#tx_nome");

    if (nome.value.trim().length < 8) {
        campoInvalido(nome);
        return false;
    }

    campoValido(nome);
    return true;
}

function validarEmail() {
    var email = document.querySelector("#tx_email");

    var regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regEx.test(email.value)) {
        campoInvalido(email);
        return false;
    }

    campoValido(email);
    return true;
}

function validarConfirmacaoEmail() {
    var email = document.querySelector("#tx_email");
    var confirmar = document.querySelector("#confirmar_email");

    if (email.value != confirmar.value || confirmar.value == "") {
        campoInvalido(confirmar);
        return false;
    }

    campoValido(confirmar);
    return true;
}

function validarSenha() {
    var senha = document.querySelector("#senha");

    if (senha.value.length < 8 || senha.value.length > 15) {
        campoInvalido(senha);
        return false;
    }

    campoValido(senha);
    return true;
}

function validarConfirmacaoSenha() {
    var senha = document.querySelector("#senha");
    var confirmar = document.querySelector("#confirmar_senha");

    if (senha.value != confirmar.value || confirmar.value == "") {
        campoInvalido(confirmar);
        return false;
    }

    campoValido(confirmar);
    return true;
}

function validarData() {

    var dataCampo = document.querySelector("#dataNascimento");

    var dataNascimento = new Date(dataCampo.value);

    var hoje = new Date();

    if (dataNascimento > hoje || dataCampo.value == "") {

        campoInvalido(dataCampo);

        return false;
    }

    var idade = hoje.getFullYear() - dataNascimento.getFullYear();

    var mes = hoje.getMonth() - dataNascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
        idade--;
    }

    if (idade < 18) {

        campoInvalido(dataCampo);

        return false;
    }

    campoValido(dataCampo);

    return true;
}

function validarCPF(campo) {
    var cpf = campo.value.replace(/[^\d]+/g,'');

    if (cpf.length != 11 ||
        /^(\d)\1+$/.test(cpf)) {

        campoInvalido(campo);
        return false;
    }

    var soma = 0;
    var resto;

    for (i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) {
        resto = 0;
    }

    if (resto != parseInt(cpf.substring(9, 10))) {
        campoInvalido(campo);
        return false;
    }

    soma = 0;

    for (i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) {
        resto = 0;
    }

    if (resto != parseInt(cpf.substring(10, 11))) {
        campoInvalido(campo);
        return false;
    }

    campoValido(campo);
    return true;
}

function mCpf(cpf) {
    var valor = cpf.value;

    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    cpf.value = valor;
}

function mRG(campo) {

    var valor = campo.value;

    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/(\d{2})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1})$/, "$1-$2");

    campo.value = valor;
}

function validarRG() {

    var rg = document.querySelector("#rg");

    var valor = rg.value.replace(/[^\d]+/g, "");

    if (valor.length < 8 || valor.length > 9) {

        campoInvalido(rg);
        return false;
    }

    campoValido(rg);
    return true;
}

function mCEP(cep) {
    var valor = cep.value;

    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/^(\d{5})(\d)/, "$1-$2");

    cep.value = valor;
}

function mTel(campo) {
    var valor = campo.value;

    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
    valor = valor.replace(/(\d)(\d{4})$/, "$1-$2");

    campo.value = valor;
}

function mCel(campo) {
    var valor = campo.value;

    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
    valor = valor.replace(/(\d)(\d{4})$/, "$1-$2");

    campo.value = valor;
}

document.querySelector("#formCadastro")
.addEventListener("submit", function(event){

    var ok =
        validarCPF(document.querySelector("#iCPF")) &&
        validarNome() &&
        validarEmail() &&
        validarConfirmacaoEmail() &&
        validarSenha() &&
        validarConfirmacaoSenha() &&
        validarData() &&
        validarRG();

    if (!ok) {
        event.preventDefault();
    }
});

async function buscarCEP() {

    var cep = document.querySelector("#iCEP").value;

    cep = cep.replace(/\D/g, "");

    if (cep.length != 8) {
        return;
    }

    var resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    var dados = await resposta.json();

    if (dados.erro) {

        document.querySelector("#iCEP")
        .classList.add("is-invalid");

        return;
    }

    document.querySelector("#endereco").value = dados.logradouro;

    document.querySelector("#bairro").value = dados.bairro;

    document.querySelector("#cidade").value = dados.localidade;

    document.querySelector("#estado").value = dados.uf;
}