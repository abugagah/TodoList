let tasks =
JSON.parse(localStorage.getItem("tasks"))
|| [];

let currentFilter = "all";

renderTasks();

function addTask()
{
    const input =
    document.getElementById("taskInput");

    if(input.value.trim() === "")
    {
        alert("Введите задачу!");
        return;
    }

    tasks.push({
        text: input.value,
        completed: false
    });

    input.value = "";

    saveTasks();
}

function renderTasks()
{
    const list =
    document.getElementById("taskList");

    const search =
    document.getElementById("searchInput")
    .value
    .toLowerCase();

    list.innerHTML = "";

    let filtered = tasks.filter(task =>
    {
        let matchesSearch =
        task.text.toLowerCase()
        .includes(search);

        let matchesFilter =
        currentFilter === "all" ||

        (currentFilter === "active"
        && !task.completed)

        ||

        (currentFilter === "completed"
        && task.completed);

        return matchesSearch &&
               matchesFilter;
    });

    filtered.forEach(task =>
    {
        let index =
        tasks.indexOf(task);

        const li =
        document.createElement("li");

        if(task.completed)
            li.classList.add("completed");

        li.innerHTML = `
            <span
                contenteditable="true"
                onblur="updateTask(${index}, this)">
                ${task.text}
            </span>

            <div class="actions">

                <button onclick=
                "toggleTask(${index})">
                ✓
                </button>

                <button onclick=
                "deleteTask(${index})">
                🗑
                </button>

            </div>
        `;

        list.appendChild(li);
    });

    document.getElementById(
        "counter"
    ).textContent =
    `Всего задач: ${tasks.length}`;
}

function updateTask(index, element)
{
    let newText =
    element.textContent.trim();

    if(newText === "")
    {
        alert("Задача не может быть пустой!");

        element.textContent =
        tasks[index].text;

        return;
    }

    tasks[index].text = newText;

    saveTasks();
}

function toggleTask(index)
{
    tasks[index].completed =
    !tasks[index].completed;

    saveTasks();
}

function deleteTask(index)
{
    if(confirm(
        "Удалить задачу?"
    ))
    {
        tasks.splice(index,1);

        saveTasks();
    }
}

function setFilter(filter)
{
    currentFilter = filter;

    renderTasks();
}

function clearSearch()
{
    document.getElementById(
        "searchInput"
    ).value = "";

    renderTasks();
}

function saveTasks()
{
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    renderTasks();
}