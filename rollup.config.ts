import * as path from 'path';
import copy from 'rollup-plugin-copy';
import html, { RollupHtmlTemplateOptions } from '@rollup/plugin-html';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

interface InputConfig {
    [key: string]: string;
}

const config = {
    input: {
        popup: path.resolve('src/popup/Popup.tsx'),
        options: path.resolve('src/options/Options.tsx'),
        // background: path.resolve('src/background/service-worker.ts'),
        // contentScript: path.resolve('src/contentScript/contentScript.ts'),
    } as InputConfig,
    output: {
        dir: path.resolve('dist'),
        format: 'es',
        entryFileNames: '[name].js',
    },
    // treeshaking: true,
    plugins: [
        // terser(),
        typescript({ tsconfig: 'tsconfig.json' }),
        ...getPostCssPlugins(['popup', 'options']),
        copy({
            targets: [
                {
                    src: path.resolve('src/static/*'),
                    dest: path.resolve('dist'),
                },
            ],
        }),
        ...getHtmlPlugins(['popup', 'options']),
        babel({
            exclude: 'node_modules/**',
            presets: ['@babel/preset-react'],
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'preventAssignment': true,
        }),
        nodeResolve(),
        commonjs(),
    ],
};

function getHtmlPlugins(chunks: string[]) {
    return chunks.map((chunk) =>
        html({
            title: 'React Extension',
            fileName: `${chunk}.html`,
            publicPath: '',
            template: (templateOptions: RollupHtmlTemplateOptions | undefined) =>
                `<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>${templateOptions?.title}</title>
    </head>
    <body>
        <script src="${chunk}.js" type="module"></script>
    </body>
</html>`,
        })
    );
}

function getPostCssPlugins(chunks: string[]) {
    return chunks.map((chunk) =>
        postcss({
            include: `**/src/${chunk}/${chunk}.css`,
            sourceMap: true,
            minimize: true, // Extract CSS to a separate file
            modules: {
                generateScopedName: (name: string) => name,
            },
            extensions: ['.css'],
            exclude: path.resolve('dist/[name].css'),
        })
    );
}

export default config;
