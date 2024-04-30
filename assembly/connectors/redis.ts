import { redis_config, redis_get_string, redis_set_string } from "../bindings/redis";

class RedisConfig {
    //uri: string;
    //host: string;
    port: i32;
    //user: string;
    //password: string;
    // Must encrypt password with secret key auth
    //id: string;
}

export class RedisConnector {
    public config: RedisConfig;
    public id: i32 = -1;
    constructor(config: RedisConfig) {
        this.config = config;
        this.id = redis_config(config.port);
    }
    set<V>(key: string, value: V): boolean {
        if (isString<V>()) {
            // Change between encodings?
            const result = redis_set_string(
                this.id,
                changetype<usize>(key),
                changetype<usize>(value)
            );
            if (!result) {
                // We have an error!
                throw new Error("Were screwed!");
            }
            return result;
        }
        return false;
    }
    //setBuffer<V>(key: ArrayBuffer, value: V): boolean {}
    get<V>(key: string): V {
        if (isString<V>()) {
            const result = redis_get_string(
                this.id,
                changetype<usize>(key)
            );
            if (!result) {
                // We have an error!
                throw new Error("Were screwed!");
            }
            return changetype<string>(result);
        }
        throw new Error("unsupported type")
    }
}