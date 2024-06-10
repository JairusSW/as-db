import { Box } from "as-container";
import { redis_append_buffer, redis_append_float, redis_append_int, redis_append_string, redis_config, redis_get, redis_set_buffer, redis_set_float, redis_set_int, redis_set_string } from "../bindings/redis";
import { __atoi_fast } from "../util";

class RedisConfig {
    host: string | null = null;
    path: string | null = null;
    port: i32 = 0;
    username: string | null = null;
    password: string | null = null;
}

export class RedisConnector {
    public config: RedisConfig;
    public id: i32 = -1;
    constructor(config: RedisConfig) {
        this.config = config;
        this.id = redis_config(
            changetype<usize>(config.host),
            changetype<usize>(config.path),
            config.port,
            changetype<usize>(config.username),
            changetype<usize>(config.password)
        );
    }
    set<V>(key: string, value: V): boolean {
        if (isString<V>()) {
            const result = redis_set_string(
                this.id,
                changetype<usize>(key),
                changetype<usize>(value)
            );
            return result;
        } else if (isFloat<V>()) {
            const result = redis_set_float(
                this.id,
                changetype<usize>(key),
                usize(value)
            );
            return result;
        } else if (isInteger<V>()) {
            const result = redis_set_int(
                this.id,
                changetype<usize>(key),
                i32(value)
            );
            return result;
        } else if (idof<V>() === idof<ArrayBuffer>()) {
            const result = redis_set_buffer(
                this.id,
                changetype<usize>(key),
                changetype<usize>(value)
            );
            return result;
        }
        return false;
    }
    append<V>(key: string, value: V): boolean {
        if (isString<V>()) {
            const result = redis_append_string(
                this.id,
                changetype<usize>(key),
                changetype<usize>(value)
            );
            return result;
        } else if (isFloat<V>()) {
            const result = redis_append_float(
                this.id,
                changetype<usize>(key),
                usize(value)
            );
            return result;
        } else if (isInteger<V>()) {
            const result = redis_append_int(
                this.id,
                changetype<usize>(key),
                i32(value)
            );
            return result;
        } else if (idof<V>() === idof<ArrayBuffer>()) {
            const result = redis_append_buffer(
                this.id,
                changetype<usize>(key),
                changetype<usize>(value)
            );
            return result;
        }
        return false;
    }
    //setBuffer<V>(key: ArrayBuffer, value: V): boolean {}
    get<V>(key: string): Box<nonnull<V>> | null {
        if (isFloat<V>()) {
            const result = redis_get(
                this.id,
                changetype<usize>(key)
            );
            if (!result) return null;
            return Box.from(f64.parse(changetype<string>(result)));
        } else if (isInteger<V>()) {
            const result = redis_get(
                this.id,
                changetype<usize>(key)
            );
            if (!result) return null;
            return Box.from(__atoi_fast<V>(changetype<string>(result)));
        } else if (isString<V>() || idof<V>() === idof<ArrayBuffer>()) {
            const result = redis_get(
                this.id,
                changetype<usize>(key)
            );
            if (!result) return null;
            return Box.from(changetype<nonnull<V>>(result));
        }
        throw new Error("unsupported type");
    }
}