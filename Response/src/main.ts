import express from 'express';
import bodyParser from 'body-parser';

const app: express.Application = express();
app.use(bodyParser.urlencoded({extended: false}));

app.all('/', (req, res, __) => // _ = next
{
  console.log(req);
  res.send("<h1>"+ req.query.msg + "</h1>")
});

const port: string = process.env.PORT || "8081";
const nodeEnv: string = process.env.NODE_ENV || "development";
app.listen(parseInt(port), function () 
{
  console.log(`Response running at http://localhost:${port}/ in ${nodeEnv}`);
});
