window.onload = () => {
    fetch("data/ListOfTasks.json")
        .then(response => response.json())
        .then(data => {
            createListTasks(data);
            AddNewTask();
            DeleteTask();
        });

    fetch("data/RecommendPublish.json")
        .then(response => response.json())
        .then(data => {
            createPublish(data);
        });

    fetch("data/RecommendAddTasks.json")
        .then(response => response.json())
        .then(data => {
            AddTRecommenedTasks(data);
        });

    fetch("data/Kids.json")
        .then(response => response.json())
        .then(data => {
            PublishTask(data);
        });
};

function createListTasks(data) {
    const main = document.querySelector("main");
    const h1 = document.createElement("h1");
    h1.textContent = data.category;
    main.appendChild(h1);

    const addTaskButton = document.createElement("input");
    addTaskButton.id = "AddTask";
    addTaskButton.type = "button";
    addTaskButton.value = "Add New Task";
    main.appendChild(addTaskButton);

    const ul = document.createElement("ul");
    ul.className = "list-group mt-3";
    main.appendChild(ul);

    data.tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.textContent = task.name;

        const div = document.createElement("div");

        const editIcon = document.createElement("i");
        editIcon.className = "bi bi-pencil";
        div.appendChild(editIcon);

        const deleteIcon = document.createElement("i");
        deleteIcon.className = "bi bi-trash";
        div.appendChild(deleteIcon);

        const publishButton = document.createElement("input");
        publishButton.type = "button";
        publishButton.value = "Publish";
        publishButton.id = "PublishTask";
        div.appendChild(publishButton);

        li.appendChild(div);
        ul.appendChild(li);
    });
}

function createPublish(data) {
    const main = document.querySelector("main");
    const h2 = document.createElement("h2");
    h2.textContent = data.category;
    main.appendChild(h2);

    const rectangleOfPublish = document.createElement("div");
    rectangleOfPublish.classList.add("GrayRectangle");
    main.appendChild(rectangleOfPublish);

    data.publishTasks.forEach(task => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.classList.add(task.status === '3' ? 'green' : task.status === '2' ? 'yellow' : 'red');

        card.innerHTML = `
            <i class="icon fas fa-lightbulb"></i>
            <div class="title">${task.name}</div>
            <div class="details">
                <div class="coins"><span>${task.coins}</span> <i id="coinIcon" class="fas fa-coins"></i></div>
                <div class="assigned-to">Assigned to: ${task.assignedTo}</div>
                <div class="deadline">Deadline: ${task.deadline}</div>
            </div>
            <input type="button" value="Publish" class="publish-task-button">
        `;

        card.addEventListener('click', function () {
            localStorage.setItem('taskData', JSON.stringify(task));
            window.location.href = 'taskPage.html';
        });

        const addButton = card.querySelector('.publish-task-button');
        addButton.addEventListener('click', function (event) {
            event.stopPropagation();
        });

        rectangleOfPublish.appendChild(card);
    });

    const div = document.createElement("div");
    const slideRight = document.createElement("i");
    slideRight.className = "bi bi-arrow-right";
    div.appendChild(slideRight);
    rectangleOfPublish.appendChild(div);
}

function AddTRecommenedTasks(data) {
    const main = document.querySelector("main");
    const rectangleOfRecoomened = document.createElement("div");
    rectangleOfRecoomened.classList.add("GrayRectangle", "rectangle-add-tasks");
    main.appendChild(rectangleOfRecoomened);

    data.AddTasks.forEach(task => {
        const AddTask = document.createElement('div');
        AddTask.classList.add('card');
        AddTask.innerHTML = `
            <div class="title">${task.name}</div>
            <input type="button" value="Add Task" class="add-task-button">
        `;

        rectangleOfRecoomened.appendChild(AddTask);
    });

    const div = document.createElement("div");
    const slideRight = document.createElement("i");
    slideRight.className = "bi bi-arrow-right";
    div.appendChild(slideRight);
    rectangleOfRecoomened.appendChild(div);
}

