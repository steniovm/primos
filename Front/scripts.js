//elementos html
const initialdate = document.getElementById('initialdate');
const contnumber = document.getElementById('contnumber');
const numberp = document.getElementById('numberp');
const inminpos = document.getElementById('inminpos');
const inmaxpos = document.getElementById('inmaxpos');
const inpos = document.getElementById('inpos');
const inminval = document.getElementById('inminval');
const inmaxval = document.getElementById('inmaxval');
const inval = document.getElementById('inval');
const numberList = document.getElementById('numberList');

//inicialização de valores dinâmicos na página
requestInitialDate();
requestLastNamber();

//atualiza numero a cada minuto
let interval = setInterval(requestLastNamber,60000);

//requicisão da data de inicio do processamento
async function requestInitialDate(){
    let timeset = new Date();
    let timestring = '';
    await fetch("inittime")
    .then(response => response.json())
    .then(value =>{
        timeset.setTime(value.timeinit);
        timestring = `${timeset.getDay()}/${timeset.getMonth()}/${timeset.getFullYear()} - ${timeset.getHours()}:${timeset.getMinutes()}:${timeset.getSeconds()}`
    })
    .catch(error => {
        console.log('Erro ao carregar resposta:', error);
    });
    initialdate.innerHTML =  timestring;
}

//requicisão do ultimo número primo encontrado
function requestLastNamber(){
    fetch("lastnumber")
    .then(response => response.json())
    .then(values =>{
        contnumber.innerHTML =values.lastposit+'º';
        numberp.innerHTML =values.lastnumber;
        calcinputs(values.lastposit, values.lastnumber);
        console.log(`O ${values.lastposit}º numero primo é o ${values.lastnumber}`);
    })
    .catch(error => {
        console.log('Erro ao carregar resposta:', error);
    });
}

//calcula minimos e maximos dos inputs
function calcinputs(ipos, ival){
    inminpos.max = ipos;
    if (ipos<101){
        inminpos.value = 1;
    }else{
        inminpos.value = ipos-100;
    }
    inmaxpos.max = ipos;
    inmaxpos.value = ipos;
    inminval.max = ival;
    if (ival<541){
        inminval.value = 1;
    }else{
        inminval.value = ival-500;
    }
    inmaxval.max = ival;
    inmaxval.value = ival;
}

//requicita intervalo de posições
function requestinpos(){
    fetch(`inpos?min=${inminpos.value}&max=${inmaxpos.value}`)
    .then(response => response.json())
    .then(values =>{
        if (values.overfow){
            numberList.innerHTML = `<label class="mess">
                O intervalo solitado é maior que o que pode ser exibido, peça um intervalo de até ${values.overfow} números.
            </label>`;
        }else{
            filltable(values);
        }
    })
    .catch(error => {
        console.log('Erro ao carregar resposta:', error);
    });
}
//requicita intervalo de valores
function requestinval(){
    fetch(`inval?min=${inminval.value}&max=${inmaxval.value}`)
    .then(response => response.json())
    .then(values =>{
        if (values.overfow){
            numberList.innerHTML = `<label class="mess">
                O intervalo solitado é maior que o que pode ser exibido, peça um intervalo até ${values.overfow} números.
            </label>`;
        }else{
            filltable(values);
        }
    })
    .catch(error => {
        console.log('Erro ao carregar resposta:', error);
    });
}

function filltable(values){
    const thead = '<thead><tr><th>#Posição</th><th>Número</th></tr></thead>';
    let tbody = '<tbody>';
    values.forEach(el => {
        tbody += `<tr><td>${el.posit}º</td><td>${el.val}</td></tr>`;
    });
    tbody += '</tbody>';
    numberList.innerHTML = thead+tbody;
}

inpos.addEventListener('click',requestinpos);
inval.addEventListener('click',requestinval);
