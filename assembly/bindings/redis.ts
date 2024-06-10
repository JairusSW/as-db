export declare function redis_config(port: i32): i32;

export declare function redis_set_string(id: i32, key: usize, value: usize): boolean;
export declare function redis_set_float(id: i32, key: usize, value: f64): boolean;
export declare function redis_set_int(id: i32, key: usize, value: i32): boolean;
export declare function redis_set_buffer(id: i32, key: usize, value: usize): boolean;

export declare function redis_get(id: i32, key: usize): usize;
