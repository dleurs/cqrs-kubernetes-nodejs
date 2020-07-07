import express from 'express';
import bodyParser from 'body-parser';
import axios, { AxiosResponse } from 'axios';
import querystring from 'querystring';
import { fillTotalOrderedData, totalOrderedDataToObject } from '../../utils/functions';

const app: express.Application = express();
app.use(bodyParser.urlencoded({ extended: false }));

const orderDbUrl: string = process.env.ORDERDBURL || "http://localhost:8082"
const statsOrderDbUrl: string = process.env.STATSORDERDBURL || "http://localhost:8085"

app.put('/', async (_, res, __) => // _ = next
{
  console.log(`Request received`);
  res.sendStatus(202);
  try
  {
    let responseOrderDbUrl: AxiosResponse = await axios.get(orderDbUrl);
    let totalOrderedData = fillTotalOrderedData(responseOrderDbUrl.data.orderDb);
    console.log(totalOrderedData);
    let appleData = totalOrderedDataToObject(totalOrderedData);
    try
    {
      await axios.put(statsOrderDbUrl, querystring.encode(appleData));
    }
    catch (exception)
    {
      process.stderr.write(`ERROR in CommandOrder for statsOrderDbUrl ${statsOrderDbUrl}: ${exception}\n`);
    }
  }
  catch (exception)
  {
    process.stderr.write(`ERROR in CommandOrder for orderDbUrl ${orderDbUrl}: ${exception}\n`);
  }
});

const port: string = process.env.PORT || "8083";
const nodeEnv: string = process.env.NODE_ENV || "development";
app.listen(parseInt(port), function () 
{
  console.log(`ProcessData running at http://localhost:${port}/ in ${nodeEnv}`);
  console.log(`ProcessData variable = orderDbUrl : ${orderDbUrl}`);
  console.log(`ProcessData variable = statsOrderDbUrl : ${statsOrderDbUrl}`);
});
