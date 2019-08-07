// generator.js
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const resolve = (...file) => path.resolve(__dirname, ...file)
const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))
const { pageTemplate, componentTemplate } = require('./template')

const pathMap = { 'PAGE': '../src/pages', 'COMP': '../src/components' }
const templateMap = { 'PAGE': pageTemplate, 'COMP': componentTemplate }
const createType = process.env.CREATE_TYPE
const basePath = pathMap[createType]
const template = templateMap[createType]

log(`请输入要生成的页面组件名称、会生成在 ${basePath} 目录下:`)

/**
 * @inputName String 终端输入地址
 * @fileName String 文件完整路径
 * @fileDirectory String 文件所在目录
 * @hasFileExists String 文件是否存在
 * @componentName String 文件组件名称
 * @componentClass String 文件类名
 */
process.stdin.on('data', async chunk => {
  const inputName = String(chunk).trim().toString()
  const fileName = resolve(basePath, getFileName(inputName))
  const fileDirectory = path.dirname(fileName)
  const hasFileExists = fs.existsSync(fileName)
  if (hasFileExists) {
    errorLog(`${inputName}页面组件已存在，请重新输入`)
  } else {
    log(`正在生成组件目录 ${fileDirectory}`)
    await dotExistDirectoryCreate(fileDirectory)
  }
  try {
    let directoryList = inputName.split('/').filter((name) => name && name !== '/')
    let componentName = directoryList[directoryList.length - 1]
    let componentClass = directoryList.slice(0, directoryList.length)
    await generateFile(fileName, template(componentName, componentClass))
    successLog('生成成功')
  } catch (e) {
    errorLog(e.message)
  }
  process.stdin.emit('end')
})
process.stdin.on('end', () => {
  log('exit')
  process.exit()
})
function dotExistDirectoryCreate (directory) {
  return new Promise((resolve) => {
    mkdirs(directory, function () {
      resolve(true)
    })
  })
}
/**
 * 获取文件名称
 * @inputName String 终端输入地址
 */
function getFileName (inputName) {
  if (!inputName.endsWith('/index.js')) {
    inputName += '/index.js'
    return './' + inputName
  } else {
    return './' + inputName
  }
}
/**
 * 递归创建目录
 * @directory String 创建目录
 * @callback function 回调
 */
function mkdirs (directory, callback) {
  var exists = fs.existsSync(directory)
  if (exists) {
    callback()
  } else {
    mkdirs(path.dirname(directory), function () {
      fs.mkdirSync(directory)
      callback()
    })
  }
}
/**
 * 生成文件
 * @path String 文件地址
 * @data chunk 文件内容
 */
function generateFile (path, data) {
  if (fs.existsSync(path)) {
    errorLog(`${path}文件已存在`)
    return
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf8', err => {
      if (err) {
        errorLog(err.message)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}
