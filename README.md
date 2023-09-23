# Primos

<h1>Gerador de números primos online</h1>
<p>
A cada segundo um novo número primo é gerado no servido, a pagina é atualizada, mostrando o ultimo número gerado, a cada minuto.
</p>
<p>
A data e horario de inicio de Geração corresponde ao momento em que o servidor foi iniciado e gerou os primeiros números primos (1, 2, 3 ,5, 7 ....)
</p>
<p>
É possivel consultar números primos já calculados, filtrando por intervalo de posição no vetor de números primos ou pelo valor.<br/>
Exemplo:<br/>
vetor<br/>
[ 1 , 2 , 3 , 5 , 7 ,...]<br/>
_ 1º, 2º, 3º, 4º, 5º,...<br/>
posições<br/>
</p>

<h2>Rotas</h2>
<span>GET /inittime</span>
<p>Obtém o tempo, em milissengundos, do momento em que o servidor inicio o geração. Essa rota é acessada uma única vez assim que a página é carregada.</p>

<span>GET /lastnumber</span>
<p>Obtém o ultimo número primo gerado bem como sua posição no vetor. Essa rota é acessada assim que a página é carregada e depois a cada minuto.</p>

<span>GET /inpos?min=MIN&max=MAX</span>
<p>Obtém uma lista de números primos de acordo com sua posição no vetor, sendo MIN a posição mais baixo e MAX a posição mais alta obtida. Essa rota é acessada quando o usúario solicitar clicando no botão correspondente.</p>

<span>GET /inval?min=MIN&max=MAX</span>
<p>Obtém uma lista de números primos de acordo com seu valor, sendo MIN o valor mínimo e MAX o valor máximo. Essa rota é acessada quando o usúario solicitar clicando no botão correspondente.</p>