/* This is a dev file, so lets ignore not importing dev dependencies here */
/* eslint-disable import/no-extraneous-dependencies */
import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default {
  input: pkg.entry,
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      clean: true,
      // eslint-disable-next-line global-require
      typescript: require('typescript'),
      tsconfig: './tsconfig.build.json',
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    process.env.NODE_ENV === 'production' ? terser() : null,
  ],
};
/* eslint-enable import/no-extraneous-dependencies */
