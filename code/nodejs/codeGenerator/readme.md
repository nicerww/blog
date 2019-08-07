#简易组件生成器

##使用说明
根据自家项目结构及开发规范，开发此小工具，用于项目开发期间，快速创建页面

##使用方法
1. 将工具中的scripts放置到需要项目的根目录中
2. 添加 scripts 至项目package.json
```
  "scripts": {
    "create:page": "cross-env CREATE_TYPE=PAGE node ./scripts/generator",
    "create:comp": "cross-env CREATE_TYPE=COMP node ./scripts/generator"
  }
```
3. 安装 chalk、cross-env 库
```
  npm install chalk cross-env --save -dev
```
4. 创建组件
```
  执行 npm run create:page 或者 npm run create:comp

  约定式以 Parent/Child 或者 CommonTable 方式输入之后

  在 pages 或 component 下生成对应名称的组件
```      
##Image
pages/Parent/Child/index.js
![image](https://github.com/mr-hjw/blog/blob/master/code/nodejs/codeGenerator/page-img.png?raw=true)

components/CommonTable/index.js
![image](https://github.com/mr-hjw/blog/blob/master/code/nodejs/codeGenerator/comp-img.png?raw=true) 
  


