import express from 'express';
import bodyParser from 'body-parser';
import querystring from 'querystring';
import axios, { AxiosResponse } from 'axios';

const app: express.Application = express();
app.use(bodyParser.urlencoded({ extended: true }));

const orderDbUrl: string = process.env.ORDERDBURL || "http://localhost:8082"
const processDataUrl: string = process.env.PROCESSDATAURL || "http://localhost:8083"

app.post('/', async (req, res, __) => // _ = next
{
  console.log(`Request received`);
  console.log(`Body :`, req.body);
  try
  {
    // validating req.body
    let response: AxiosResponse = await axios.post(orderDbUrl, querystring.encode(req.body)); // req.body == "msg": "John"
    return res.send(response.status);
  } catch (exception)
  {
    process.stderr.write(`ERROR in CommandOrder for url ${orderDbUrl}: ${exception}\n`);
    return res.status(500).send(`ERROR in CommandOrder for url ${orderDbUrl}: ${exception}\n`);
  }
});

const port: string = process.env.PORT || "8081";
const nodeEnv: string = process.env.NODE_ENV || "development";

app.listen(parseInt(port), function () 
{
  console.log(`CommandOrder running at http://localhost:${port}/ in ${nodeEnv}`);
  console.log(`orderDbUrl : ${orderDbUrl}`);
  console.log(`processDataUrl : ${processDataUrl}`);
});
