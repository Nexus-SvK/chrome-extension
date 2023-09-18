const path = require('path');
const copy = require('rollup-plugin-copy');
const html = require('@rollup/plugin-html');
const typescript = require('@rollup/plugin-typescript');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const replace = require('@rollup/plugin-replace');
const commonjs = require('@rollup/plugin-commonjs');
const postcss = require('rollup-plugin-postcss');

module.exports = {
  
  input: {
    popup: path.resolve('src/popup/Popup.tsx'),
    // options: path.resolve('src/options/options.tsx'),
    // background: path.resolve('src/background/background.ts'),
    // contentScript: path.resolve('src/contentScript/contentScript.ts'),
  },
  output: {
    dir: path.resolve('dist'),
    format: 'iife',
    entryFileNames: '[name].js',
  },
  plugins: [
    typescript({tsconfig:'tsconfig.json'}),
    postcss({
      extract: true, // Extract CSS to a separate file
      modules: {
        generateScopedName:(name)=>name,
      }, // Enable CSS modules
      extensions: ['.css'], // Process .css files Use the 'sass' preprocessor (optional)
    }),
    copy({
      targets: [
        {
          src: path.resolve('src/static/*'),
          dest: path.resolve('dist'),
        },
      ],
    }),
    ...getHtmlPlugins(['popup']),
    babel({
      exclude: "node_modules/**",
      presets: ["@babel/preset-react"]
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'development' )
    }),
    nodeResolve(),
    commonjs(),
  ],
};

function getHtmlPlugins(chunks) {
  return chunks.map((chunk) =>
    html({
      title: 'React Extension',
      fileName: `${chunk}.html`,
      publicPath: '',
      // attributes:{script:`${chunk}.js`}
    })
  );
}
