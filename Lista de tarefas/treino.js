const caixa = document.querySelector("#caixa");
const botao = document.querySelector(".botao");
const tarefas = document.querySelector(".tarefas");

// functions

function Criali() {
  const li = document.createElement("li"); //cria li
  return li;
}

function addTarefa(text) {
  // cria tarefa
  const li = Criali(); // chama a funao do li
  li.innerHTML = text; // altera o texto da li conforme o text colocado no input
  tarefas.appendChild(li); // na classe tarefas sera adicionado o li criado anteriormente
  limpaInput();
  botaoApagar(li);
  salveTarefa();
}

function limpaInput() {
  caixa.value = ""; // apos enviar a tarefa o input fica limpo
  caixa.focus(); // o cursor volta a piscar no input
}

function botaoApagar(li) {
  li.innerHTML += "   "; // espac entre a caixa de text e o botao apagar
  const botaoApagar = document.createElement("button"); // criando o botão no html
  botaoApagar.innerText = "Remover"; // dando nome ao botao
  botaoApagar.setAttribute("class", "apagar"); // adicionando o atributo de class= 'apagar' para o botão criado anteriormente
  li.appendChild(botaoApagar); // criando no li um apendice botão apagar
}

function salveTarefa() {
  const liSalve = tarefas.querySelectorAll("li"); // selecionando todos os li contidos na tarefa
  const listaDetarefas = [];
  for (let tarefa of liSalve) {
    let textSalve = tarefa.innerText; // pegando os textos contidos no li
    textSalve = textSalve.replace("Remover", "").trim(); // alterando o valor de remover para nada, pois quando vai para o console o termo vai junto
    listaDetarefas.push(textSalve); // coloca em array
  }
  const tarefasJSON = JSON.stringify(listaDetarefas); //transforma em string
  localStorage.setItem("tarefas", tarefasJSON); // banco de dados do navegador -- a key= tarefa
}

function tarefasSalvas() {
  const tarefas = localStorage.getItem("tarefas");
  const listaDetarefas = JSON.parse(tarefas) || [];

  for (let tarefa of listaDetarefas) {
    addTarefa(tarefa);
  }
}

tarefasSalvas();

// eventos

botao.addEventListener("click", function () {
  // quando clica faz o evento
  if (!caixa.value) return; // se a caixa estiver vazia nao envia;
  addTarefa(caixa.value); // chama a função de criar tarefa, feita anteriormente com o text incorporado no input
});

caixa.addEventListener("keypress", function (e) {
  // manda o eveto quando a tecla em questoa e pressionada
  if (e.keyCode === 13) {
    // tecla enter
    if (!caixa.value) return; // para o input nao estar vazio
    addTarefa(caixa.value); // funcao de adicionar a tarefa
  }
});

document.addEventListener("click", function (e) {
  const clear = e.target;
  if (clear.classList.contains("apagar")) {
    // identificar o li que contem a classe apagar
    clear.parentElement.remove(); // o botao de remover executara a sua função
    salveTarefa(); // para apagar tambem no banco de dados do navegador
  }
});

//comentarios

/* 
    caixa.addEventListener('keypress' , function(e) {
    console.log(e)
    para saber qual tecla foi pressionada e seu codigo 
 }); 

 */

/* 
    document.addEventListener('click' , function (e) {
    const clear = e.target;   // identificar o li que contem a classe apagar
    console.log(clear.parentElement) // identificar quem é o pai para poder excluir
*/

//.trim para remover o espaco em branco apos o conteudo do array
