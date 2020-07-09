import express from 'express';
import bodyParser from 'body-parser';
import { Order } from '../../utils/src/models/order';
//import querystring from 'querystring';

const app: express.Application = express();
app.use(bodyParser.urlencoded({extended: false}));

let orderDb: Array<Order> = Array<Order>();

app.post('/', (req, res, _) => // _ = next
{
  console.log(`[OrderDB] POST on "/" Request received`);
  console.log(`[OrderDB] Request body :`, req.body);
  let newOrder: Order = Order.fromJson(req.body);
  console.log(`[OrderDB] New order :`, newOrder.toJson());
  // validating req.body
  res.sendStatus(201);
  orderDb.push(newOrder);
  console.log(`[OrderDB] orderDb : `, orderDb);
});

app.get('/', (_, res, __) => // _ = next
{
  console.log(`[OrderDB] GET on "/" Request received`);
  console.log(`[OrderDB] orderDb : `, orderDb);
  res.send({"orderDb": orderDb});
});

//const hostname: string = process.env.HOST_ADDR || "0.0.0.0";
const port: string = process.env.PORT || "8082";
const nodeEnv: string = process.env.NODE_ENV || "development";
app.listen(parseInt(port), function () 
{
  console.log(`[OrderDB] Server running at http://localhost:${port}/ in ${nodeEnv}`);
});
