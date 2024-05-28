export declare function mongo_init(url: string): i32;

export declare function mongo_db(client_id: i32, db: string): i32;
export declare function mongo_collection(client_id: i32, db_id: i32, collection: string): i32;
export declare function mongo_set_string(client_id: i32, db_id: i32, collection_id: i32, key: string, value: string): boolean;
export declare function mongo_get_string(client_id: i32, db_id: i32, collection_id: i32, key: string): string; 