function AddNewTask() {
    let taskModal = document.getElementById('taskModal');
    if (!taskModal) {
        const modalHtml = `
            <div class="modal fade" id="taskModal" tabindex="-1" aria-labelledby="taskModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="taskModalLabel">Add New Task</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="taskForm">
                                <div class="mb-3">
                                    <label for="taskName" class="form-label">Task Name</label>
                                    <input type="text" class="form-control" id="taskName" name="taskName" required>
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>`;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        taskModal = new bootstrap.Modal(document.getElementById('taskModal'));

        document.getElementById('taskForm').addEventListener('submit', function (event) {
            event.preventDefault();
            const taskName = document.getElementById('taskName').value;
            console.log(`POST https://taskids/api/tasks/`);
            console.log("Request body:", {
                taskName: taskName
            });
            taskModal.hide();
        });

        Array.from(document.getElementsByClassName('btn-close')).forEach(function (element) {
            element.addEventListener('click', function () {
                taskModal.hide();
            });
        });
    }

    let checkButtonExistence = setInterval(function () {
        let addButton = document.getElementById('AddTask');
        if (addButton) {
            clearInterval(checkButtonExistence);
            addButton.addEventListener('click', function () {
                taskModal.show();
            });
        }
    }, 100);
}

function DeleteTask() {
    const trashIcons = document.getElementsByClassName("bi-trash");
    let taskToDelete = null;

    const modalHtml = `
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteModalLabel">Confirm Deletion</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this task?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="cancelDelete" data-bs-dismiss="modal">No</button>
                        <button type="button" class="btn btn-danger" id="confirmDelete">Yes</button>
                    </div>
                </div>
            </div>
        </div>`;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));

    Array.from(trashIcons).forEach(icon => {
        icon.addEventListener('click', function () {
            taskToDelete = this.closest('li');
            deleteModal.show();
        });
    });

    document.getElementById('confirmDelete').addEventListener('click', function () {
        if (taskToDelete) {
            const taskName = taskToDelete.firstChild.textContent.trim();

            console.log(`DELETE https://taskids/api/tasks/`);
            console.log("Request body:", {
                taskToDelete: taskToDelete,
                name: `${taskName}`
            });

            deleteModal.hide();
        }
    });

    document.getElementById('cancelDelete').addEventListener('click', function () {
            deleteModal.hide();
    });

    Array.from(document.getElementsByClassName('btn-close')).forEach(function(element) {
        element.addEventListener('click', function () {
            deleteModal.hide();
        });
    });

}


function PublishTask(data) {
    const modalHtml = `
        <div class="modal fade" id="publishTaskModal" tabindex="-1" aria-labelledby="publishTaskModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="publishTaskModalLabel">Publish Task</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="publishTaskForm">
                            <div class="mb-3">
                                <label for="assignedTo" class="form-label">Assigned To</label>
                                <select class="form-select" id="assignedTo" required>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="deadline" class="form-label">Deadline</label>
                                <input type="date" class="form-control" id="deadline" required>
                            </div>
                            <div class="mb-3">
                                <label for="coins" class="form-label">Coins</label>
                                <input type="number" class="form-control" id="coins" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const publishTaskModal = new bootstrap.Modal(document.getElementById('publishTaskModal'));
    const kidsData = data;
    const assignedToSelect = document.getElementById('assignedTo');

    kidsData.forEach(kid => {
        const option = document.createElement('option');
        option.value = kid.name;
        option.textContent = kid.name;
        assignedToSelect.appendChild(option);
    });

    document.querySelectorAll('#PublishTask').forEach(publishButton => {
        publishButton.addEventListener('click', function (event) {
            const taskName = this.closest('li').textContent.trim();
            openPublishModal(publishTaskModal, event, taskName);
        });
    });
}

function openPublishModal(publishTaskModal, event, taskName) {
    publishTaskModal.show();

    const form = document.getElementById('publishTaskForm');
    form.addEventListener('submit', function submitHandler(event) {
        event.preventDefault();
        const assignedTo = document.getElementById('assignedTo').value;
        const deadline = document.getElementById('deadline').value.split('-').reverse().join('/');
        const coins = document.getElementById('coins').value;

        const newTask = {
            name: taskName,
            assignedTo: assignedTo,
            deadline: deadline,
            coins: coins,
            status: '1'
        };

        console.log(`POST https://taskids/api/publish-tasks/`);
        console.log("Request body:", {
            newTask: newTask
        });

    });

    document.querySelectorAll('.btn-close').forEach(icon => {
        icon.addEventListener('click', function () {
            publishTaskModal.hide();
        });
    });
}
