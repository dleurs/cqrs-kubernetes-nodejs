import express from 'express';
import bodyParser from 'body-parser';
import { TotalOrdered } from '../../utils/src/models/total-ordered';

const app: express.Application = express();
app.use(bodyParser.urlencoded({extended: false}));

let totalOrdered: TotalOrdered = new TotalOrdered({});

app.put('/', (req, res, _) => // _ = next
{
  console.log(`[StatsOrderDb] PUT on "/" Request received`);
  console.log(`[StatsOrderDb] Request body`, req.body);
  totalOrdered = TotalOrdered.fromJson(req.body);
  res.sendStatus(202);
  console.log(`[StatsOrderDb] update on totalOrdered`);
  console.log(totalOrdered);
});

app.get('/', (_, res, __) => // _ = next
{
  console.log(`[StatsOrderDb] GET Request received`);
  res.send(totalOrdered.toJson()); 
});

//const hostname: string = process.env.HOST_ADDR || "0.0.0.0";
const port: string = process.env.PORT || "8085";
const nodeEnv: string = process.env.NODE_ENV || "development";
app.listen(parseInt(port), function () 
{
  console.log(`[StatsOrderDb] Server running at http://localhost:${port}/ in ${nodeEnv}`);
  console.log(totalOrdered);
});
