import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const resolvePath = (dir) => path.resolve(__dirname, dir);




export default defineConfig({
  plugins: [vue()],
  build: {
    outDir:'lib',
    lib: {
      entry:getComponents(),
      name: 'ElementUI',
      fileName: (format) => `element-ui.${format}.js`,
    },
    rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
			external: ["vue"],
			output: {
        entryFileNames:"components/[name].js",
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					vue: "Vue",
				},
			},
		},
  },
});

/* 获取组件集合 */ 
function getComponents(){
  const excludes = [
    'index.js',
    'theme-chalk',
    'mixins',
    'utils',
    'fonts',
    '.DS_Store'
  ];

  let entry = {};
  const dirs = fs.readdirSync(path.resolve(__dirname, './packages')).filter(dir=>excludes.indexOf(dir) === -1);
  dirs.forEach(dir=>{
    entry[dir] = resolvePath(`packages/${dir}/index.js`)
  })
  return entry;
}
