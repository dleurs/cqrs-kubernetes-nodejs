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
        process.stderr.write(`ERROR in CommandOrder for processDataUrl ${processDataUrl}: ${exception}\n`);
      }
    }
    else
    {
      throw ("responseOrderDb.status is not 201");
    }
  } catch (exception)
  {
    process.stderr.write(`ERROR in CommandOrder for orderDbUrl ${orderDbUrl}: ${exception}\n`);
  }
});

const port: string = process.env.PORT || "8081";
const nodeEnv: string = process.env.NODE_ENV || "development";

app.listen(parseInt(port), function () 
{
  console.log(`CommandOrder running at http://localhost:${port}/ in ${nodeEnv}`);
  console.log(`CommandOrder variable = orderDbUrl : ${orderDbUrl}`);
  console.log(`CommandOrder variable = processDataUrl : ${processDataUrl}`);
});
