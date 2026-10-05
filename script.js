const inputTarefa = document.getElementById("tarefa");

const botaoAdicionar = document.getElementById("adicionar");

const listaTarefas = document.getElementById("lista-tarefas");

const selectPrioridade = document.getElementById("prioridade");

    inputTarefa.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        botaoAdicionar.click();

    }

});
botaoAdicionar.addEventListener("click", function() {

   let textoTarefa = inputTarefa.value;
   let prioridadeSelecionada = selectPrioridade.value;

    if (textoTarefa.trim() === "") {
        alert("Digite uma tarefa!");
        return;
    }
    if (prioridadeSelecionada === "") {
    alert("Selecione uma prioridade!");
    return;
}

    const novaTarefa = document.createElement("li");
    novaTarefa.classList.add(prioridadeSelecionada);
    const agora = new Date();
    const dataHora = agora.toLocaleString("pt-Br");

   const infoTarefa = document.createElement("div");
infoTarefa.classList.add("info-tarefa");

const nomeTarefa = document.createElement("span");
nomeTarefa.textContent = textoTarefa;

const data = document.createElement("small");
data.textContent = dataHora;

infoTarefa.appendChild(nomeTarefa);
infoTarefa.appendChild(data);

novaTarefa.appendChild(infoTarefa);

novaTarefa.addEventListener("click",function(){
    novaTarefa.classList.toggle("concluida");
    salvarTarefas();
    atualizarContador();
});
const botaoExcluir = document.createElement("button");

botaoExcluir.textContent = "X";

botaoExcluir.classList.add("excluir");

botaoExcluir.addEventListener("click", function(event) {

    event.stopPropagation();

    novaTarefa.remove();
    salvarTarefas();
    atualizarContador()

});

const botaoEditar = document.createElement("button");

botaoEditar.textContent = "✏️";

botaoEditar.classList.add("editar");

botaoEditar.addEventListener("click", function(event) {

    event.stopPropagation();

    const novoTexto = prompt("Edite sua tarefa:", textoTarefa);

    if (novoTexto !== null && novoTexto.trim() !== "") {

        textoTarefa = novoTexto.trim();

       nomeTarefa.textContent = textoTarefa;

        salvarTarefas();

    }

});

const grupoBotoes = document.createElement("div");

grupoBotoes.classList.add("grupo-botoes");

grupoBotoes.appendChild(botaoEditar);
grupoBotoes.appendChild(botaoExcluir);

novaTarefa.appendChild(grupoBotoes);
    listaTarefas.appendChild(novaTarefa);

    inputTarefa.value = "";
    salvarTarefas();
    atualizarContador();

});

function salvarTarefas() {

    const tarefas = [];

    document.querySelectorAll("#lista-tarefas li").forEach(function(tarefa) {

        tarefas.push({
          texto: tarefa.querySelector(".info-tarefa span").textContent,
          data: tarefa.querySelector(".info-tarefa small").textContent,
            concluida: tarefa.classList.contains("concluida"),prioridade: tarefa.classList.contains("alta") ? "alta" :
            tarefa.classList.contains("media") ? "media" : "baixa"
        });

    });

    localStorage.setItem("tarefas", JSON.stringify(tarefas));

}
function carregarTarefas() {

    const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];

    tarefasSalvas.forEach(function(tarefa) {

        inputTarefa.value = tarefa.texto;
        selectPrioridade.value = tarefa.prioridade || "baixa";

        botaoAdicionar.click();

        const ultimaTarefa = listaTarefas.lastElementChild;
        if (tarefa.prioridade) {
    ultimaTarefa.classList.remove("baixa", "media", "alta");
    ultimaTarefa.classList.add(tarefa.prioridade);
}
        if (tarefa.data) {
    ultimaTarefa.querySelector(".info-tarefa small").textContent = tarefa.data;
}

        if (tarefa.concluida) {
            ultimaTarefa.classList.add("concluida");
        }

    });

    salvarTarefas();

}

carregarTarefas();


function atualizarContador() {

    const total = document.querySelectorAll("#lista-tarefas li").length;

    const concluidas = document.querySelectorAll("#lista-tarefas li.concluida").length;

    const pendentes = total - concluidas;

    document.getElementById("total").textContent = total;

    document.getElementById("concluidas").textContent = concluidas;

    document.getElementById("pendentes").textContent = pendentes;
    const porcentagem = total === 0 ? 0 : Math.round((concluidas / total) * 100);

document.getElementById("porcentagem").textContent = porcentagem + "%";

document.getElementById("progresso").style.width = porcentagem + "%";

}
atualizarContador();


const botaoLimpar = document.getElementById("limpar-concluidas");
console.log(botaoLimpar);

botaoLimpar.addEventListener("click", function() {

    const tarefasConcluidas = document.querySelectorAll("#lista-tarefas li.concluida");

    tarefasConcluidas.forEach(function(tarefa) {

        tarefa.remove();

    });

    salvarTarefas();

    atualizarContador();

});
const botaoTodas = document.getElementById("mostrar-todas");
const botaoPendentes = document.getElementById("mostrar-pendentes");
const botaoConcluidas = document.getElementById("mostrar-concluidas");
function filtrarTarefas(filtro) {

    const tarefas = document.querySelectorAll("#lista-tarefas li");

    tarefas.forEach(function(tarefa) {

        if (filtro === "todas") {

            tarefa.style.display = "flex";

        } else if (filtro === "pendentes") {

            tarefa.style.display = tarefa.classList.contains("concluida") ? "none" : "flex";

        } else if (filtro === "concluidas") {

            tarefa.style.display = tarefa.classList.contains("concluida") ? "flex" : "none";

        }

    });

}
botaoTodas.addEventListener("click", function() {

    filtrarTarefas("todas");
    marcarFiltroAtivo(botaoTodas);

});

botaoPendentes.addEventListener("click", function() {

    filtrarTarefas("pendentes");
    marcarFiltroAtivo(botaoPendentes);

});

botaoConcluidas.addEventListener("click", function() {

    filtrarTarefas("concluidas");
    marcarFiltroAtivo(botaoConcluidas);

});
function marcarFiltroAtivo(botao) {

    const botoes = document.querySelectorAll(".filtros button");

    botoes.forEach(function(item) {

        item.classList.remove("ativo");

    });

    botao.classList.add("ativo");
console.log("Filtro ativo:", botao);
}