export declare function level_config(name: usize): i32;

export declare function level_set_string(id: i32, key: usize, value: usize): void;
export declare function level_get_string(id: i32, key: usize): usize;
export declare function level_del_string(id: i32, key: usize): void;
export declare function level_has_string(id: i32, key: usize): bool;