import {
    mongo_init,

    mongo_collection,
    mongo_set_string,
    mongo_get_string,
    mongo_db
} from "../bindings/mongo";

class MongoConfig {
    url: string;
}

export class MongoConnector {
    public config: MongoConfig;
    public client_id: i32 = -1;
    constructor(config: MongoConfig) {
        this.config = config;
    }
    db(dbName: string): MongoDatabase {
        this.client_id = mongo_init(
            this.config.url
        );
        return new MongoDatabase(this.client_id, dbName, this.config);
    }
}

class MongoDatabase {
    public config: MongoConfig;
    public client_id: i32;
    public db_id: i32;
    public db_name: string;
    constructor(client_id: i32, db_name: string, config: MongoConfig) {
        this.client_id = client_id;
        this.db_name = db_name;
        this.config = config;
        this.db_id = mongo_db(client_id, db_name);
    }
    collection(collection: string): MongoCollection {
        return new MongoCollection(this.client_id, this.db_id, this.config, collection);
    }
}
class MongoCollection {
    public config: MongoConfig;
    public client_id: i32;
    public db_id: i32;
    public collection_id: i32;
    public collection: string;
    constructor(client_id: i32, db_id: i32, config: MongoConfig, collection: string) {
        this.client_id = client_id;
        this.db_id = db_id;
        this.config = config;
        this.collection = collection;
        this.collection_id = mongo_collection(client_id, db_id, collection);
    }
    insertKV(key: string, value: string): boolean {
        return mongo_set_string(this.client_id, this.db_id, this.collection_id, key, value);
    }
    getKV(key: string): string {
        return mongo_get_string(this.client_id, this.db_id, this.collection_id, key);
    }
}