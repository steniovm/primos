//modulos externos (padrão node modules)
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
//Leitura de variaveis de ambiente
//porta de comunicação da pagina e diretório do front
const port = process.env.PORT || 80;
const directory = process.env.DIRECTORY || "front";
const nmax = process.env.NMAX || 100;

//app servidor da pagina
const app = express();

//configura para servir arquivos estáticos do front
//app.use('/',express.static('./'+directory));
app.use('/primos',express.static('./'+directory));
app.get('/',(req,res)=>{
    res.send('<html><script>window.location.assign("./primos");</script></html>'); 
 });

//constantes do software
const timeinit = Date.now();

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
    },1000);
}
//inicializa algoritimo
addprimo();

function intpvalid(intv){
    if (
        intv.min<=intv.max &&
        intv.max<primos.length &&
        intv.min>0 &&
        intv.max-intv.min <= nmax
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
app.get("/primos/inittime", (req, res) => {
    //console.log("initTime: "+timeinit);
    res.send({'timeinit':timeinit});
    return true;
});

//resgata o ultimo número primo processado
app.get("/primos/lastnumber", (req,res) => {
    res.send({
        'lastposit':primos.length,
        'lastnumber':primos[primos.length-1]
    });
    return true;
});

//resgata intervalo de numeros primos de acordo com a posição
app.get("/primos/inpos", (req,res) => {
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
app.get("/primos/inval", (req,res) => {
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