const path = require("path");
const pkg = require(path.resolve("./package.json"));

const external = [
  ...Object.keys(pkg.peerDependencies || {}),
];

// ESM
require('esbuild').buildSync({
  entryPoints: ['src/index.ts'],
  format: 'esm',
  bundle: true,
  minify: true,
  sourcemap: false,
  target: ['esnext'],
  outfile: 'build/index.js',
  external,
});