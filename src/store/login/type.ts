interface IUserPersonalInfo {
  id: number
  username: string
  password: string
  avatar_url: string
  create_time: string
  role: string
  deleted: number
}

interface ILoginState<T = IUserPersonalInfo> {
  showButtonLoading: boolean //是否显示按钮动画
  showLoginPage: boolean //是否展示登录页面
  showAddInfoDialog: boolean
  token: string
  userPersonalInfo: T
}

export default ILoginState
