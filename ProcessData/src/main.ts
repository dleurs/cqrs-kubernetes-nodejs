import express from 'express';
import bodyParser from 'body-parser';

const app: express.Application = express();
app.use(bodyParser.urlencoded({extended: false}));

const commandOrderUrl: string = process.env.COMMANDORDERURL || "http://localhost:8081"
const statsOrderDbUrl: string = process.env.STATSORDERDBURL || "http://localhost:8085"
const quantityStr: string = "quantity";
const totalPriceStr: string = "totalPrice";
const appleStr: string = "apple";
const pearStr: string = "pear";

let totalOrderedData: Map<string, Map<string, number>> = new Map<string, Map<string, number>>();
let apple: Map<string, number> = new Map<string, number>();
apple.set(quantityStr, 0);
apple.set(totalPriceStr, 0);
let pear: Map<string, number> = new Map<string, number>();
pear.set(quantityStr, 0);
pear.set(totalPriceStr, 0);
totalOrderedData.set(appleStr, apple);
totalOrderedData.set(pearStr, pear);

app.post('/', (req, res, _) => // _ = next
{
  console.log(`Request received`);
  console.log(`Body :`, req.body);
  // validating req.body
  if (req.body.product == appleStr) {
    apple.set(quantityStr, (apple.get(quantityStr) || 0) + parseInt(req.body.quantity));
    apple.set(totalPriceStr, (apple.get(totalPriceStr) || 0) + (parseFloat(req.body.price) * parseInt(req.body.quantity)));
  } else if (req.body.product == pearStr) {
    pear.set(quantityStr, (pear.get(quantityStr) || 0) + parseInt(req.body.quantity));
    pear.set(totalPriceStr, (pear.get(totalPriceStr) || 0) + (parseFloat(req.body.price) * parseInt(req.body.quantity)));
  }
  console.log("totalOrderedData : ",totalOrderedData);
  res.send(202)
});

const port: string = process.env.PORT || "8083";
const nodeEnv: string = process.env.NODE_ENV || "development";
app.listen(parseInt(port), function () 
{
  console.log(`ProcessData running at http://localhost:${port}/ in ${nodeEnv}`);
  console.log(`ProcessData variable = orderDbUrl : ${commandOrderUrl}`);
  console.log(`ProcessData variable = statsOrderDbUrl : ${statsOrderDbUrl}`);
});