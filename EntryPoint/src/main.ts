import express from 'express';
import bodyParser from 'body-parser';
import querystring from 'querystring';
import axios from 'axios';

const app: express.Application = express();
app.use(bodyParser.urlencoded({ extended: false }));

const responseUrl: string = process.env.RESPONSEURL || "http://localhost:8081"

app.get('/', async (_, res, ___) => // _ ,__, ___ = req, res, next
{
  console.log(`EntryPoint "/" request received`);
  const data = querystring.stringify({
    "msg": "John"
  });
  try
  {
    //const response = await axios.get(responseUrl + '/?' + data); // req.query == "msg": "John"
    const response = await axios.post(responseUrl, data); // req.body == "msg": "John"
    return res.send(response.data);
  } catch (exception)
  {
    process.stderr.write(`ERROR received from ${responseUrl}: ${exception}\n`);
  }
  return null;

});

const port: string = process.env.PORT || "8080";
const nodeEnv: string = process.env.NODE_ENV || "development";
app.listen(parseInt(port), function () 
{
  console.log(`EntryPoint running at http://localhost:${port}/ in ${nodeEnv}`);
  console.log(`RESPONSEURL : ${responseUrl}`)
});
