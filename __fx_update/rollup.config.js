import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import sizeGate from './rollup-plugins/size-gate.js';

const external = ['react', 'react-dom'];

// Your 20KB precision config
const terserConfig = {
  compress: {
    pure_getters: true,
    unsafe: true,
    unsafe_comps: true,
    passes: 3,           // Multi-pass optimization
    drop_console: true,   // Production console removal
    drop_debugger: true
  },
  mangle: {
    properties: { regex: /^_/ },
    toplevel: true
  },
  format: { comments: false }
};

export default [
  // ESM build with size enforcement
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    },
    external,
    plugins: [
      resolve({ preferBuiltins: false }),
      typescript({
        declaration: true,
        declarationDir: 'dist',
        rootDir: 'src'
      }),
      terser(terserConfig),
      sizeGate(20) // 20KB GATE ENFORCED!
    ]
  },
  // CJS + UMD builds (same pattern)
  {
    input: 'src/index.ts',
    output: { file: 'dist/index.cjs.js', format: 'cjs', sourcemap: true },
    external,
    plugins: [resolve(), typescript(), terser(terserConfig), sizeGate(20)]
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'HealingFX',
      globals: { react: 'React', 'react-dom': 'ReactDOM' }
    },
    external,
    plugins: [resolve(), typescript(), terser(terserConfig), sizeGate(20)]
  }
];