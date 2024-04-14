const axios = require("axios");

function soma(a, b) {
    return a + b;
}

function tamanho_string (string) {
    return string.length;
}

function nome_usuario (string) {
    return string.slice(0, string.indexOf("@"))
}

function jaca_wars (velocidade, theta) {
    if (((velocidade**2) * Math.sin(2*(theta*Math.PI/180))/9.8) > 102) {
        return 1;
    } else if (((velocidade**2) * Math.sin(2*(theta*Math.PI/180))/9.8) < 98) {
        return -1;
    } else {
        return 0;
    }
}

function ano_bissexto (ano) {
    if (ano % 400 === 0) {
        return true;
    } else if (ano % 100 === 0) {
    return false;
    } else if (ano % 4 === 0) {
    return true;
    } else {
    return false;
    }
}

function volume (z, a) {
    return Math.round(Math.PI*z*z*a);
}

function mru (s0, v, t) {
    return s0 + v*t;
}

function inverte (string) {
    return string.split('').reverse().join('');
}

function valores (dicionario) {
    let somatorio = 0;
    for (let chave in dicionario) {
        somatorio += dicionario[chave];
    }
    return somatorio;
}

function ePrimo(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;

    if (num % 2 === 0 || num % 3 === 0) return false;

    let i = 5;
    while (i * i <= num) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
        i += 6;
    }

    return true;
}

function enesimoPrimo(n) {
    if (n === 1) {
        return 2;
    }
    let count = 1;
    let number = 3;
    while (count < n) {
        if (ePrimo(number)) {
            count++;
        }
        if (count === n) {
            return number;
        }
        number += 2; // Avança para o próximo número ímpar
    }
}

function achaPrefixo(string1, string2) {
    const tamanho = Math.min(string1.length, string2.length);
    
    let prefixo = "";
    for (let i = 0; i < tamanho; i++) {
        if (string1[i] !== string2[i]) {
            break;
        }
        prefixo += string1[i];
    }
    return prefixo;
}

function maiorPrefixo(strings) {
    let maiorPrefixo = "";
    
    for (let i = 0; i < strings.length; i++) {
        for (let j = i + 1; j < strings.length; j++) {
            const prefixo = achaPrefixo(strings[i], strings[j]);
        
            if (prefixo.length > maiorPrefixo.length) {
                maiorPrefixo = prefixo;
            }
        }
    }
    return maiorPrefixo;
}

function somaMaior(numeros) {
    numeros.sort((a, b) => a - b);
    
    if (numeros.length < 2) {
        return 0;
    }
    
    const segundoMenor = numeros[1];
    const segundoMaior = numeros[numeros.length - 2];
    return segundoMenor + segundoMaior;
}

function ehPalindromo(string) {
    const stringReversa = string.split('').reverse().join('');
    return string === stringReversa;
}

function contarPalindromos(strings) {
    let contador = 0;
    
    for (let palavra of strings) {
        if (ehPalindromo(palavra)) {
            contador++;
        }
    }
    return contador;
}

function somaValoresInteiros(strings) {
    return strings.map(str => parseInt(str)).reduce((acc, curr) => acc + curr, 0);
}

async function get_req(token, slug){
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    return axios
        .get(`https://tecweb-js.insper-comp.com.br/exercicio/${slug}`, config)
        .then((response) => response)
}

async function requisicoes (token, endpoints) {
    let soma = 0;
    for (let endpoint of endpoints) {
        let response = await get_req(token, endpoint.slice(-26));
        soma += response.data;
    }
    return soma;
}

async function questao_final (token, endpoint) {
    let response = await get_req(token, endpoint.slice(-21));
    return response;
}

async function get_token(){
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    return axios
        .post("https://tecweb-js.insper-comp.com.br/token", { username: "andersonsfj" }, config)
        .then((response) => response.data.accessToken);
}

