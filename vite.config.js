import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';

export default defineConfig({
  resolve: {
    alias: {
      dom: './dom.js',
    },
  },
  plugins: [
    babel({
      babelConfig: {
        babelrc: false,
        configFile: false,
        plugins: ['babel-plugin-jsx-dom-expressions'],
      },
    }),
  ],
});
