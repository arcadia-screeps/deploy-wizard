import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import clear from "rollup-plugin-clear";
import json from "@rollup/plugin-json";
import path from "path";
import url from "url";
import fs from "fs-extra";
import externals from "rollup-plugin-node-externals";
import json5 from "json5";
import {globbySync} from "globby";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const resolve = p => path.resolve(__dirname, p);

const packageJSONPath = resolve("package.json");
const tsconfigJSONPath = resolve("tsconfig.json");
const packageJson = json5.parse(fs.readFileSync(packageJSONPath).toString());
const tsconfigJson = json5.parse(fs.readFileSync(tsconfigJSONPath).toString());

const input = globbySync("src/**/*.ts", {
    cwd: __dirname,
    expandDirectories: {
        extensions: ["ts"],
    },
});

const {
    outDir: outputDir,
    sourceMap: sourcemap,
} = tsconfigJson["compilerOptions"];

const {
    name: pkgName,
    types: declarationFile,
} = packageJson;
let name = path.basename(pkgName).replaceAll("-", "_");

export default {
    input,
    output: {
        dir: outputDir,
        format: "es",
        name,
        exports: "named",
        preserveModules: true,
    },
    plugins: [
        clear({
            targets: [outputDir],
        }),
        json(),
        nodeResolve({
            preferBuiltins: false,
        }),
        commonjs(),
        typescript({
            tsconfigJson,
        }),
        externals(),
    ],
};
