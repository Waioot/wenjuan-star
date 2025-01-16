import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    /* CSS 预处理器 */
    preprocessorOptions: {
      scss: {
        // 引入 mixin.scss 这样就可以在全局中使用 mixin.scss中预定义的变量了
        // 给导入的路径最后加上 ; 否则会报错
        // additionalData: '@import "src/assets/styles/mixin.scss";',
      },
    },
  },

  server: {
    open: true, // 是否自动打开浏览器
    port: 8000, // 端口号 b端用 8000 c端用 3000

    // 代理解决跨域
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001', // 接口源地址
        changeOrigin: true, // 开启跨域
        rewrite: path => path.replace('/^/api/', ''),
      },
    },
  },
});
