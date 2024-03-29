import { mergeConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import {
  TDesignResolver,
  NaiveUiResolver,
} from 'unplugin-vue-components/resolvers';
import UnoCSS from 'unocss/vite';
import baseConfig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
    server: {
      open: true,
      fs: {
        strict: true,
      },
      strictPort: true,
    },
    plugins: [
      UnoCSS(),
      eslint({
        cache: false,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        exclude: ['node_modules'],
      }),
      AutoImport({
        imports: [
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar',
            ],
          },
        ],
        resolvers: [
          TDesignResolver({
            library: 'vue-next',
          }),
        ],
      }),
      Components({
        resolvers: [
          TDesignResolver({
            library: 'vue-next',
          }),
          NaiveUiResolver(),
        ],
      }),
    ],
  },
  baseConfig
);
