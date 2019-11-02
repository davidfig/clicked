import { terser } from 'rollup-plugin-terser'

export default [
{
    input: 'clicked.js',
    plugins: [
        terser()
    ],
    output:
    {
        file: 'dist/clicked.js',
        format: 'umd',
        name: 'clicked',
        sourcemap: true
    }
},
{
    input: 'clicked.js',
    output:
    {
        file: 'dist/clicked.es.js',
        format: 'esm',
        sourcemap: true
    }
}]