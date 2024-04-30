import { readFileSync } from "fs";
import { loadWasm } from "./app-loader/src/index";

const bundle = await loadWasm(readFileSync("./build/test.wasm"));

bundle.initialize("");

await bundle.execute();