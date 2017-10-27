function actionSave(key) { //key берем из actionEdit.Чтобы понять ,какой элемент изменять

    var countKey;
    if (!(localStorage.getItem('countKey'))) { // Если нет ключа в localStorage,
        localStorage.setItem('countKey', '0');// то записываем 0
    }
    if (key) {
        countKey = key;
    }
    else {
        countKey = parseInt(localStorage.getItem('countKey')) + 1;
    }

    var name = document.getElementById('name').value;

    var label = document.getElementById('label').value;
    var importance = document.getElementById('importance').value;
    var deadline = document.getElementById('deadline').value;
    var dateOfCompletion = document.getElementById('dateOfCompletion').value;

    var nameInnerHTML = document.getElementById('name').innerHTML = name;
    var labelInnerHTML = document.getElementById('label').innerHTML = label;
    var importanceInnerHTML = document.getElementById('label').innerHTML = importance;
    var deadlineInnerHTML = document.getElementById('deadline').innerHTML = deadline;
    var dateOfCompletionInnerHTML = document.getElementById('dateOfCompletion').innerHTML = dateOfCompletion;

    if (Date.parse(deadline) > Date.parse(dateOfCompletion)) { // проверяем дату на просроченность задачи
        date = true;
    }
    else if (Date.parse(deadline) < Date.parse(dateOfCompletion)) {
        date = false;
    }
    else if (Date.parse(deadline) == Date.parse(dateOfCompletion)) {
        date = 'equal';
    }
    else {
        date = 'none';
    }

    localStorage.setItem( // записываем данные в localStorage
        countKey,
        '{' +
        ' "name" : "' + nameInnerHTML + '",' +
        ' "label" : "' + labelInnerHTML + '",' +
        ' "importance" : "' + importanceInnerHTML + '", ' +
        ' "deadline" : "' + deadlineInnerHTML + '",' +
        ' "dateOfCompletion" : "' + dateOfCompletionInnerHTML + '",' +
        ' "date" : "' + date + '",' +
        ' "date" : "' + date + '"' +
        '}');


    countKey = (parseInt(localStorage.getItem('countKey')) + 1);

    localStorage.setItem('countKey', (countKey.toString()));
    document.getElementById('app').style.display = 'none';
    window.location.reload();
}


function actionFilter(value) { //фильтр
    for (var i = 0; i <= parseInt(localStorage.getItem('countKey')); i++) { //По циклу идем от 0 до самого большого значения countKey.

        if (localStorage.getItem(i)) {

            if (document.getElementById('id' + i)) {    // если существует тег tr - удаляем его
                var deleteItem = document.getElementById('id' + i);
                deleteItem.parentNode.removeChild(deleteItem);
            }
            var view = JSON.parse(localStorage.getItem(i));                 //Превращаем строку в js обьект
//
            if (value == 'Все') {

                actionOutput(i, view);
            } else {
                switch (view.importance) {
                    case value: {
                        actionOutput(i, view);
                        break;
                    }
                }
            }
        }
    }
}

if (window.location.reload) { // если перезагрузили страницу,то выведутся все задачи
    actionFilter(document.getElementById('filter').value);
}

function actionOutput(i, view) {

    var tr = document.createElement("tr");      //записываем данные из localStorage в таблицу
    document.getElementById("table").appendChild(tr);
    tr.setAttribute("id", "id" + i);


    var inputName = document.createElement("input");
    inputName.setAttribute('type', 'checkbox');


    var tdNumber = document.createElement("td");

    var tdName = document.createElement("td");
    var tdInput = document.createElement("td");
    var tdLabel = document.createElement("td");
    var tdImportance = document.createElement("td");
    var tdDeadline = document.createElement("td");
    var tdDateOfCompletion = document.createElement("td");

    var tdNodeNumber = document.createTextNode(i);
    var tdNodeName = document.createTextNode(view.name);
    var tdNodeLabel = document.createTextNode(view.label);
    var tdNodeImportance = document.createTextNode(view.importance);
    var tdNodeDeadLine = document.createTextNode(view.deadline);
    var tdNodeCompletion = document.createTextNode(view.dateOfCompletion);

    tdNumber.appendChild(tdNodeNumber);
    tdName.appendChild(tdNodeName);
    tdInput.appendChild(inputName);
    tdLabel.appendChild(tdNodeLabel);
    tdImportance.appendChild(tdNodeImportance);
    tdDeadline.appendChild(tdNodeDeadLine);
    tdDateOfCompletion.appendChild(tdNodeCompletion);

    tmpId = "id" + i;
    document.getElementById(tmpId).appendChild(tdNumber);
    document.getElementById(tmpId).appendChild(tdInput);
    document.getElementById(tmpId).appendChild(tdName);
    document.getElementById(tmpId).appendChild(tdLabel);
    document.getElementById(tmpId).appendChild(tdImportance);
    document.getElementById(tmpId).appendChild(tdDeadline);
    document.getElementById(tmpId).appendChild(tdDateOfCompletion);

    var btnEdit = document.createElement("button"); // кнопка Редактировать
    var btnNodeEdit = document.createTextNode('Редактировать');
    btnEdit.appendChild(btnNodeEdit);
    btnEdit.setAttribute('id', i);
    btnEdit.setAttribute('class', 'btn btn-primary');
    btnEdit.setAttribute('onclick', 'actionEdit(this.id);');
    document.getElementById(tmpId).appendChild(btnEdit);

    var btnRemove = document.createElement("button"); // кнопка Удалить
    var btnNodeRemove = document.createTextNode('Удалить');
    btnRemove.appendChild(btnNodeRemove);
    btnRemove.setAttribute('id', i);
    btnRemove.setAttribute('class', 'btn btn-primary');
    btnRemove.setAttribute('onclick', 'actionRemove(this.id);');
    document.getElementById(tmpId).appendChild(btnRemove);

    if (view.date == 'false') { //просроченную задачу отмечаем красным
        document.getElementById(tmpId).style.background = 'red';
    }
    if (view.date == 'none') { //отмечаем сделанное задание.Если есть дата окончания - значит задание выполнено

    } else {
        inputName.setAttribute("checked", true);

    }
}

function actionEdit(key) {

    var deleteItem = document.getElementById(key);
    deleteItem.parentNode.removeChild(deleteItem);
    localStorage.removeItem(key);

    var btn = document.getElementsByTagName('form')[0];
    btn.setAttribute('id', key);
    btn.setAttribute('onsubmit', 'actionSave(this.id)');
    document.getElementById('app').style.display = 'block';
}


function actionRemove(obj) { //Функция удаления.Удаляем элемент из localStorage
    localStorage.removeItem(obj);
    window.location.reload();
}

function actionShow() {
    document.getElementById('app').style.display = 'block';
}

function actionClearStorage() { //очищаем весь localStorage
    localStorage.clear();
    window.location.reload();
}