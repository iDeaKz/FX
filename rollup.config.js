import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const external = ['react', 'react-dom'];

export default [
  // ESM build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    },
    external,
    plugins: [
      resolve(),
      typescript({
        declaration: true,
        declarationDir: 'dist',
        rootDir: 'src'
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true
        },
        mangle: {
          properties: {
            regex: /^_/
          }
        }
      })
    ]
  },
  // CJS build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true
    },
    external,
    plugins: [
      resolve(),
      typescript(),
      terser()
    ]
  },
  // UMD build for CDN
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'HealingFX',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      }
    },
    external,
    plugins: [
      resolve(),
      typescript(),
      terser()
    ]
  }
];