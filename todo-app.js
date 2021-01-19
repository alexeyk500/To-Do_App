(function(){
  // Создаем и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  // Создаем и возвращаем форму для создания дела
  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    // очищаем input и делаем кнопку disabled
    input.value = '';
    button.disabled = true;
    // console.log('На старте установил - button.disabled = true;')

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return { form,
             input,
             buttonWrapper,
             button,
            };
  }

  // Создаем и возвращаем список дел
  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  // Создаем и возвращаем элемент списка дел
  function createTodoItem(name) {
    // создаем елемент списка и задем ему стили
    let item = document.createElement('li');
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = name;

    // создем кнопки, задаем им стили и пакуем их в группу
    let doneButton = document.createElement('button');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить'

    let buttonGroup = document.createElement('div');
    buttonGroup.classList.add('btn-group', 'btn-group-sm');

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return { item,
             doneButton,
             deleteButton,
            };
  }

  function createTodoApp(container, title = 'Список Дел') {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    // если в input что-то ввели,то делаем кнопку disabled
    todoItemForm.input.addEventListener('input', function() {
      if (todoItemForm.input.value) {
        // console.log('Обнаружил печать в input')
        todoItemForm.button.disabled = false;
      } else {
        // console.log('Обнаружил печать в input, input опять пустой')
        todoItemForm.button.disabled = true;
      }
    });

    // Функция создания нового элемента списка дел
    todoItemForm.form.addEventListener('submit', function(e) {
      // предотвращаем перезагрузку страницы при отправке формы
      e.preventDefault();
      // если в input пусто то ничего не создаем
      if (!todoItemForm.input.value) {
        return;
      }
      // если поле input не пустое, то создаем новый элемент списка с делом
      // и вешаем обработчики событий на кнопки
      let todoItem = createTodoItem(todoItemForm.input.value);
      // добавляем обработчики на кнопки
      todoItem.doneButton.addEventListener('click', function() {
        todoItem.item.classList.toggle('list-group-item-success');
      })
      todoItem.deleteButton.addEventListener('click', function() {
        if (confirm('Вы уверены')) {
          todoItem.item.remove();
        }
      })
      todoList.append(todoItem.item)
      // очищаем поле ввода после создания элемента списка с делом
      // и делаем кнопку disabled
      todoItemForm.input.value = '';
      todoItemForm.button.disabled = true;
    });
  }

  window.createTodoApp = createTodoApp;

  // document.addEventListener('DOMContentLoaded', function(){
  //   createTodoApp(document.getElementById('my_todos'), title = 'Мой Список Дел');
  //   createTodoApp(document.getElementById('mom_todos'), title = 'Мамин Список Дел');
  //   createTodoApp(document.getElementById('dad_todos'), title = 'Папин Список Дел');
  // });

})();
