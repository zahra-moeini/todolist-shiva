const form = document.querySelector("#task-form")
const inputTask = document.querySelector("#task")
const filter = document.querySelector("#filter")
const tasklist = document.querySelector(".list-group")
const clearbtn = document.querySelector(".clear-tasks")


loadevntlisene();

function loadevntlisene() {
    document.addEventListener('DOMContentLoaded', getaks)
    form.addEventListener('submit', addtask)
    tasklist.addEventListener('click', removetask)
    clearbtn.addEventListener('click', cleartask)
    filter.addEventListener('keyup', filtertask)
}

// get taks form load
function getaks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex align-items-center';
        li.appendChild(document.createTextNode(task));
        const i = document.createElement('i');
        i.className = 'fas fa-times text-danger liz delete-item';
        li.appendChild(i);
        tasklist.appendChild(li);
    })
}


// add item
function addtask(e) {
    if (inputTask.value === '') {
        alert('برای افزودن تسک در ابتدا  نام تسک را وارد کنید ');
    } else {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex align-items-center';
        li.appendChild(document.createTextNode(inputTask.value));
        const i = document.createElement('i');
        i.className = 'fas fa-times text-danger liz delete-item';
        li.appendChild(i);
        tasklist.appendChild(li);

        // localstoreg
        storetaskinlocalstorage(inputTask.value);

        inputTask.value = "";
        e.preventDefault();
    }
}


// localstorage item
function storetaskinlocalstorage(task) {
    // console.log(task);
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove item
function removetask(e) {
    if (e.target.classList.contains('delete-item')) {
        if (confirm("آیا مطمعن هستی برای حذف تسک")) {
            e.target.parentElement.remove();
            removetaskformlocalstorage(e.target.parentElement);
        }
    }
}

// remove local storege
function removetaskformlocalstorage(taskitem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task, index) {
        if (taskitem.textContent === task) {
            tasks.splice(index, 1);
        }

    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



// clear all item
function cleartask() {
    tasklist.innerHTML = "";
    cleartaskformlocalstorage();

}
function cleartaskformlocalstorage() {
    localStorage.clear();
}

// filter
function filtertask(e) {
    const text = e.target.value.toLowerCase();
    // console.log(text);
    document.querySelectorAll('.list-group-item').forEach(function (task) {
        // console.log(task);
        const item = task.textContent;
        // console.log(item);
        if (item.toLowerCase().indexOf(text) != -1) {
            task.classList.add('d-flex');
        } else {
            task.classList.remove("d-flex");
            task.style.display = 'none';
        }
    });
}