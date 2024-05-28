import { LevelConnector, RedisConnector } from ".";
import { MongoConnector } from "./connectors/mongo";

@external("env", "_initAsyncify")
declare function _initAsyncify(asyncify_data_ptr: usize, stack_pointer: usize): void;

let ASYNCIFY_INITIALIZED = false;
const genzwords = [
    "cap", "no cap", "bussin", "sigma", "lit", "vibe", "top g", "W", "L", "rizz", "on point", "slayyy", "stan", "lowkey", "thicc", "vibe check"
];

let redis: RedisConnector | null = null;
let level: LevelConnector | null = null;
let mongo: MongoConnector | null = null;
export function initialize(): i32 {
    if (!ASYNCIFY_INITIALIZED) {
        _initAsyncify(memory.data(8, 16), __stack_pointer);
        ASYNCIFY_INITIALIZED = true;
    }
    /*redis = new RedisConnector({
        port: 6379
    });
    level = new LevelConnector({
        name: "db"
    });*/
    mongo = new MongoConnector({
        url: "mongodb+srv://me:me@cluster0.zmarlm6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    });
    return 1;
}

export function execute(): i32 {
    const db = mongo!.db("my-db");
    const collect = db.collection("my-collection");
    collect.insertKV("foo", "barrr");
    console.log("Recieved: " + collect.getKV("foo"));
    return 1;
}