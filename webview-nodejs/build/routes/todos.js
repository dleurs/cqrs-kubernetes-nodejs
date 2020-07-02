"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRoutes = void 0;
const express_1 = require("express");
const todo_1 = require("../models/todo");
exports.todoRoutes = express_1.Router();
exports.todoRoutes.get('/', async (_, res, __) => {
    console.log(`Request received at "/"`);
    let todos = await todo_1.Todo.getAll();
    //console.log(todos[0].toString());
    const addTodoForm = `<h1>Add a todo</h1> <form action="/todo" method="POST"><input type="text" name="title"><button type="submit">Add Todo</button></form>`;
    const md5Form = `<h1>Md5 hash</h1> <form action="/hash" method="POST"><input type="text" name="message"><button type="submit">Hash</button></form>`;
    res.status(200).send(`<h1>All your todos</h1>` + todo_1.showTodos(todos) + addTodoForm + md5Form);
});
exports.todoRoutes.post('/todo', async (req, res, __) => {
    const newTodo = new todo_1.Todo({ title: req.body.title });
    await newTodo.save();
    return res.status(300).redirect('/');
});
exports.todoRoutes.post('/todo/checking/:check/:todoId', async (req, res, __) => {
    const todoId = req.params.todoId;
    const check = req.params.check;
    let todo = await todo_1.Todo.get(todoId);
    todo.done = (check == "true");
    await todo.save();
    return res.status(300).redirect('/');
});
exports.todoRoutes.post('/todo/delete/:todoId', async (req, res, __) => {
    const todoId = req.params.todoId;
    await todo_1.Todo.delete(todoId);
    return res.status(300).redirect('/');
});
