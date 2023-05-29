import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'vite-plugin-components'


const resolvePath = (dir) => path.resolve(__dirname, dir);




export default defineConfig({
  plugins: [
    vue(),
    // Components({
    //   // 自动导入组件
    //   dirs: ['packages'],
    //   // 指定组件库前缀
    //   customComponentResolvers: [
    //     (name) => {
    //       if (name.startsWith('El')) {
    //         return { importName: name, path: 'element-plus/lib' }
    //       }
    //     }
    //   ]
    // }),
  ],
  build: {
    outDir:'lib',
    minify: false,
    lib: {
      entry:getComponents(),
      // name: 'ElementUI',
      // fileName: (format) => `element-ui.${format}.js`,
      name:'test',
      fileName:'test',
    },
    rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
      // external: (id) =>
      // /^(vue|@vue|@vueuse|element-plus|@element-plus|lodash)/.test(id),
      external: ['vue','element-plus'],
			output: {
        entryFileNames:"components/[name].js",
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
          vue: "Vue",
          "element-plus":"ElementPlus"
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

  let entry = {index:resolvePath(`src/index.js`)};
  const dirs = fs.readdirSync(path.resolve(__dirname, './packages')).filter(dir=>excludes.indexOf(dir) === -1);
  dirs.forEach(dir=>{
    entry[dir] = resolvePath(`packages/${dir}/index.js`)
  })
  return entry;
}
