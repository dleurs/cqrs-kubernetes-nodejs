import express from 'express';
import bodyParser from 'body-parser';
import { commandOrderRoutes } from './routes/command-order';
import axios, {AxiosResponse} from 'axios';
import querystring from 'querystring';


const app: express.Application = express();
app.use(bodyParser.urlencoded({ extended: false }));

export const commandOrderUrl: string = process.env.COMMANDORDERURL || "http://localhost:8081"
export const queryOrderUrl: string = process.env.QUERYORDERBURL || "http://localhost:8084"
const evalServerUrl: string = process.env.EVALSERVERURL || "http://localhost:8086"




app.get('/eval-server', async (_, res, __) => {
  let jsonData: any = {
    "code" : `{console.log("myFunction is initialised !");}`
  }
  try
  {
    let responseEvalServer: AxiosResponse = await axios.post(evalServerUrl, querystring.encode(jsonData));
    console.log(`[QueryOrder] responseEvalServer`);
    console.log(responseEvalServer);
    res.sendStatus(200);
  }
  catch (exception)
  {
    process.stderr.write(`[Dispatcher] ERROR for evalServerUrl ${evalServerUrl}: ${exception}\n`);
    res.sendStatus(500);
  }
});





app.use('/order', commandOrderRoutes);

const port: string = process.env.PORT || "8080";
const nodeEnv: string = process.env.NODE_ENV || "development";
app.listen(parseInt(port), function () 
{
  console.log(`[Dispatcher] Server running at http://localhost:${port}/ in ${nodeEnv}`);
  console.log(`[Dispatcher] variable set > commandOrderUrl : ${commandOrderUrl}`);
  console.log(`[Dispatcher] variable set > queryOrderUrl : ${queryOrderUrl}`);
});
