"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.mongoConnect = void 0;
const mongodb_1 = __importDefault(require("mongodb"));
const dbUrl = process.env.DBURL || "notSet";
let _db;
async function mongoConnect() {
    if (dbUrl == undefined) {
        throw ("dbPassword should be set");
    }
    let success = false;
    while (!success) {
        try {
            let client = await mongodb_1.default.MongoClient.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log(`Connected to mongoDB`);
            success = true;
            _db = client.db();
        }
        catch (err) {
            console.log('Error connecting to MongoDB, retrying in 1 second');
            console.log(err);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}
exports.mongoConnect = mongoConnect;
function getDb() {
    if (_db) {
        return _db;
    }
    throw 'No database found';
}
exports.getDb = getDb;
