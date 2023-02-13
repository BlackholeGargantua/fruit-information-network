// 拦截 git commit 提交，确认是否符合规范 最好用 npm run commit 调用commitizen 的 cz
module.exports = {
  extends: ['@commitlint/config-conventional']
}
