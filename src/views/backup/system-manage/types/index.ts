interface ITableProps {
  // 参数字段
  prop?: string
  // 标题
  label: string
  // 固定窗口列
  fixed?: string
  // 宽度
  minWidth?: number
  // 插槽名
  slotName?: string
}

export interface ITablePropsListType {
  [_: number]: ITableProps
}
