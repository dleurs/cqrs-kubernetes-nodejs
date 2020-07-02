import { Router } from 'express';
import axios from 'axios';

export const hashRoutes = Router();

const md5HashUrl: string = process.env.MD5HASHURL || "notSet";

hashRoutes.post('/', async (req, res, __) =>
{
    console.log(req.body);
    const msg: string = req.body.message;
    try {
        const response = await axios.get(md5HashUrl + "/" + msg);
        console.log(response.data);
        return res.json(response.data);
    } catch (e) {
        console.log("Error, hash-md5.default.svc.cluster.local not reached");
        console.log(e);
    }
    return res.send("Error")
    //return res.status(300).redirect('/');
})