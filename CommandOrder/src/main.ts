import express from 'express';
import bodyParser from 'body-parser';

const app: express.Application = express();
app.use(bodyParser.urlencoded({extended: true}));

const orderDbUrl: string = process.env.COMMANDORDERURL || "http://localhost:8082"
const processDataUrl: string = process.env.QUERYORDERBURL || "http://localhost:8083"

app.post('/', ( req, res, __) => // _ = next
{
  console.log(`Request received`);
  console.log(req.body);
  return res.send(202);
});

const port: string = process.env.PORT || "8081";
const nodeEnv: string = process.env.NODE_ENV || "development";

app.listen(parseInt(port), function () 
{
  console.log(`CommandOrder running at http://localhost:${port}/ in ${nodeEnv}`);
  console.log(`orderDbUrl : ${orderDbUrl}`);
  console.log(`processDataUrl : ${processDataUrl}`);
});
