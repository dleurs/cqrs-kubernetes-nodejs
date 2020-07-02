"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashRoutes = void 0;
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
exports.hashRoutes = express_1.Router();
const md5HashUrl = process.env.MD5HASHURL || "notSet";
exports.hashRoutes.post('/', async (req, res, __) => {
    const msg = req.body.message;
    try {
        const response = await axios_1.default.get(md5HashUrl + "/" + msg);
        console.log(response.data);
        return res.json(response.data);
    }
    catch (e) {
        console.log("Error, hash-md5.default.svc.cluster.local not reached");
        console.log(e);
    }
    return res.send("Error");
    //return res.status(300).redirect('/');
});
