# Steer Database Connector

### Supported Databases

**Redis**

**Mongo**

**LevelDB**

### Documentation

#### Redis

**Usage Example**

```js
const db = new RedisConnector({
    port: 6379,
    host: "127.0.0.1"
});

db.set("foo", "bar");

console.log("GET [foo]: " + db.get<string>("foo").unwrap());

console.log("EXISTS [foo]: " + db.exists("foo").toString());

redis.append("foo", "-bar");

console.log("GET [foo]: " + db.get<string>("foo").unwrap());

redis.del("foo");

redis.quit();

// NOTE: Executuion of Lua scripts can optionally be verified by the database owner. The hash of the bundle (.wasm) file must be allowed to execute certain permissions on the database.
```

#### Mongo

```js
const connector = new MongoConnector({
    url: "mongodb+srv://..."
    // I have an open server at: mongodb+srv://me:me@cluster0.zmarlm6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
});

const db = connector.db("db_name");

const collection = db.collection("db_collection");

collection.insertKV("foo", "bar");

console.log("GET [foo]: " + collection.getKV("foo"));
```

#### Level

```js
const db = new LevelConnector({
    name: "db_name"
});

db.set("foo", "bar");

console.log("GET [foo]: " + db.get<string>("foo"));

console.log("EXISTS [foo]: " + db.exists("foo"));

redis.del("foo");
```