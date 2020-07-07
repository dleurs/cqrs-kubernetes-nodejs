import express from 'express';
import bodyParser from 'body-parser';
//import querystring from 'querystring';

const app: express.Application = express();
app.use(bodyParser.urlencoded({extended: false}));

let orderDb: Array<string> = Array<string>();

app.post('/', (req, res, _) => // _ = next
{
  console.log(`POST Request received`);
  console.log(`Body :`, req.body);
  // validating req.body
  orderDb.push(req.body);
  res.sendStatus(201);
  console.log(`orderDb : `, orderDb);
});

app.get('/', (_, res, __) => // _ = next
{
  console.log(`GET Request received`);
  console.log(`orderDb : `, orderDb);
  res.send({"orderDb": orderDb});
});

//const hostname: string = process.env.HOST_ADDR || "0.0.0.0";
const port: string = process.env.PORT || "8082";
const nodeEnv: string = process.env.NODE_ENV || "development";
app.listen(parseInt(port), function () 
{
  console.log(`OrderDB running at http://localhost:${port}/ in ${nodeEnv}`);
});
