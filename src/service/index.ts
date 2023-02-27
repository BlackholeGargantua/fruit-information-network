import axios from 'axios'

// 请求前缀地址
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
// 请求超时时间5秒
axios.defaults.timeout = 5000
