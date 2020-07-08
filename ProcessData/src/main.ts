import express from 'express';
import bodyParser from 'body-parser';
import axios, { AxiosResponse } from 'axios';
import querystring from 'querystring';
import { Order } from '../../utils/src/models/order';
import { TotalOrdered } from '../../utils/src/models/total-ordered';

const app: express.Application = express();
app.use(bodyParser.urlencoded({ extended: false }));

const orderDbUrl: string = process.env.ORDERDBURL || "http://localhost:8082"
const statsOrderDbUrl: string = process.env.STATSORDERDBURL || "http://localhost:8085"

app.put('/', async (_, res, __) => // _ = next
{
  console.log(`[ProcessData] Request received`);
  res.sendStatus(202);
  try
  {
    let responseOrderDbUrl: AxiosResponse = await axios.get(orderDbUrl);
    console.log(`[ProcessData] responseOrderDbUrl`);
    let orderDbJson: any = responseOrderDbUrl.data.orderDb;
    console.log(responseOrderDbUrl.data.orderDb);
    let totalOrdered: TotalOrdered = new TotalOrdered({});
    for (let i:number = 0; i < orderDbJson.length; i++) {
      let order: Order = Order.fromJson(orderDbJson[i]);
      totalOrdered.addOrder(order);
    }
    console.log(`[ProcessData] Total ordered :`, totalOrdered);
    try
    {
      await axios.put(statsOrderDbUrl, querystring.encode(totalOrdered.toJson()));
    }
    catch (exception)
    {
      process.stderr.write(`[ProcessData] ERROR for statsOrderDbUrl ${statsOrderDbUrl}: ${exception}\n`);
    }
  }
  catch (exception)
  {
    process.stderr.write(`[ProcessData] ERROR for orderDbUrl ${orderDbUrl}: ${exception}\n`);
  }
});

const port: string = process.env.PORT || "8083";
const nodeEnv: string = process.env.NODE_ENV || "development";
app.listen(parseInt(port), function () 
{
  console.log(`[ProcessData] Server running at http://localhost:${port}/ in ${nodeEnv}`);
  console.log(`[ProcessData] variable set > orderDbUrl : ${orderDbUrl}`);
  console.log(`[ProcessData] variable set > statsOrderDbUrl : ${statsOrderDbUrl}`);
});
