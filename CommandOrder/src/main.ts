import express from 'express';
import bodyParser from 'body-parser';
import querystring from 'querystring';
import axios, { AxiosResponse } from 'axios';
import { Order } from '../../utils/src/models/order';

const app: express.Application = express();
app.use(bodyParser.urlencoded({ extended: true }));

const orderDbUrl: string = process.env.ORDERDBURL || "http://localhost:8082"
const processDataUrl: string = process.env.PROCESSDATAURL || "http://localhost:8083"

app.post('/', async (req, res, __) => // _ = next
{
  console.log(`[CommandOrder] POST on "/" Request received`);
  console.log(`[CommandOrder] Request body :`, req.body);

  try
  {
    let newOrder: Order = Order.fromJson(req.body);
    console.log(`[CommandOrder] New order :`, newOrder.toJson());
    res.sendStatus(202);
    let responseOrderDb: AxiosResponse = await axios.post(orderDbUrl, querystring.encode(req.body));
    if (responseOrderDb.status == 201)
    {
      try
      {
        await axios.put(processDataUrl);
      }
      catch (exception)
      {
        process.stderr.write(`[CommandOrder] ERROR for processDataUrl ${processDataUrl}: ${exception}\n`);
      }
    }
    else
    {
      throw ("responseOrderDb.status is not 201");
    }
  } catch (exception)
  {
    process.stderr.write(`[CommandOrder] ERROR for orderDbUrl ${orderDbUrl}: ${exception}\n`);
    res.sendStatus(500);
  }
});

const port: string = process.env.PORT || "8081";
const nodeEnv: string = process.env.NODE_ENV || "development";

app.listen(parseInt(port), function () 
{
  console.log(`[CommandOrder] Server running at http://localhost:${port}/ in ${nodeEnv}`);
  console.log(`[CommandOrder] variable set, orderDbUrl : ${orderDbUrl}`);
  console.log(`[CommandOrder] variable set, processDataUrl : ${processDataUrl}`);
});
