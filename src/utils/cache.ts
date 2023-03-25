class localCache {
  // 存入本地
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  // 获取本地缓存
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) return JSON.parse(value)
  }

  // 删除缓存
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }

  // 清楚全部缓存
  clearCache() {
    window.localStorage.clear()
  }
}

export default new localCache()
