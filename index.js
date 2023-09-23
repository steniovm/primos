//pagina front
const page = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta property="og:title" content="Numeros primos" />
        <meta property="og:description" content="Gera um novo numero primo a cada segundo" />
        <meta property="og:locale" content="pt-br" />
        <meta property="description" content="Gera um novo numero primo a cada segundo" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <style>
:root {
    --neutral-green: #9FCFBF;
    --light-grey: #bdbdbd;
    --yellow-transp: #bdbd004d;
    --red-transp: #bd00004d;
    --blue-transp: #0000bd4d;
}
body {
    background-color: var(--neutral-green);
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
}
h1{
    align-self: center;
}
main{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
}
section{
    text-align: center;
}
b{
    font-size: xx-large;
}
footer{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
}
span{
    font-weight: bold;
    white-space: nowrap;
}
.myimg{
    height: 12vh;
    min-height:60px;
    padding: 1vh;;
}
.divinfo{
    display: flex;
    flex-direction: column;
}
input{
    min-width: 50px;
    border-radius: 20px;
    background-color: #eeb;
    border: none;
    text-align: end;
}
table{
    margin: auto;
}
#sectable{
    min-height: 30vh;
}
.mess{
    background-color: #FFaaaa;
    height: 2em;
    border-radius: 1em;
}
        </style>
        <title>Gera um novo número primo a cada segundo</title>
    </head>
    <body>
        <h1>Gerador de números primos online</h1>
        <p>A cada acesso alguns novos números primos são gerados.</p>
        <p>A pagina é atualizada a cada minuto.</p>
        <p>Se ficar muito tempo sem nenhum acesso a contagem é reiniciada.</p>
        <main>
            <label>A geração iniciou em: <b id="initialdate"></b></label>
            <section id="master">
                O <b id="contnumber">1</b> número primo é o <b id="numberp">1</b>
            </section>
            <section>
                <h2>Ver outros números</h2>
                <div>
                    <label>Da posição</label>
                    <input id="inminpos" type="number" min="1" max="1" value="1"/>
                    <label>à</label>
                    <input id="inmaxpos" type="number" min="1" max="1" value="1"/>
                    <input id="inpos" type="button" value="Ver"/>
                </div>
                <div>
                    <label>Do valor</label>
                    <input id="inminval" type="number" min="1" max="1" value="1"/>
                    <label>ao</label>
                    <input id="inmaxval" type="number" min="1" max="1" value="1"/>
                    <input id="inval" type="button" value="Ver"/>
                </div>
            </section>
            <section id="sectable">
                <table id="numberList"></table>
            </section>
        </main>
        <footer>
            <div id="divinfo" class="divinfo">
                <span>Autor:</span>
                <span>Stênio Vinicios de Medeiros</span>
                <span>Portifolio: <a href="https://steniovm.github.io/steniovm/"  alt="Meu portifolio de projetos">https://steniovm.github.io/steniovm/</a></span>
                <span>Email: <a href="mailto:steniovm@gmail.com"  alt="Meu email">steniovm@gmail.com</a></span>
            </div>
        </footer>
        <div style="height: 20px; margin: auto;">
            <img src="https://scisimulab.com.br/logo.svg" alt="logo SciSimuLab" style="height: 20px;"/>
            <b>Conheça também
                <a href="https://scisimulab.com.br/" target="_blank">
                    <i>Sci Simu Lab</i>
                </a>
            </b>
        </div>
        <script type="text/javascript">
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
let interval = setInterval(requestLastNamber,30000);

