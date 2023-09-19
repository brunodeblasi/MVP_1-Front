/* Conexão com o servidor via requisição GET e exibição das tarefas existentes */
const getList = async () => {
    let url = 'http://127.0.0.1:5000/tarefas';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data.tarefas.forEach(item => insertList(item.nome, item.prazo))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  getList()

/* Inserir items na lista apresentada */
const insertList = (nameTarefa, prazo) => {
  var item = [nameTarefa, prazo]
  var table = document.getElementById('app-tarefas');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newInput").value = "";
  document.getElementById("newPrazo").value = "";

  removeElement()
}

/* Incluir uma tarefa na lista do servidor via requisição POST */
const postItem = async (inputTask, inputPrazo) => {
    const formData = new FormData();
    formData.append('nome', inputTask);
    formData.append('prazo', inputPrazo);
  
    let url = 'http://127.0.0.1:5000/adicionar-tarefas';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
/* Adicionar uma tarefa nova com nome e prazo */
const newItem = () => {
  let inputTarefa = document.getElementById("newInput").value;
  let inputPrazo = document.getElementById("newPrazo").value;

  if (inputTarefa === '') {
    alert("Escreva o nome de um item!");
  } else {
    insertList(inputTarefa, inputPrazo)
    postItem(inputTarefa, inputPrazo)
  }
}

/* Criar um botão close para cada item da lista */
  const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
  }
  
  
/* Remover um item da lista de acordo com o click no botão close */
  const removeElement = () => {
    let close = document.getElementsByClassName("close");
    // var table = document.getElementById('myTable');
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const nomeItem = div.getElementsByTagName('td')[0].innerHTML
        div.remove()
        deleteItem(nomeItem)
      }
    }
  }
  
/* Deletar um item da lista do servidor via requisição DELETE */
  const deleteItem = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/remover-tarefas?nome=' + item;
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
