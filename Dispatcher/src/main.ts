import express from 'express';
import bodyParser from 'body-parser';
//import querystring from 'querystring';
import axios from 'axios';

const app: express.Application = express();
app.use(bodyParser.urlencoded({extended: false}));

const commandOrderUrl: string = process.env.COMMANDORDERURL || "http://localhost:8081"
const queryOrderUrl: string = process.env.QUERYORDERBURL || "http://localhost:8084"

app.post('/order', async (req, res, _) => {
  //console.log(req);
  try
  {
    await axios.post(commandOrderUrl, req.body); // req.body == "msg": "John"
    return res.status(200).send("Action received and being treated");
  } catch (exception)
  {
    process.stderr.write(`ERROR in Dispatcher for url ${commandOrderUrl}: ${exception}\n`);
    return res.status(500).send(`ERROR in Dispatcher for url ${commandOrderUrl}: ${exception}\n`);
  }
});

app.get('/', async (_, res, ___) => // _ ,__, ___ = req, res, next
{
  res.write(`<h1>Welcome into a simple CQRS example</h1>`);
  res.write(`<h2>Hosted on Kubernetes and coded with NodeJS / TypeScript</h2>`);
  res.send();
});

const port: string = process.env.PORT || "8080";
const nodeEnv: string = process.env.NODE_ENV || "development";
app.listen(parseInt(port), function () 
{
  console.log(`Dispatcher running at http://localhost:${port}/ in ${nodeEnv}`);
  console.log(`commandOrderUrl : ${commandOrderUrl}`);
  console.log(`queryOrderUrl : ${queryOrderUrl}`);
});