//requicisão da data de inicio do processamento
async function requestInitialDate(){
    let timeset = new Date();
    let timestring = '';
    await fetch("inittime")
    .then(response => response.json())
    .then(value =>{
        timeset.setTime(value.timeinit);
        timestring = timeset.getDay()+'/'+timeset.getMonth()+'/'+timeset.getFullYear()+' - '+timeset.getHours()+':'+timeset.getMinutes()+':'+timeset.getSeconds();
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
        console.log('O '+values.lastposit+'º numero primo é o '+values.lastnumber);
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
    fetch('inpos?min='+inminpos.value+'&max='+inmaxpos.value)
    .then(response => response.json())
    .then(values =>{
        if (values.overfow){
            numberList.innerHTML = '<label class="mess">O intervalo solitado é maior que o que pode ser exibido, peça um intervalo de até '+values.overfow+' números.</label>';
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
    fetch('inval?min='+inminval.value+'&max='+inmaxval.value)
    .then(response => response.json())
    .then(values =>{
        if (values.overfow){
            numberList.innerHTML = '<label class="mess">O intervalo solitado é maior que o que pode ser exibido, peça um intervalo até '+values.overfow+' números</label>';
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
        tbody += '<tr><td>'+el.posit+'º</td><td>'+el.val+'</td></tr>';
    });
    tbody += '</tbody>';
    numberList.innerHTML = thead+tbody;
}

inpos.addEventListener('click',requestinpos);
inval.addEventListener('click',requestinval);

        </script>
    </body>
</html>
`;
//modulos externos (padrão node modules)
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
//Leitura de variaveis de ambiente
//porta de comunicação da pagina e diretório do front
const port = process.env.PORT || 80;
const directory = process.env.DIRECTORY || "front";
const nmax = process.env.NMAX || 200;

//app servidor da pagina
const app = express();

//configura para servir arquivos estáticos do front
//app.use('/',express.static('./'+directory));
app.use('/primos',express.static('./'+directory));
app.get('/',(req,res)=>{
    res.send(page); 
 });

//constantes do software
let timeinit = Date.now();

//algoritimo de calculo dos numeros primos
//const tmax = 1000;//tempo maximo de processamento 1 segundo
let primos = [1,2];
let teste = true;
let testen = true;
let lastnumber = 3;
let time = 0;
let timei = 0;
async function addprimo(){
    let interval = setInterval(()=>{
        if (primos.length===2) timeinit = Date.now();
        testen = true;
        while(testen){
            timei = Date.now();
            testen = false
            for(i=1;i<primos.length && teste;i++){
                if (lastnumber%primos[i]===0){
                    teste = false;
                    testen = true;
                }
            }
            if (teste){
                time = Date.now()-timei;
                primos.push(lastnumber);
                testen = false;
            }
            teste = true;
            lastnumber++;
        }
    },100);
}
//inicializa algoritimo
addprimo();

function intpvalid(intv){
    if (
        intv.min<=intv.max &&
        intv.max<primos.length &&
        intv.min>0 &&
        (intv.max-intv.min)<=nmax
    ){
        return true;
    }else{
        return false;
    }
}
function intpfilter(intv){
    let arr = [];
    primos.forEach((val, ind) => {
        if (ind>=intv.min && ind<=intv.max){
            arr.push({'posit':ind, 'val':val});
        }
    });
    return arr;
}
function intvvalid(intv){
    if (
        intv.min<=intv.max &&
        intv.max<primos[primos.length-1] &&
        intv.min>0
    ){
        return true;
    }else{
        return false;
    }
}
function intvfilter(intv){
    let arr = [];
    primos.forEach((val, ind) => {
        if (val>=intv.min && val<=intv.max){
            arr.push({'posit':ind, 'val':val});
        }
    });
    if (arr.length<=nmax){
        return arr;
    } else {
        return {'overfow':nmax};
    }
}

//resgata o time inicial do processamento
app.get("/inittime", (req, res) => {
    //console.log("initTime: "+timeinit);
    res.send({'timeinit':timeinit});
    return true;
});

//resgata o ultimo número primo processado
app.get("/lastnumber", (req,res) => {
    res.send({
        'lastposit':primos.length,
        'lastnumber':primos[primos.length-1]
    });
    return true;
});

//resgata intervalo de numeros primos de acordo com a posição
app.get("/inpos", (req,res) => {
    let intv = {'min': req.query.min, 'max': req.query.max};
    if (intpvalid(intv)){
        res.send(intpfilter(intv));
        return true;
    }else{
        res.send({'overfow':nmax});
        return false;
    }
});

//resgata intervalo de numeros primos de acordo com o valor
app.get("/inval", (req,res) => {
    let intv = {'min': req.query.min, 'max': req.query.max};
    if (intvvalid(intv)){
        res.send(intvfilter(intv));
        return true;
    }else{
        res.send({'overfow':nmax});
        return false;
    }
});
//informa uma url para acessar o jogo e passa a escutar a porta
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    app.listen(port, () =>{
        console.log(`acesso: http://${add}:${port}`);
        //console.log(err);
        //console.log(fam);
    });
    return true;
});