interface ElMessageType {
  // 提示消息
  message?: string
  // 提示类型
  type?: 'success' | 'warning' | 'info' | 'error'
  // 停留时间
  duration?: number
  // 距离窗口顶部距离
  offset?: number
}

export default ElMessageType
