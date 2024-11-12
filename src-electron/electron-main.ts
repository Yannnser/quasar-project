import { app } from 'electron';
import { 初始化应用 } from './主进程/应用'
import { 创建主窗口 } from './主进程/窗口'
import { 定义协议, 实现协议 } from './主进程/协议'

初始化应用()
定义协议()

app.whenReady().then(() => {
  创建主窗口()
  // 创建多视图窗口()
  实现协议()
})