import { MongoConnector } from "./connectors/mongo";
import { RedisConnector } from "./connectors/redis";

@external("env", "_initAsyncify")
declare function _initAsyncify(asyncify_data_ptr: usize, stack_pointer: usize): void;

let ASYNCIFY_INITIALIZED = false;
let redis: RedisConnector | null = null;
export function initialize(): i32 {
    if (!ASYNCIFY_INITIALIZED) {
        _initAsyncify(memory.data(8, 16), __stack_pointer);
        ASYNCIFY_INITIALIZED = true;
    }
    return 1;
}

export function execute(): i32 {
    
    redis = new RedisConnector({
        port: 6379
    });

    redis!.set("foo", "bar");

    console.log("[foo]: " + redis!.get<string>("foo")!.unwrap());

    redis!.set("foo", 314);

    console.log("[foo]: " + redis!.get<i32>("foo")!.unwrap().toString());

    return 1;
}