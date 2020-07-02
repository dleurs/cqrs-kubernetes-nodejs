// npm install mongodb; npm install @types/mongodb;
import express from 'express';
import bodyParser from 'body-parser';
import { todoRoutes } from './routes/todos';
import { hashRoutes } from './routes/hashs';
import { mongoConnect } from './utils/database';
import { Todo, showTodos } from './models/todo';
//import { Todo } from './models/todo';

const app: express.Application = express();

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', async (_, res, __) =>
{
    console.log(`Request received at "/"`);
    let todos: Array<Todo> = await Todo.getAll()
    //console.log(todos[0].toString());
    const addTodoForm: string = `<h1>Add a todo</h1> 
    <form action="/todo" method="POST"><input type="text" name="title">
      <button type="submit">Add Todo</button>
    </form>`;
    const hashForm: string = `<h1>Hash</h1>
    <form action="/hash" method="POST">
      <input type="text" name="message"><br/>
      <input type="checkbox" id="md5" name="md5"><label for="md5">MD5, then</label><br/>
      <input type="checkbox" id="sha1" name="sha1"><label for="sha1">SHA1, then</label><br/>
      <input type="checkbox" id="sha1" name="sha1"><label for="sha1">SHA1, then</label><br/>
      <button type="submit">Hash</button>
    </form>`;
    res.status(200).send(`<h1>All your todos</h1>` + showTodos(todos) + addTodoForm + hashForm);
});
app.use('/todo', todoRoutes);
app.use('/hash', hashRoutes);

//const hostname: string = process.env.HOST_ADDR || "0.0.0.0";
const port: string = process.env.PORT || "8080";
const nodeEnv: string = process.env.NODE_ENV || "production";
const dbUrl: string | undefined = process.env.DBURL;

if (dbUrl == (undefined || null))
{
  throw ("db mongo url should be set");
}

app.listen(parseInt(port), async function ()
{
  await mongoConnect();
  console.log(`Server running at http://localhost:${port}/ in ${nodeEnv}`);
});

