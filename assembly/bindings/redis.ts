export declare function redis_config(port: i32): i32;

export declare function redis_set_string(id: i32, key: usize, value: usize): boolean;
export declare function redis_get_string(id: i32, key: usize): usize;