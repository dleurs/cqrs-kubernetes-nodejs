import { Router } from 'express';
import querystring from 'querystring';
import axios, { AxiosResponse } from 'axios';
import { commandOrderUrl } from '../main';

export const commandOrderRoutes = Router();

commandOrderRoutes.post('/', async (req, res, _) =>
{
  //console.log(req);
  try
  {
    console.log(`Request received`);
    console.log(`Body :`, req.body);
    let response: AxiosResponse = await axios.post(commandOrderUrl, querystring.encode(req.body)); // req.body == "msg": "John"
    if (response.status == 202)
    {
      return res.status(202).send(`Action received and being treated`);
    }
    else
    {
      return res.status(response.status).send(`Server error from CommandOrder`);
    }
  } catch (exception)
  {
    process.stderr.write(`ERROR in Dispatcher for commandOrderUrl ${commandOrderUrl}: ${exception}\n`);
    return res.status(500).send(`ERROR in Dispatcher for commandOrderUrl ${commandOrderUrl}: ${exception}\n`);
  }
});