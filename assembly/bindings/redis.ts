export declare function redis_config(host_ptr: usize, path_ptr: usize, port: i32, username_ptr: usize, password_ptr: usize): i32;

export declare function redis_set_string(id: i32, key: usize, value: usize): boolean;
export declare function redis_set_float(id: i32, key: usize, value: f64): boolean;
export declare function redis_set_int(id: i32, key: usize, value: i32): boolean;
export declare function redis_set_buffer(id: i32, key: usize, value: usize): boolean;

export declare function redis_append_string(id: i32, key: usize, value: usize): boolean;
export declare function redis_append_float(id: i32, key: usize, value: f64): boolean;
export declare function redis_append_int(id: i32, key: usize, value: i32): boolean;
export declare function redis_append_buffer(id: i32, key: usize, value: usize): boolean;

export declare function redis_get(id: i32, key: usize): i32;
