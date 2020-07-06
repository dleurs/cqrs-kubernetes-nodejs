import express from 'express';
import bodyParser from 'body-parser';
import querystring from 'querystring';
import axios from 'axios';

const app: express.Application = express();
app.use(bodyParser.urlencoded({ extended: false }));

const queryUrl: string = process.env.QUERYURL || "http://localhost:8081"
const eventLogDbUrl: string = process.env.EVENTLOGDBURL || "http://localhost:8084"

app.get('/', async (_, res, ___) => // _ ,__, ___ = req, res, next
{
  console.log(`serviceInterface GET "/" request received`);
  const data = querystring.stringify({
    "msg": "John"
  });
  try
  {
    //const query = await axios.get(queryUrl + '/?' + data); // req.query == "msg": "John"
    const query = await axios.post(queryUrl, data); // req.body == "msg": "John"
    return res.send(query.data);
  } catch (exception)
  {
    process.stderr.write(`ERROR received from ${queryUrl}: ${exception}\n`);
  }
  return null;

});

app.get('/user', (_, res, ___) => // _ ,__, ___ = req, res, next
{
  console.log(`serviceInterface GET "/user" request received`);
  const addUserForm: string = `<h1>Add a user</h1> <form action="/user" method="POST"><input type="text" name="title"><button type="submit">Add User</button></form>`;
  return res.send(addUserForm);
});

app.post('/user', async (req, res, _) => // _ ,__, ___ = req, res, next
{
  console.log(`serviceInterface POST "/user" request received`);
  const data = querystring.stringify({
    "type": "create",
    "object": req.body.title
  });
  try
  {
    const query = await axios.post(eventLogDbUrl, data);
    console.log("query" + query.toString());
    return res.send("<h1>Command executed</h1>");
  } catch (exception)
  {
    process.stderr.write(`ERROR received from ${eventLogDbUrl}: ${exception}\n`);
  }
  return null;
});

const port: string = process.env.PORT || "8080";
const nodeEnv: string = process.env.NODE_ENV || "development";
app.listen(parseInt(port), function () 
{
  console.log(`serviceInterface running at http://localhost:${port}/ in ${nodeEnv}`);
  console.log(`queryURL : ${queryUrl}`);
  console.log(`eventLogDbUrl : ${eventLogDbUrl}`);
});