async function envia_resposta(slug, token, resposta){
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    if (slug == 'ano-bissexto') {
        return axios
        .post(`https://tecweb-js.insper-comp.com.br/exercicio/${slug}`, { resposta: resposta }, config)
        .then((response) => response);
    }

    return axios
        .post(`https://tecweb-js.insper-comp.com.br/exercicio/${slug}`, { resposta: `${resposta}` }, config)
        .then((response) => response.data);
}

async function get_exercises(token){
    const config2 = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    return axios
        .get("https://tecweb-js.insper-comp.com.br/exercicio", config2)
        .then((response) => response)
}

async function main(){
    let token = await get_token();
    let exercises = await get_exercises(token);
    let resultado_soma = soma(exercises.data.soma.entrada.a, exercises.data.soma.entrada.b);
    let response_soma = await envia_resposta('soma', token, resultado_soma);
    let resultado_string = tamanho_string(exercises.data['tamanho-string'].entrada.string);
    let response_string = await envia_resposta('tamanho-string', token, resultado_string);
    let resultado_usuario = nome_usuario(exercises.data['nome-do-usuario'].entrada.email);
    let response_usuario = await envia_resposta('nome-do-usuario', token, resultado_usuario);
    let resultado_jaca = jaca_wars(exercises.data['jaca-wars'].entrada.v, exercises.data['jaca-wars'].entrada.theta);
    let response_jaca = await envia_resposta('jaca-wars', token, resultado_jaca);
    let resultado_ano = ano_bissexto(exercises.data['ano-bissexto'].entrada.ano);
    let response_ano = await envia_resposta('ano-bissexto', token, resultado_ano);
    let resultado_volume = volume(exercises.data['volume-da-pizza'].entrada.z, exercises.data['volume-da-pizza'].entrada.a);
    let response_volume = await envia_resposta('volume-da-pizza', token, resultado_volume);
    let resultado_mru = mru(exercises.data.mru.entrada.s0, exercises.data.mru.entrada.v, exercises.data.mru.entrada.t);
    let response_mru = await envia_resposta('mru', token, resultado_mru);
    let resultado_inverte = inverte(exercises.data['inverte-string'].entrada.string);
    let response_inverte = await envia_resposta('inverte-string', token, resultado_inverte);
    let resultado_somatorio = valores(exercises.data['soma-valores'].entrada.objeto);
    let response_somatorio = await envia_resposta('soma-valores', token, resultado_somatorio);
    let resultado_enesimo = enesimoPrimo(exercises.data['n-esimo-primo'].entrada.n);
    let response_enesimo = await envia_resposta('n-esimo-primo', token, resultado_enesimo);
    let resultado_prefixo = maiorPrefixo(exercises.data['maior-prefixo-comum'].entrada.strings);
    let response_prefixo = await envia_resposta('maior-prefixo-comum', token, resultado_prefixo);
    let resultado_maior = somaMaior(exercises.data['soma-segundo-maior-e-menor-numeros'].entrada.numeros);
    let response_maior = await envia_resposta('soma-segundo-maior-e-menor-numeros', token, resultado_maior);
    let resultado_palindromo = contarPalindromos(exercises.data['conta-palindromos'].entrada.palavras);
    let response_palindromo = await envia_resposta('conta-palindromos', token, resultado_palindromo);
    let resultado_inteiros = somaValoresInteiros(exercises.data['soma-de-strings-de-ints'].entrada.strings);
    let response_inteiros = await envia_resposta('soma-de-strings-de-ints', token, resultado_inteiros);
    let resultado_req = await requisicoes(token, exercises.data['soma-com-requisicoes'].entrada.endpoints);
    let response_req = await envia_resposta('soma-com-requisicoes', token, resultado_req);
    let responsef = await questao_final(token, exercises.data['caca-ao-tesouro'].entrada.inicio);
    while (typeof responsef.data !== 'number') {
        responsef = await questao_final(token, responsef.data)
    }
    let response_final = await envia_resposta('caca-ao-tesouro', token, responsef.data);
}

main();