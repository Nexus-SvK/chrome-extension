const path = require('path');
const copy = require('rollup-plugin-copy');
const html = require('@rollup/plugin-html');
const typescript = require('@rollup/plugin-typescript');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const replace = require('@rollup/plugin-replace');
const commonjs = require('@rollup/plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const terser = require('rollup-plugin-terser').terser;

module.exports = {
  input: {
    popup: path.resolve('src/popup/Popup.tsx'),
    options: path.resolve('src/options/Options.tsx'),
    // background: path.resolve('src/background/service-worker.ts'),
    // contentScript: path.resolve('src/contentScript/contentScript.ts'),
  },
  output: {
    dir: path.resolve('dist'),
    format: 'es',
    entryFileNames: '[name].js',
  },
  treeshaking:true,
  plugins: [
	// terser(),
    typescript({tsconfig:'tsconfig.json'}),
    ...getPostCssPlugins(["popup","options"]),
    copy({
      targets: [
        {
          src: path.resolve('src/static/*'),
          dest: path.resolve('dist'),
        },
      ],
    }),
    ...getHtmlPlugins(['popup','options']),
    babel({
      exclude: "node_modules/**",
      presets: ["@babel/preset-react"]
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'development' ),
      'preventAssignment':true
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
      template:(
        title,
        attributes,
        publicPath,
        meta,
        bundle,
        files
      )=>
`<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>${title}</title>
    </head>
    <body>
        <script src="${chunk}.js" type="module"></script>
    </body>
</html>`,
    })
  );
}

function getPostCssPlugins(chunks){
  return chunks.map((chunk) =>
    postcss({
      include: `**/src/${chunk}/${chunk}.css`,
      sourceMap: true,
      minimize: true, // Extract CSS to a separate file
      writeDefinitions: true,
      modules: {
        generateScopedName:(name)=>name,
      },
      extensions: ['.css'],
      exclude: path.resolve('dist/[name].css'),
    })
  );
}