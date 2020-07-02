import { Router } from 'express';
import { Todo } from '../models/todo';

export const todoRoutes = Router();

todoRoutes.post('/', async (req, res, __) =>
{
    const newTodo: Todo = new Todo({ title: req.body.title });
    await newTodo.save();
    return res.status(300).redirect('/');
})

todoRoutes.post('/checking/:check/:todoId', async (req, res, __) =>
{
    const todoId: string = req.params.todoId;
    const check: string = req.params.check; 
    let todo: Todo = await Todo.get(todoId);
    todo.done = (check == "true");
    await todo.save();
    return res.status(300).redirect('/');
})

todoRoutes.post('/delete/:todoId', async (req, res, __) =>
{
    const todoId: string = req.params.todoId;
    await Todo.delete(todoId);
    return res.status(300).redirect('/');
})
