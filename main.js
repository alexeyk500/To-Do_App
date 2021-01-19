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

  document.addEventListener('DOMContentLoaded', function(){
    let container = document.getElementById('todo_app');
    let todoAppTitle = createAppTitle('Список Дел');
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

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
      todoItemForm.input.value = '';
    });

  });

})();
