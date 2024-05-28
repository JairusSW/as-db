import { level_config, level_get_string, level_set_string } from "../bindings/level";

class LevelConfig {
    name: string;
}

export class LevelConnector {
    public config: LevelConfig;
    public id: i32 = -1;
    constructor(config: LevelConfig) {
        this.config = config;
        this.id = level_config(changetype<usize>(config.name));
    }
    /*
    query<V>(query: string): V {

    }
    */
    set<V>(key: string, value: V): void {
        if (isString<V>()) {
            // Change between encodings?
            level_set_string(
                this.id,
                changetype<usize>(key),
                changetype<usize>(value)
            );
        }
    }
    //setBuffer<V>(key: ArrayBuffer, value: V): boolean {}
    get<V>(key: string): V {
        if (isString<V>()) {
            const result = level_get_string(
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