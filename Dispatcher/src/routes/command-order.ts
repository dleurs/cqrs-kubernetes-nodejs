import { Router } from 'express';
import querystring from 'querystring';
import axios, { AxiosResponse } from 'axios';
import { commandOrderUrl, queryOrderUrl } from '../main';

export const commandOrderRoutes = Router();

commandOrderRoutes.post('/', async (req, res, _) =>
{
  //console.log(req);
  try
  {
    console.log(`[Dispatcher] POST on "/order" Request received`);
    console.log(`[Dispatcher] Request body :`, req.body);
    let response: AxiosResponse = await axios.post(commandOrderUrl, querystring.encode(req.body)); // req.body == "msg": "John"
    if (response.status == 202)
    {
      return res.status(202).send(`[Dispatcher] Action received and being treated`);
    }
    else
    {
      return res.status(response.status).send(`[Dispatcher] Server error from CommandOrder`);
    }
  } catch (exception)
  {
    process.stderr.write(`[Dispatcher] ERROR for commandOrderUrl ${commandOrderUrl}: ${exception}\n`);
    return res.status(500).send(`[Dispatcher] ERROR for commandOrderUrl ${commandOrderUrl}: ${exception}\n`);
  }
});

commandOrderRoutes.get('/', async (_, res, ___) => // _ ,__, ___ = req, res, next
{
  console.log(`[Dispatcher] GET on "/" Request received`);
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
  const seeTotalOrdered:string = `<h3><a href="`+queryOrderUrl+`">Total Ordered</a></h3>`
  res.send(title + addTodoForm + seeTotalOrdered);
});