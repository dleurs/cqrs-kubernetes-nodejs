import express from 'express';
import bodyParser from 'body-parser';
import { commandOrderRoutes } from './routes/command-order';


const app: express.Application = express();
app.use(bodyParser.urlencoded({ extended: false }));

export const commandOrderUrl: string = process.env.COMMANDORDERURL || "http://localhost:8081"
export const queryOrderUrl: string = process.env.QUERYORDERBURL || "http://localhost:8084"

app.get('/', (_, res, ___) => {
  res.redirect('/order')
});
app.use('/order', commandOrderRoutes);

const port: string = process.env.PORT || "8080";
const nodeEnv: string = process.env.NODE_ENV || "development";
app.listen(parseInt(port), function () 
{
  console.log(`[Dispatcher] Server running in ${nodeEnv}`);
  console.log(`[Dispatcher] variable set > commandOrderUrl : ${commandOrderUrl}`);
  console.log(`[Dispatcher] variable set > queryOrderUrl : ${queryOrderUrl}`);
});
