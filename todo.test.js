const {
    addTask,
    deleteTask,
    completeTask
} = require('./todo');

test('Добавление задачи', () => {

    let tasks = [];

    addTask(tasks, 'Сделать проект');

    expect(tasks.length).toBe(1);
});

test('Удаление задачи', () => {

    let tasks = [
        {
            text: 'Задача',
            completed: false
        }
    ];

    deleteTask(tasks, 0);

    expect(tasks.length).toBe(0);
});

test('Отметка выполнения', () => {

    let task = {
        text: 'Учеба',
        completed: false
    };

    completeTask(task);

    expect(task.completed).toBe(true);
});