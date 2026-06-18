function addTask(tasks, text) {

    tasks.push({
        text,
        completed: false
    });

    return tasks;
}

function deleteTask(tasks, index) {

    tasks.splice(index, 1);

    return tasks;
}

function completeTask(task) {

    task.completed = true;

    return task;
}

module.exports = {
    addTask,
    deleteTask,
    completeTask
};