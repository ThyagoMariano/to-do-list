'use strict'
let banco = []

const criaElemento = (tarefa, status, i) => {
  const item = document.createElement('div')

  item.classList.add('todo__content')
  item.innerHTML = `
        <input type='checkbox' ${status} data-indice=${i}>
        <div id="content">${tarefa} </div>
        <input type='button' value="x" data-indice=${i}>
  `
  document.querySelector('.pai').appendChild(item)
}

const limpaTela = () => {
  const todoList = document.querySelector('.pai')
  while (todoList.firstChild) {
    todoList.removeChild(todoList.lastChild)
  }
}

const atualizaTela = () => {
  limpaTela()
  banco.forEach((item, i) => {
    criaElemento(item.tarefa, item.status, i)
  })
}

const insereItem = evento => {
  const tecla = evento.key
  const texto = evento.target.value
  if (tecla === 'Enter') {
    banco.push({ tarefa: texto, status: '' })
    atualizaTela()
    evento.target.value = ''
  }
}

const removerItem = i => {
  banco.splice(i, 1)
  atualizaTela()
}

const atualizaItem = i => {
  banco[i].status = banco[i].status === '' ? 'checked' : ''
  atualizaTela()
}

const clickItem = evento => {
  const click = evento.target

  if (click.type === 'button') {
    const i = click.dataset.indice
    removerItem(i)
  } else if (click.type === 'checkbox') {
    const i = click.dataset.indice
    atualizaItem(i)
  }
}
atualizaTela()

document.getElementById('textInput').addEventListener('keypress', insereItem)

document.querySelector('.pai').addEventListener('click', clickItem)
