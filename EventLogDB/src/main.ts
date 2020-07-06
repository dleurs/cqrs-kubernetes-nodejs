import express from 'express';
import bodyParser from 'body-parser';
import { AttemptUserCommand } from './models/AttemptUserCommand';

const app: express.Application = express();
app.use(bodyParser.urlencoded({extended: false}));

let wormDb: Array<string> = Array<string>();

app.post('/', (req, res, _) => // _ = next
{
  console.log("EventLogDB request received");
  const attemptUserCommand: AttemptUserCommand = AttemptUserCommand.fromJson(req.body);
  wormDb.push(attemptUserCommand.toJson().toString());
  res.send(200);
});

//const hostname: string = process.env.HOST_ADDR || "0.0.0.0";
const port: string = process.env.PORT || "8084";
const nodeEnv: string = process.env.NODE_ENV || "development";
app.listen(parseInt(port), function () 
{
  console.log(`Server running at http://localhost:${port}/ in ${nodeEnv}`);
});
