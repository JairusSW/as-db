import { readFileSync } from "fs";
import { loadWasm } from "./app-loader/src/index";

const bundle = await loadWasm(readFileSync("./build/test.wasm"));

bundle.initialize("");

await bundle.execute();

import { MongoClient } from "mongodb";
const client = await new MongoClient("mongodb+srv://me:me@cluster0.zmarlm6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").connect();
const db = client.db("my-db")
const collection = db.collection("my-collection");

//const insertResult = await collection.insertOne({ key: "foo", value: "bar" });
//console.log('Inserted documents =>', insertResult);

const filteredDocs = await collection.findOne({ key: "foo" });
console.log('Found documents filtered by { foo: "bar" } =>', filteredDocs);

await collection.deleteOne({ key: "foo"});