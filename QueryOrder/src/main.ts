import express from 'express';
import bodyParser from 'body-parser';
import axios, { AxiosResponse } from 'axios';
import { TotalOrdered } from '../../utils/src/models/total-ordered';

const app: express.Application = express();
app.use(bodyParser.urlencoded({extended: false}));

const statsOrderDbUrl: string = process.env.STATSORDERDBURL || "http://localhost:8085"

app.get('/', async (_, res, __) => // _ = next
{
  console.log(`[QueryOrder] GET on "/" Request received`);
  try
  {
    let responseStatsOrderDbUrl: AxiosResponse = await axios.get(statsOrderDbUrl);
    console.log(`[QueryOrder] responseStatsOrderDbUrl`);
    let statsOrderDb = responseStatsOrderDbUrl.data;
    console.log(statsOrderDb);
    let totalOrdered: TotalOrdered = TotalOrdered.fromJson(statsOrderDb);
    console.log(`[QueryOrder] totalOrdered`, totalOrdered);
    res.send(totalOrdered.toJson());
  }
  catch (exception)
  {
    process.stderr.write(`[QueryOrder] ERROR for statsOrderDbUrl ${statsOrderDbUrl}: ${exception}\n`);
  }
  res.send();
});

//const hostname: string = process.env.HOST_ADDR || "0.0.0.0";
const port: string = process.env.PORT || "8084";
const nodeEnv: string = process.env.NODE_ENV || "development";
app.listen(parseInt(port), function () 
{
  console.log(`[QueryOrder] Server running at http://localhost:${port}/ in ${nodeEnv}`);
  console.log(`[QueryOrder] variable set > statsOrderDbUrl : ${statsOrderDbUrl}`);
});
