import express from 'express';
import bodyParser from 'body-parser';
import { commandOrderRoutes } from './routes/command-order';


const app: express.Application = express();
app.use(bodyParser.urlencoded({ extended: false }));

export const commandOrderUrl: string = process.env.COMMANDORDERURL || "http://localhost:8081"
export const queryOrderUrl: string = process.env.QUERYORDERBURL || "http://localhost:8084"

app.use('/order', commandOrderRoutes);

app.get('/', async (_, res, ___) => // _ ,__, ___ = req, res, next
{
  const title: string = `<h1>Welcome into a simple CQRS example</h1>
  Hosted on Kubernetes and coded with NodeJS / TypeScript`;
  const addTodoForm: string = `<h3>Add an order</h3> 
  <form action="/order" method="POST">
    <label for="product-select">Choose a product:</label>
    <select name="product" id="product-select">
      <option value="apple">Apple</option>
      <option value="pear">Pear</option>
    </select><br/>
    <label for="quantity-select">Quantity:</label> <input id="quantity-select" name="quantity" type="number" min="1" step="1"/><br/>
    <label for="price-select">Unit price:</label> <input id="price-select" name="unitPrice" type="number" min="0" step="any"/><br/>
    <button type="submit">Add an order</button>
  </form>`;
  res.send(title + addTodoForm);
});

const port: string = process.env.PORT || "8080";
const nodeEnv: string = process.env.NODE_ENV || "development";
app.listen(parseInt(port), function () 
{
  console.log(`[Dispatcher] Server running at http://localhost:${port}/ in ${nodeEnv}`);
  console.log(`[Dispatcher] variable set > commandOrderUrl : ${commandOrderUrl}`);
  console.log(`[Dispatcher] variable set > queryOrderUrl : ${queryOrderUrl}`);
});
