import express from 'express';
import bodyParser from 'body-parser';
import { initApplePearTotalOrderedData } from '../../utils/functions';

const app: express.Application = express();
app.use(bodyParser.urlencoded({extended: false}));

let totalOrderedData = initApplePearTotalOrderedData()[2];

app.put('/', (req, res, _) => // _ = next
{
  let data = req.body;
  // checking data
  res.sendStatus(202);
  console.log(data.appleQuantity);
  totalOrderedData = initApplePearTotalOrderedData(data.appleQuantity, data.appleTotalPrice, data.pearQuantity, data.pearTotalPrice)[2];
  console.log("totalOrderedData");
  console.log(totalOrderedData);
});

app.get('/', (_, res, __) => // _ = next
{
  res.send({totalOrderedData}); 
});

//const hostname: string = process.env.HOST_ADDR || "0.0.0.0";
const port: string = process.env.PORT || "8085";
const nodeEnv: string = process.env.NODE_ENV || "development";
app.listen(parseInt(port), function () 
{
  console.log(`Server running at http://localhost:${port}/ in ${nodeEnv}`);
  console.log(`emptyTotalOrderedData`);
  console.log(totalOrderedData);
});
