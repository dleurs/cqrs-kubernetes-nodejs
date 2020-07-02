import express from 'express';
import bodyParser from 'body-parser';

const app: express.Application = express();
app.use(bodyParser.urlencoded({extended: false}));

app.get('/:msg', (req, res, _) => // _ = next
{
  const msg: string = req.params.msg;
  const msgBuffer: string = Buffer.from(msg).toString('base64')
  res.json({message: msgBuffer});
});

//const hostname: string = process.env.HOST_ADDR || "0.0.0.0";
const port: string = process.env.PORT || "8080";
const nodeEnv: string = process.env.NODE_ENV || "production";
app.listen(parseInt(port), function () 
{
  console.log(`Server running at http://localhost:${port}/ in ${nodeEnv}`);
});
