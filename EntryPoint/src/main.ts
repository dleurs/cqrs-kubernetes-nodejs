import express from 'express';
import bodyParser from 'body-parser';
import querystring from 'querystring';

const app: express.Application = express();
app.use(bodyParser.urlencoded({ extended: false }));

const responseUrl: string = process.env.RESPONSEURL || "http://localhost:8081"//"http://response.default.svc.cluster.local";

app.get('/', (_, res, __) => // _ = next
{
  const data = querystring.stringify({
    "a": 1,
    "b": 2,
    "msg": "Hello World"
  });
  res.redirect(responseUrl + '/?' + data);
});

const port: string = process.env.PORT || "8080";
const nodeEnv: string = process.env.NODE_ENV || "development";
app.listen(parseInt(port), function () 
{
  console.log(`Server running at http://localhost:${port}/ in ${nodeEnv}`);
});
