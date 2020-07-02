"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// npm install mongodb; npm install @types/mongodb;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const todos_1 = require("./routes/todos");
const hashs_1 = require("./routes/hashs");
const database_1 = require("./utils/database");
//import { Todo } from './models/todo';
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(todos_1.todoRoutes);
app.use('hash', hashs_1.hashRoutes);
//const hostname: string = process.env.HOST_ADDR || "0.0.0.0";
const port = process.env.PORT || "8080";
const nodeEnv = process.env.NODE_ENV || "production";
const dbUrl = process.env.DBURL;
if (dbUrl == (undefined || null)) {
    throw ("db mongo url should be set");
}
app.listen(parseInt(port), async function () {
    await database_1.mongoConnect();
    console.log(`Server running at http://localhost:${port}/ in ${nodeEnv}`);
});
