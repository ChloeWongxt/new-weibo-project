// vue.config.js
module.exports = {
    // 关闭eslint
    lintOnSave: false,
    // 修改的配置
    // 将baseUrl: '/api',改为baseUrl: '/',
    // baseUrl: '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8089',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/local-storage': {
                target: 'http://localhost:8089',
                changeOrigin: true,
                ws: true
            }
        }
    }
}