import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import webpack from "webpack";
import fs from "fs";
import TerserPlugin from "terser-webpack-plugin";

const dir = dirname(fileURLToPath(import.meta.url));
let { name, version, author } = JSON.parse(fs.readFileSync("package.json", "utf8"));

export default {
    entry: "./index.js",
    output: {
        path: resolve(dir, "./dist"),
        filename: "index.min.js",
        library: {
            name: "XLSX",
            type: "umd",
            export: "default",
            umdNamedDefine: true,
        },
    },
    devtool: "source-map",
    plugins: [
        new webpack.BannerPlugin({
            banner: `${name} v${version} - (c) ${author}, ISC License`,
        }),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
        ],
    },
};
