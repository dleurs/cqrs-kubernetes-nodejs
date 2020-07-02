"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoArgs = exports.showTodos = exports.Todo = void 0;
const mongodb_1 = __importDefault(require("mongodb"));
const database_1 = require("../utils/database");
class Todo {
    constructor({ id, title, done = false, creation = true }) {
        this._id = id || null; // Only in fromJson
        if (title == (undefined || null)) {
            throw ("Title of todo should not be null");
        }
        this.title = title;
        this.done = done;
        if (creation) {
            this.creationDate = new Date();
        }
        else {
            this.creationDate = null;
        }
    }
    static fromJson(json) {
        let todoArgs = {
            id: (new mongodb_1.default.ObjectId(json._id)).toString(),
            title: json.title,
            done: json.done,
            creation: false
        };
        return new Todo(todoArgs);
    }
    toJson() {
        let json = {};
        if (this._id != null) {
            json._id = new mongodb_1.default.ObjectId(this._id);
        }
        json.title = this.title;
        json.done = this.done;
        json.creationDate = this.creationDate;
        return json;
    }
    async save() {
        const db = database_1.getDb();
        let dbOperation;
        if (this._id) {
            dbOperation = db.collection('todos').updateOne({ _id: new mongodb_1.default.ObjectId(this._id) }, { $set: this.toJson() });
        }
        else {
            dbOperation = db.collection('todos').insertOne(this.toJson());
        }
        await dbOperation;
    }
    static async get(todoId) {
        const db = database_1.getDb();
        const json = await db.collection('todos').findOne({ _id: new mongodb_1.default.ObjectId(todoId) });
        if (json == (undefined || null)) {
            throw ("Todo not found");
        }
        ;
        return Todo.fromJson(json);
    }
    static async delete(todoId) {
        const db = database_1.getDb();
        await db.collection('todos').deleteOne({ _id: new mongodb_1.default.ObjectId(todoId) });
    }
    static async getAll() {
        const db = database_1.getDb();
        return (await db.collection('todos').find().toArray()).map(json => Todo.fromJson(json));
    }
    toString() {
        let res = "Todo named `" + this.title;
        res += " with id = " + this._id || "unset";
        if (this.done) {
            res += "` is done";
        }
        else {
            res += "` is not done yet";
        }
        return res;
    }
}
exports.Todo = Todo;
function showTodos(todos) {
    let str = "<table>";
    for (let todo of todos) {
        if (todo.done) {
            str += `<tr> <td><a style="color:#006400; font-weight: bold;" >` + todo.title + `</td></a>\t`;
            str += `<td><form action="/todo/checking/false/` + todo._id + `" method="POST"><button type="submit">Uncheck</button></form></td>`;
        }
        else {
            str += `<tr> <td><a>` + todo.title + `</td></a>\t`;
            str += `<td><form action="/todo/checking/true/` + todo._id + `" method="POST"><button type="submit">Check</button></form></td>`;
        }
        str += `<td><form action="/todo/delete/` + todo._id + `" method="POST"><button type="submit">X</button></form></td>`;
        str += "</tr>";
    }
    str += "</table>";
    return str;
}
exports.showTodos = showTodos;
class TodoArgs {
}
exports.TodoArgs = TodoArgs;
