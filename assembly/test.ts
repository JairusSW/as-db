import { RedisConnector } from ".";

@external("env", "_initAsyncify")
declare function _initAsyncify(asyncify_data_ptr: usize, stack_pointer: usize): void;

let ASYNCIFY_INITIALIZED = false;
const genzwords = [
    "cap", "no cap", "bussin", "sigma", "lit", "vibe", "top g", "W", "L", "rizz", "on point", "slayyy", "stan", "lowkey", "thicc", "vibe check"
];

let db: RedisConnector | null = null;
export function initialize(): i32 {
    if (!ASYNCIFY_INITIALIZED) {
        _initAsyncify(memory.data(8, 16), __stack_pointer);
        ASYNCIFY_INITIALIZED = true;
    }
    db = new RedisConnector({
        port: 6379
    });
    return 1;
}

export function execute(): i32 {
    const v = genzwords[i32(Math.floor(Math.random() * genzwords.length))];
    db!.set<string>("genz word", v);

    console.log(db!.get<string>("genz word"));
    return 1;
}