import express from 'express';
import bodyParser from 'body-parser';

const app: express.Application = express();
app.use(bodyParser.urlencoded({extended: false}));

let orderDb: Array<string> = Array<string>();

app.post('/', (req, res, _) => // _ = next
{
  console.log(`Request received`);
  console.log(`Body :`, req.body);
  // validating req.body
  res.send(202)
  orderDb.push(req.body);
  console.log(orderDb);
});

//const hostname: string = process.env.HOST_ADDR || "0.0.0.0";
const port: string = process.env.PORT || "8082";
const nodeEnv: string = process.env.NODE_ENV || "development";
app.listen(parseInt(port), function () 
{
  console.log(`OrderDB running at http://localhost:${port}/ in ${nodeEnv}`);
});
