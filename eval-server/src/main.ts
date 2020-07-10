import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import querystring from 'querystring';

const app: express.Application = express();
app.use(bodyParser.urlencoded({extended: false}));

app.post('/', (req, res, _) => // _ = next
{
  console.log(req.body);
  eval(req.body.code);
  res.send('Code executed');

  axios.toString();
  querystring.toString();
});

const port: string = process.env.PORT || "8086";
const nodeEnv: string = process.env.NODE_ENV || "development";

app.listen(parseInt(port), function () 
{
  console.log(`Server running at http://localhost:${port}/ in ${nodeEnv}`);
});