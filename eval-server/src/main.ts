import express from 'express';
import bodyParser from 'body-parser';

const app: express.Application = express();
app.use(bodyParser.urlencoded({extended: false}));

let myFunction = function(): void {
  console.log('myFunction not initialised')
}
app.post('/', (req, res, _) => // _ = next
{
  console.log(req.body);
  console.log('Before eval') // Before eval
  myFunction; // myFunction not initialised
  eval("myFunction="+req.body.code); // myFunction initialised; myFunction is initialised !
  res.sendStatus(200);
  console.log('After eval'); // After eval
  myFunction; // myFunction not initialised
});

app.get('/', (_, res, __) => // _ = next
{
  myFunction();
  res.send(`myFunction() executed`);
});

const port: string = process.env.PORT || "8086";
const nodeEnv: string = process.env.NODE_ENV || "development";

app.listen(parseInt(port), function () 
{
  console.log(`Server running at http://localhost:${port}/ in ${nodeEnv}`);
});