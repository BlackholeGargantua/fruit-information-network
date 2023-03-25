import { ElMessage } from 'element-plus'
import ElMessageType from './type/message-type'

// 自定义消息弹框
export default function elMessage(control: ElMessageType) {
  ElMessage({
    showClose: true,
    message: control.message ?? '操作成功',
    type: control.type ?? 'success',
    duration: control.duration ?? 1500,
    offset: control.offset ?? 62
  })
  const el: any = document.querySelector('.el-message')
  if (el) {
    el.style.zIndex = 10000
  }
}
